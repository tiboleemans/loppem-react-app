# Description of functions
## Inscription save
The inscription "save" functionality revolves around temporarily saving the inscription form. This means that the form is stored in our database, but the parent has not yet finished filling in all the data and/or confirmed the inscription.

In general, functions related to this functionality are prefixed with *inscriptionSave*, source code of the functions can be found in *public/inscription_temporary.js*.

TLDR;
Http `POST` to `inscriptionSaveTemporary` will save the data in collection `inscription_temporary`. This triggers `inscriptionSaveMailAfterInscription` which buffers the mails to send in collection `inscription_temporary_mails_to_send`.
A scheduled function `inscriptionSaveScheduleMail` will move the buffered mail data to the `mail_ext` collection where it is picked up by the mail sender extension. Similar flows are followed for updating.
### Create
The function `inscriptionSaveTemporary` is responsible for saving the form and only accepts `POST` calls. Any other calls will be rejected with an `HTTP400`.
The forms are stored in the collection `inscription_temporary`.

The validations are very basic and only require that the following fields are filled in:
* firstNameParent
* lastNameParent
* email

A successfull response returns `HTTP201` and the following sample response, which contains the unique document from the database collection.
```json
{
  "id": "zFKw5akYMopLmRxO4aom"
}


```
### Update
The same function `inscriptionSaveTemporary` performs the update of an existing temporary inscription. The presence of the query parameter `id` makes the distinction between create and update.

A successfull response returns `HTTP200` and the following sample response.
```json
{
  "id": "zFKw5akYMopLmRxO4aom"
}
```

### Get
The `GET` method `inscriptionSaveGetTempInscription` is responsible for fetching an existing temporary inscription from the `inscription_temporary` collection. The mandatory `id` request parameter is the document id of the collection (as retuned by `inscriptionSaveTemporary` and we will also use in the e-mail we send to the parent).

### Delete
TODO should happen as a result of saving it (inscription). Probably want to save with the same id as the temporary one.

### Sending emails
As soon as an inscription is inserted or updated in the collection `inscription_temporary` either the function `inscriptionSaveMailCreatedInscription` or `inscriptionSaveMailUpdatedInscription` is called. These functions will place a record in the collection `inscription_temporary_mails_to_send` with the basic information required to send the emails. This table serves as a buffer so that we do not send an email everytime a parent saves the form. The id of the document is exactly the same as the id of the `inscription_temporary` id, hence, there can only be one scheduled mail for each temporary inscription.

The scheduled function `inscriptionSaveScheduleMail` will check this collection on a regular basis and checks for documents that meet the condition `mailScheduled == false && campYear = 2021` (*or whatever campYear is returned by tools.campYear()*).

This function will store the mail data in the collection `mail_ext` which will be picked up by the mail sender extension.
# For development

## Setup of emulators
For the initial setup of the emulators, run `firebase init emulators`. Normally this should only be done once.

## Dowloading the emulators
```bash
firebase setup:emulators:database
firebase setup:emulators:firestore
firebase setup:emulators:pubsub
```

## Run the emulators
To run the emulators for some basic HTTP testing, you can just run `firebase emulators:start`. There's a nice [UI](http://127.0.0.1:3001)

*Important*: if pubsub doesn't work, it's probably because it can't find java or `JAVA_HOME` is not set correctly. Check the *pubsub-debug.log* for more info.

For interactive testing (e.g. pub/sub messages), run the normal emulators but without functions, e.g. only Firestore

`firebase emulators:start --only firestore`

Then run the interactive shell

`firebase functions:shell`

To test a pub/sub message, do something like this

`inscriptionTemporaryMail({data: new Buffer('{"hello":"world"}'), attributes: {foo: 'bar'}})`

## Running tests
The tests are very basic integration tests and only cover basic scenario's. To run the tests you must have the firebase emulators running. Run the tests with `npm run test`. It's possible that the first test run fails due to some timeouts, this is because the first run of a function takes a bit more time to complete as it's still being setup by firebase. This limitation is something I can perfectly live with and I'm not planning on changing the tests for it :)
