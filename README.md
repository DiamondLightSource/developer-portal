# Backstage Deployment

## Developing Locally (VSCode)

- [Install docker-compose](https://docs.docker.com/compose/install/other/)
- Enable the podman socket with `systemctl --user enable podman.socket`
- Add `export DOCKER_HOST=unix:///run/user/$UID/podman/podman.sock` to your `~/.bashrc`
- Install `ms-vscode-remote.remote-containers`
- Set `remote.containers.dockerPath` to `podman`
- Set `remote.containers.dockerComposePath` to your `docker-compose`
- Open Development Container
- To start the app, run:
  ```sh
  yarn install
  yarn dev
  ```