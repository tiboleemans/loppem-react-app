# I forget everything

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
