# Plainview API

**Table of Contents**

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Deployment](#deployment)
- [API](#api)

## Introduction

Plainview is a service for archiving online newspaper articles. It is planned to support other types in the future, but currently works off of a list of supported websites. This is the API repository, which contains all of the backend server code to create and maintain articles.

## Requirements

The Plainview API runs entirely off of [Node.js](https://nodejs.org/en/download/).

Plainview uses a [Mongo](https://www.mongodb.com/) database and [Amazon S3](https://aws.amazon.com/s3/) for its object store, so credentials to these services will be required to deploy.

## Installation

```
git clone https://www.github.com/plainviewdata/plainview-api
cd plainview-api
npm install
```

## Deployment

The API does not have any database connections preconfigured. Therefore, the config will have to be entered once after installing by running the `storage_config` script. The config can also be changed later at any time in the `config` directory or by running the `storage_config` script. If any of the values are missing, an error will be thrown. 

```
node dist/scripts/storage_config.js --DB_URL="" --DB_USERNAME="" --DB_PASSWORD="" --DB_NAME="" --AWS_ACCESS_KEY="" --AWS_SECRET_KEY="" --AWS_S3_URL="" --S3_BUCKET=""
npm start
Connected successfully to Mongo database!
```

Note: If `Error: ENOENT: no such file or directory` is thrown when running `storage_config`, try running the script from the base `plainview-api` directory.

## API

| HTTP Action              | Route          | Required Parameters   | Optional Parameters: default value | Description | 
| ------------- |---------------| ------| -----------| --------|
| `GET` | `/quotes/:id` | `id` | `ignore_min_time_passed: false` | Returns the quote associated with the given id in JSON format. Will check if the associated article has changed or not after the minimum number of time has passed since the last check. If `ignore_min_time_passed` is `true`, the article will be checked regardless of how much time has passed. | 
| `GET` | `/articles/:id` | `id` | `ignore_min_time_passed: false` | Returns the article associated with the given id in JSON format. Will check if the  article has changed or not after the minimum number of time has passed since the last check. If `ignore_min_time_passed` is `true`, the article will be checked regardless of how much time has passed. |
| `POST` | `/quotes` | `url:String, quote:String` | `ignore_min_time_passed: false, post_to_archive_is: true` | Creates a new quote from an article with the given `url` and the text with the given `quote`. Will archive the associated article if it hasn't already been archived. Will check if the associated article has changed or not after the minimum number of time has passed since the last check. If `ignore_min_time_passed` is `true`, the article will be checked regardless of how much time has passed. Will also archive the article on Archive.is if ` post_to_archive_is` is `true`. |
| `POST` | `/articles` | `url:String, quote:String` | `ignore_min_time_passed: false, post_to_archive_is: true` | Archives an article with the given `url`. Will archive the associated article if it hasn't already been archived. Will check if the associated article has changed or not after the minimum number of time has passed since the last check. If `ignore_min_time_passed` is `true`, the article will be checked regardless of how much time has passed. Will also archive the article on Archive.is if ` post_to_archive_is` is `true`. | 
| `GET` | `/supported_websites` | | | Returns a list of all the websites supporting article archival. |