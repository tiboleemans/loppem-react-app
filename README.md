This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get started
npm run start

npm run build

firebase emulators:start --project development

firebase deploy
firebase deploy --only hosting
firebase deploy --only functions

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# Example of TODO.md

This is an example of TODO.md

View the raw content of this file to understand the format.

## Todo

### Backend
- [X] Data voorlopig opslaan na voorlopig inschrijven knop
- [X] Mail sturen met voorlopige edit link
- [X] Data ophalen
- [X] Data opslaan na inschrijven knop
  - [X] Opslaan data voor verpleegster
  - [X] Opslaan data voor kok
  - [X] Opslaan 0-betaling
  - [X] Opslaan data in klas collection (na bevestiging betaling)
- [X] Replace copy-paste of basic data with reference to original inscription document
- [ ] Add function to create classes
- [ ] Add function to assign 1 student to a class
- [ ] Versturen bevestigings mail inschrijving
- [ ] GET lijst klassen
- [ ] Lijst van niet betaalde inschrijvingen
- [ ] Export naar CSV van volledig kampjaar
- [ ] Generieke search op inschrijving
- [ ] Functie om rappel te sturen voor ontbrekende betaling (wanner laatste rappel verstuurt ?)
- [ ] GET/PUT voor notes cook
- [ ] GET/PUT voor notes nurse
- [ ] Medewerkers + assign to klas (naam/voornaam, RRN, geboortedatum, adres)


### Mail Templates
- [ ] Mail met edit link van voorlopig inschrijven
- [ ] Mail met bevestiging inschrijving
- [ ] Mail met rappel voor betaling
### Frontend
- [ ] Voorlopig inschrijven knop toevoegen
- [X] Getuigenissen
- [X] Contact
- [X] Foto's
- [X] Faq
- [X] Attestations
- [ ] Enhancements
  - fotos intro automatisch 2seconden
  - Imagecarousel:
    -> arrows should be 'mui fab button'
    -> hover with hand
    -> add autoloop
    -> fix youtube
    -> use arrows on fullscreen







## Analyse

Admin pagina
--> lijst alle voorlopige inschrijvingen op -> stuur mail met link naar voorlopige data
--> manuele aanpassingen voor verpleegster
--> link leerlingen met een klas
--> link leerkrachten met een klas

Inschrijvingen
--> kampjaar, data van leerlingen, ouders, gedupliceerde school
--> Voornaam leerlinge, naam , medische data voor verpleegster
--> data voor de kok


Medewerkers
--> data leerkrachten, monitoren, ..., klas


Link leerling leerkracht klas

Betalingen
--> kampjaar, Basic info (naam voornaam geboortedatum email, naam voornaam ouder) van inschrijving (dup data)
--> rapppels (bedrag < 400) 1 maand na inschrijving stuur mail

Klassen
--> leerlingen info + klas

Voorlopige ingeschreven (oude inschrijvingen)
Uitgeschreven
Wachtlijst

Scholen
--> adressen scholen
