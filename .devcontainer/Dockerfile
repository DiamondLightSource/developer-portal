FROM node:18-bullseye

COPY docs-requirements.txt /tmp/requirements.txt

RUN apt update \
    && apt install -y python3-pip \
    && pip install -r /tmp/requirements.txt
