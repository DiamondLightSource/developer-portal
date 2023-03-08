FROM node:18-bullseye

COPY backstage/docs-requirements.txt /tmp/docs-requirements.txt

RUN apt-get update \
    && apt-get install -y python3-pip \
    && pip install -r /tmp/docs-requirements.txt
