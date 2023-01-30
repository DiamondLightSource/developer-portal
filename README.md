# Backstage Deployment

## Developing Locally (VSCode)

- [Install docker-compose](https://docs.docker.com/compose/install/other/)
- Enable the podman socket with `systemctl --user enable podman.socket`
- Add `export DOCKER_HOST=unix:///run/user/$UID/podman/podman.sock` to your `~/.bashrc`
- Install `ms-vscode-remote.remote-containers`
- Set `remote.containers.dockerPath` to `podman`
- Set `remote.containers.dockerComposePath` to your `docker-compose`
- Open Development Container
- Create a `.env` file in the `.devcontainer` directory containing
  - `GITHUB_TOKEN` - a GitHub personal access token used to retrieve organisation & repository data, with:
    - `read:org`
    - `read:user`
    - `user:email`
  - `GITHUB_APP_CLIENT_ID` - a GitHub OAuth App client ID used to provide user authentication
  - `GITHUB_APP_SECRET` - the corresponding GitHub OAuth App secret
- Start the app, with:
  ```sh
  yarn install
  yarn dev
  ```
