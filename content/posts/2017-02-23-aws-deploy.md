+++
draft = true
date = "2017-02-23"
title = "AWS Deploy"
description = "AWS Deploy - do and don't"
categories = ["aws"]
tags = ["aws", "deploy", "docker", "jar"]
+++

## AWS

### Continous deploy to dev, qa (staging)

#### Requirements

* Immutable builds
* Configuration file for each stage.
* Semantic Versioning.
* `awscli` AWS CLI

#### Description

1. Build your app after each commit to `master` branch.
1. Put it on `S3` archive after each successful build - after each feature merged increase `MINOR`, after each bugfix `MINOR`.
1. Pack app and its config into S3
```bash
aws s3api put-object --bucket mcs-code-release --key "$SITENAME/$ROLE/$STATUS/$FILENAME-metadata.tgz" --body "$TARBALL" --metadata author="$AUTHOR",email="$EMAIL"
```

1. For dev/qa - Wait for the code to be deployed; For prod - deploy will send email to the publisher and pause the workflow. Email will have link to resume deploy workflow.

* SITENAME: is site name, without any www in front, e.g. mtv.com
* ROLE: is puppet role of the instance, like php7, jetty_codedeploy
* STATUS (stage): one of: development, qa, production
* FILENAME: artefact name of your choice
* METADATA (e.g. "version-1.2.3-metadata.tgz"), in which case workflow will expect following S3 object metadata to be set:
  * author: Full name of the person requesting deployment
  * email: E-mail of the person requesting deployment
