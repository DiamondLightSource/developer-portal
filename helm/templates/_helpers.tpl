{{/*
    Return the proper backend image name
*/}}
{{- define "devportal.backend.image" -}}
    {{ include "common.images.image" ( dict "imageRoot" .Values.backend.image "global" .Values.global ) }}
{{- end -}}

{{/*
    Return the proper frontend image name
*/}}
{{- define "devportal.frontend.image" -}}
    {{ include "common.images.image" ( dict "imageRoot" .Values.frontend.image "global" .Values.global ) }}
{{- end -}}

{{/*
    Create the name of the service account to use
*/}}
{{- define "devportal.serviceAccountName" -}}
    {{- if .Values.serviceAccount.create -}}
        {{ default (include "common.names.fullname" .) .Values.serviceAccount.name }}
    {{- else -}}
        {{ default "default" .Values.serviceAccount.name }}
    {{- end -}}
{{- end -}}

{{/*
    Create a name for postgres
*/}}
{{- define "devportal.postgres.fullname" -}}
    {{- include "common.names.dependency.fullname" ( dict "chartName" "postgresql" "chartValues" .Values.postgresql "context" $ ) -}}
{{- end -}}

{{/*
    Return the postgres hostname
*/}}
{{- define "devportal.postgres.host" -}}
    {{- if .Values.postgresql.create -}}
        {{- include "devportal.postgres.fullname" . -}}
    {{- else -}}
        {{- .Values.postgresql.existing.host | quote -}}
    {{- end -}}
{{- end -}}

{{/*
    Return the postgres port
*/}}
{{- define "devportal.postgres.port" -}}
    {{- if .Values.postgresql.create -}}
        {{- print 5432 | quote -}}
    {{- else -}}
        {{- .Values.postgresql.existing.port | quote -}}
    {{- end -}}
{{- end -}}

{{/*
    Return the postgres user
*/}}
{{- define "devportal.postgres.user" -}}
    {{- .Values.postgresql.auth.username -}}
{{- end -}}

{{/*
    Return the postgres secret name
*/}}
{{- define "devportal.postgres.secret.name" -}}
    {{- if .Values.postgresql.auth.existingSecret -}}
        {{- tpl .Values.postgresql.auth.existingSecret $ -}}
    {{- else -}}
        {{- default ( include "devportal.postgres.fullname" . ) ( tpl .Values.postgresql.auth.existingSecret $ ) -}}
    {{- end -}}
{{- end -}}

{{/*
    Return the postgres user password secret key
*/}}
{{- define "devportal.postgres.secret.passwordKey" -}}
    {{- if .Values.postgresql.auth.existingSecret -}}
        {{- .Values.postgresql.auth.secretKeys.userPasswordKey -}}
    {{- else -}}
        {{- print "password" -}}
    {{- end -}}
{{- end -}}
