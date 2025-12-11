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
- Create a `.env` file in the `.devcontainer` directory containing the [necessary secrets](#necessary-secrets)
- Open Development Container
- Install package dependencies with `yarn --cwd backstage install`
- Start the app, with `yarn --cwd backstage dev`

## Contributing changes

The following can be run locally to see if changes will pass CI

- `yarn --cwd backstage run test`
  - `a` when prompted to run all tests
- `yarn --cwd backstage run prettier . --check`
- `yarn --cwd backstage run tsc`
- `yarn --cwd backstage backstage-cli repo lint`

## Updating Backstage version

After package install, backstage package dependencies can be updated with

`yarn --cwd backstage backstage-cli versions:bump`

https://backstage.io/docs/getting-started/keeping-backstage-updated

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

## Updating API Tokens

The portal uses GitHub and GitLab API tokens to query repositories, search for
`catalog.info` files and populate the catalog. These tokens expire after a configurable
period - generally 3 months. Tokens must be rolled over before this time elapses for the
catalog to continue updating, which requires updating the sealed secrets in the values
file for the specific deployment.  There are two scripts to automate this process. They
each print an encrypted token that is safe to commit and push to GitHub.

### GitLab API Token

The GitLab API token is maintain under a machine user account and can be rotated via a
POST request with the existing token. There are separate tokens for dev-portal and
dev-portal-dev. The script works for both depending on which cluster is currently
active. To rotate the dev-portal token, run

```bash
$ module load argus
$ util/rotate-gitlab-token.sh
New encrypted gitlab-token for developer-portal-backend:
<encrypted-token>
```

or for the dev-portal-dev token

```bash
$ module load pollux
$ util/rotate-gitlab-token.sh
New encrypted gitlab-token for developer-portal-dev-backend:
<encrypted-token>
```

If the token has already expired, you will need to request a new one from a GitLab
admin. With this you can use the following process for GitHub API tokens to manually
create the encrypted version for the sealed secret.

### GitHub API Token

The GitHub API token is slightly more complicated. Currently it is linked to a user
account and needs to be manually rotated and copied in the user GitHub developer tools
settings. The same token is used for both dev-portal and dev-portal-dev, but the
SealedSecret needs to be encrypted by the specific cluster it will be applied to.
Again the script will handle this if the correct cluster is active. To update the
dev-portal token, copy it to your clipboard and run

```bash
$ module load argus
$ util/encrypt-github-token.sh $(xclip -o -selection clipboard)
New encrypted github-token for developer-portal-backend:
<encrypted-token>
```

or for the dev-portal-dev token

```bash
$ module load pollux
$ util/encrypt-github-token.sh $(xclip -o -selection clipboard)
New encrypted github-token for developer-portal-backend:
<encrypted-token>
```

You can also pass the literal token into the command, but doing it this way means then
token can't be saved to your shell history. A space before the command can also prevent the
unencrypted token being in your shell history (requires `HIST_IGNORE_SPACE` for zsh or
`HISTCONTROL=ignorespace` for bash), but then you can't recall the command.
