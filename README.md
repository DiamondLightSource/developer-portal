# Developer Portal

The Diamond Light Source developer portal, built with backstage for deployment on kubernetes.

|                |                                                                    |
| -------------- | ------------------------------------------------------------------ |
| Source Code    | <https://github.com/DiamondLightSource/developer-portal>           |
| User Docs      | <https://diamondlightsource.github.io/developer-portal/user/>      |
| Developer Docs | <https://diamondlightsource.github.io/developer-portal/developer/> |
| Releases       | <https://github.com/DiamondLightSource/developer-portal/releases>  |

## Developing Locally (VSCode)

- Load the `docker-compose` `module`, or:
  - [Install docker-compose](https://docs.docker.com/compose/install/other/),
  - Start the podman socket with `systemctl --user start podman.socket`
  - Use the podman socket as the compose host by adding `export DOCKER_HOST=unix:///run/user/$UID/podman/podman.sock` to your `~/.bashrc`
- Install `ms-vscode-remote.remote-containers`
- Set `remote.containers.dockerPath` to `podman`
- Set `remote.containers.dockerComposePath` to your `docker-compose`
- Disable buildkit by adding `export DOCKER_BUILDKIT=0` to your `~/.bashrc`
- Open Development Container
- Create a `.env` file in the `.devcontainer` directory containing the [necessary secrets](#necessary-secrets)
- Install package dependencies with `yarn --cwd backstage install`
- Start the app, with `yarn --cwd backstage dev`

## Deploying on Kubernetes (Diamond Light Source)

- Access the cluster with `module load argus`
- Adjust configuration in `app.yaml` and `charts/apps/values.yaml` as appropriate
- If deploying to non `dev-portal` namespace, create a secret containing the [necessary secrets](#necessary-secrets) with `backend.auth.existingSecret` (recommended)
- Deploy the portal, with:

  ```sh
  kubectl apply -f app.yaml
  ```

## Necessary secrets

In order to deploy this application, the following secrets are required

- `GITHUB_TOKEN` - a GitHub personal access token used to retrieve organisation & repository data, with:
  - `read:org`
  - `read:user`
  - `user:email`
- `GITLAB_TOKEN` - a GitLab personal access token used to retrieve organisation & repository data, with:
  - `api`
  - `read_repository`
  - `write_repository`
- `GITHUB_APP_CLIENT_ID` - a GitHub OAuth App client ID used to provide user authentication
- `GITHUB_APP_SECRET` - the corresponding GitHub OAuth App secret
- `AWS_ACCESS_KEY_ID` - a AWS S3 bucket access key ID used to retrieve techdocs from the object store, with:
  - `s3:ListBucket`
  - `s3:GetObject`
- `AWS_SECRET_ACCESS_KEY` - the corresponding AWS S3 bucket access key secret
