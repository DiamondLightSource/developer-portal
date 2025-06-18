#!/bin/bash

set -Eeuo pipefail

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <new-token>"
    exit 1
fi

NEW_TOKEN="$1"

if [[ $(kubectl config current-context) == *"argus" ]]; then
    DEPLOYMENT="developer-portal-backend"
elif [[ $(kubectl config current-context) == *"pollux" ]]; then
    DEPLOYMENT="developer-portal-dev-backend"
else
    echo "ERROR: Load argus or pollux environment before running this script"
    exit 1
fi

ENCRYPTED_TOKEN=$(
    kubectl get secret -n dev-portal ${DEPLOYMENT} --output yaml \
    | yq '
        . |
        {"apiVersion": .apiVersion, "kind": .kind, "metadata": .metadata, "stringData": (.data | with_entries(.value |= @base64d))}
    ' \
    | yq ".stringData[\"github-token\"] = \"${NEW_TOKEN}\"" \
    | kubeseal --format yaml \
    | yq .spec.encryptedData.github-token
)

echo -e "New encrypted github-token for ${DEPLOYMENT}:\n$ENCRYPTED_TOKEN"
