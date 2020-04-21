# Google Meet LTI

## Prepare the environment

1. In your Terminal or Command Prompt, run the following at the root of the project directory:

```
$ npm i
```

2. Add a favion.png and logo.png to the `/src/main/branding` folder, there are examples in `/src/main/branding/examples`

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

### /hangout/url - POST

Summary: Redirect the user to the appropriate Google Meet URL, if a URL exists
Description: Redirects the user to the Google Meet, if the Google Meet has been created, otherwise an HTML file is sent explaining to the user the Google event has not been created yet
#### Parameters
None

#### Responses
 - **Status Code: 200**
  - Description: Not ready, needs authorization
 - **Status Code: 301**
  - Description: Redirect to Google Meet
 - **Status Code: 400**
  - Description: Class Code not specified

### /oauthcallback - GET

Summary: oAuth redirects here
Description: After a successful authorization, Google should redirect the user to this endpoint. Furthermore, this endpoint will create the calendar event, save it to the database and return the Google Meet link
#### Parameters
 - ##### code
  - Description: Authorization code coming from Google
  - Required: true
  - Data Type: string
 - ##### state
  - Description: State of the redirect from Google
  - Required: false
  - Data Type: string

#### Responses
 - **Status Code: 301**
  - Description: Redirect to Google Meet

### /xml - GET

Summary: Returns LTI configuration XML
Description: Returns LTI configuration XML
#### Parameters
None

#### Responses
 - **Status Code: 200**
  - Description: Returns the XML configuration to be used by Canvas when creating the
LTI in Canvas


### /ping - GET

Summary: receive a pong response from the server
Description: By going to the ping endpoint, the server will send pong if the request is successful
#### Parameters
None

#### Responses
 - **Status Code: 200**
  - Description: receive 'pong' from the server

## How to generate a markdown from the yaml files

In your Terminal or Command Prompt, run the following at the root of the project directory:

```
$ node src/main/utils/yamlToMD.js
```

This command looks for all YAML OpenAPI files within the project and prints to the console the endpoints in a markdown format, which you can then copy/paste to your own markdown file.
