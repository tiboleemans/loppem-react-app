# Description of functions
## Inscription save
The inscription **save** functionality is all about the temporary save of the inscription form. In general, functions related to these functionality are prefixed with *inscriptionSave*, source code of the functions can be found in *inscription_save.js*.

TLDR;
Http `POST` to `inscriptionSaveTemporary` saves in collection `inscription_temporary`. This triggers `inscriptionSaveMailCreatedInscription` which buffers the mails to send in collection `inscription_temporary_mails_to_send`.
A scheduled function `inscriptionSaveScheduleMail` will move the buffered mail data to the `mail_ext` collection where it is picked up by the mail sender extension. Similar flows are followed for updating.
### Create
The function `inscriptionSaveTemporary` is responsible for saving the form and only accepts `POST` calls. Any other calls will be rejected with an **HTTP400**.
The forms are stored in the collection `inscription_temporary`.

The validations are very basic and only require that the following fields are filled in:
* firstNameParent
* lastNameParent
* email

A successfull respnose returns HTTP 201 and the following sample response.
```json
{
  "id": "zFKw5akYMopLmRxO4aom"
}

This id document id of the inscription form in the collection.
```
### Update
The same function `inscriptionSaveTemporary` performs the update of an existing temporary inscription. The presence of the query parameter `id` makes the distinction between create and update.

A successfull respnose returns HTTP 200 and the following sample response.
```json
{
  "id": "zFKw5akYMopLmRxO4aom"
}
```

### Get
TODO

### Delete
TODO should happend as a result of saving it. Probably want to save with the same id as the temporary one.

### Sending emails
As soon as an inscription is inserted or updated in the collection `inscription_temporary` either the function `inscriptionSaveMailCreatedInscription` or `inscriptionSaveMailUpdatedInscription` is called. These functions will place a record in the collection `inscription_temporary_mails_to_send` with the basic information required to send the emails. This table serves as a buffer so that we do not send an email everytime a parent saves the form. The id of the document is exactly the same as the id of the `inscription_temporary` id, hence, there can only be one scheduled mail for each temporary inscription.

The scheduled function `inscriptionSaveScheduleMail` will check this collection on a regular basis and checks for documents that meet the condition `mailScheduled = false && campYear = 2021` (*or whatever campYear is returned by tools.campYear()*).
This function will place the mail data in the collection `mail_ext` which will be picked up by the mail sender extension.
# For development

## Setup of emulators
For the initial setup of the emulators, run `firebase init emulators`. Normally should only be done once.

## Dowloading the emulators
```bash
firebase setup:emulators:databas
firebase setup:emulators:firestore
firebase setup:emulators:pubsub
```

## Run the emulators
To run the emulators for some basic HTTP testing, you can just run `firebase emulators:start`. There's a nice [UI](http://127.0.0.1:3001)

For interactive testing (e.g. pub/sub messages), run the normal emulators but without functions, e.g. only Firebase

`firebase emulators:start --only firestore`

Then run the interactive shell

`firebase functions:shell`

To test a pub/sub message, do something like this

`inscriptionTemporaryMail({data: new Buffer('{"hello":"world"}'), attributes: {foo: 'bar'}})`
