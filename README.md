# Microservice Sample

## Environment Config

Node.js 16

## Requirement

install [gcloud cli](https://cloud.google.com/sdk/docs/install) or download directly [windows installer](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe)

## switching gcloud project

```cmd
gcloud config set project <PROJECT_NAME>
```

## run locally

```cmd
npm run dev
```

## How to Deploy to Cloud Run

```cmd
gcloud run deploy --source .
```
