#!/bin/bash

set -Eeuo pipefail

if [[ $(kubectl config current-context) == *"argus" ]]; then
    DEPLOYMENT="developer-portal-backend"
elif [[ $(kubectl config current-context) == *"pollux" ]]; then
    DEPLOYMENT="developer-portal-dev-backend"
else
    echo "ERROR: Load argus or pollux environment before running this script"
    exit 1
fi

CURRENT_TOKEN=$(
    kubectl get secret -n dev-portal ${DEPLOYMENT} --output yaml \
    | yq .data.gitlab-token \
    | base64 -d
)

if [ "$CURRENT_TOKEN" == "null" ]; then
    echo "ERROR: Could not find secret gitlab-token in ${DEPLOYMENT}"
    exit 1
fi

EXPIRY_DATE=$(date -d "+3 months" +%Y-%m-%d)
NEW_TOKEN=$(
    curl -sS -X POST --header "PRIVATE-TOKEN: ${CURRENT_TOKEN}" "https://gitlab.diamond.ac.uk/api/v4/personal_access_tokens/self/rotate?expires_at=${EXPIRY_DATE}" \
    | jq '.token'
)

if [ "$NEW_TOKEN" == "null" ]; then
    echo "ERROR: Failed to request new token from GitLab"
    exit 1
fi

ENCRYPTED_TOKEN=$(
    kubectl get secret -n dev-portal ${DEPLOYMENT} --output yaml \
    | yq '
        . |
        {"apiVersion": .apiVersion, "kind": .kind, "metadata": .metadata, "stringData": (.data | with_entries(.value |= @base64d))}
    ' \
    | yq ".stringData[\"gitlab-token\"] = ${NEW_TOKEN}" \
    | kubeseal --format yaml \
    | yq .spec.encryptedData.gitlab-token
)

echo -e "New encrypted gitlab-token for ${DEPLOYMENT}:\n$ENCRYPTED_TOKEN"
