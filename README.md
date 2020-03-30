# Google Meet LTI

## Prepare the environment

1. In your Terminal or Command Prompt, run the following at the root of the project directory:

```
$ npm i
```

## Prepare the environment variables

1. Create a .env file, by renaming the provided sample
2. Set the environment variable values to your .env file

## How to run the project using NodeJS

In your Terminal or Command Prompt, run the following at the root of the
project directory to run the server, which will expose an API and call Aleks
whenever accessed:

```
$ npm start
```

## How to test the project using NodeJS

In your Terminal or Command Prompt, run the following at the root of the
project directory to run the tests:

```
$ npm test
```

## How to build the project using Docker

In your Terminal or Command Prompt, run the following at the root of the
directory to build the server and tag it `lti-googlemeet`:

```
$ docker build --tag lti-googlemeet .
```

## How to run the project using Docker

In your Terminal or Command Prompt, run the following to run the server, which will expose an API on port 3000 and call Aleks whenever accessed if you have the current .env file:

```
$ docker run -t -p 3000:3000 --env-file ./.env lti-googlemeet
```

Or run the following in Terminal/Command Prompt to define custom environment
variable(s)

```
$ docker run -p 3000:3000 -e DB_TYPE=type -e HOSTNAME=host -e DATABASE=db -e USER=user -e PASS=pass -e GCAL_CLIENT_EMAIL=gcal_client_email -e GCAL_PRIVATE_KEY=gcal_private_key  -e GCAL_CALENDAR_USER=gcal_calendar_user -e GCAL_CALENDAR_ID=gcal_calendar_id chapel-server
```

## How to deploy the project to DEV OpenShift

###### In your Terminal or Command Prompt run the following at the root directory of the project:

Log in to DEV OpenShift:

```
$ oc login https://master.sysdev.ose.apu.edu:8443
```

Deploy definitions to DEV Openshift:

```
$ ansible-playbook ./ansible/deploy-to-ose.yml -i ansible/inventories/development.yml
```

Then, build/deploy from your Terminal or Command Prompt:

```
$ oc start-build lti-googlemeet
```

Or, build/deploy from the Openshift GUI

## How to use the project

From your browser, or an application such as Postman, you can hit the following endpoints:

## Available Routes:

#### /ping - GET

Responds with `pong` and a `200` status code

#### /api/v1/lti - GET

Display LTI results for students, then returns
either a `200` or `400`

#### /api/v1/hangout/url - POST

Redirects the user to the appropriate Google Meet URL, if a URL exists in the database, then returns either a `200`, `301`, or `400`

#### /api/v1/oauthcallback - GET

After a successful oAuth, Google redirects the user to this endpoint and, a Google Calendar event will be created on the users calendar, then returns a `301`

## How to generate a markdown from the yaml files

In your Terminal or Command Prompt, run the following at the root of the project directory:

```
$ node src/main/utils/yamlToMD.js
```

This command looks for all YAML OpenAPI files within the project and prints to the console the endpoints in a markdown format, which you can then copy/paste to your own markdown file.
