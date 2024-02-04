const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors');
const tools = require('./tools');

const register = require('./public/registration');
const bringFriend = require('./public/bring_a_friend');
const interest = require('./public/interest');
const code = require('./public/code');
const jobs = require('./public/jobs');
const registrationMailToSend = require('./public/registration_temporary_mails_to_send');
const registrationSubmitMailToSend = require('./public/registration_mails_to_send');

const manageTemplate = require('./admin/manage_template.js');

const adminPayment = require('./admin/payments');
const adminNotes = require('./admin/notes');
const adminClasses = require('./admin/classes');
const adminStudent = require('./admin/student.js');

const CORS_CONFIG = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://loppem-adf69.web.app',
    'https://loppem-adf69.firebaseapp.com',
    'https://www.loppemconversa.be',
  ],
  methods: ['POST', 'PUT', 'GET', 'HEAD'],
};

// PUBLIC API
// All defined endpoints are available under the /api path
const app = express();
app.use(cors(CORS_CONFIG));

// Temporary inscriptions
// These are _only_ used when a parent doesn't submit the form but
// saves it for a later date (e.g. doesn't have all the data)
// app.post('/registration/temporary', (req, res) => {
//   tools.executeRequest(register.createTemporaryRegistration, req, res);
// });
// app.put('/registration/temporary', (req, res) => {
//   tools.executeRequest(register.updateTemporaryRegistration, req, res);
// });
app.get('/registration/:id', (req, res) => {
  tools.executeRequest(register.getRegistration, req, res);
});
app.post('/registration', (req, res) => {
  tools.executeRequest(register.createFinalRegistration, req, res);
});
app.put('/registration', (req, res) => {
  tools.executeRequest(register.updateFinalRegistration, req, res);
});

app.post('/claim-discount', (req, res) => {
  tools.executeRequest(bringFriend.claimDiscount, req, res);
});

app.post('/mail/interest', (req, res) => {
  tools.executeRequest(interest.sendInterestMail, req, res);
});

app.post('/mail/code', (req, res) => {
  tools.executeRequest(code.sendCodeMail, req, res);
});

app.post('/jobs/apply', (req, res) => {
  tools.executeRequest(jobs.sendApply, req, res);
});

app.get('/warm', (req, res) => { res.end(); });

exports.api = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(app);

// FIRESTORE TRIGGERED FUNCTIONS
// exports.inscriptionSaveMailAfterInscription = registrationMailToSend.inscriptionSaveMailAfterInscription;
// exports.inscriptionSaveMailAfterUpdate = registrationMailToSend.inscriptionSaveMailAfterUpdate;
// exports.inscriptionSaveConvertEmailForExt = registrationMailToSend.inscriptionSaveConvertEmailForExt;
// exports.inscriptionSaveScheduleMail = registrationMailToSend.inscriptionSaveScheduleMail;

exports.inscriptionSaveMailAfterSubmit = registrationSubmitMailToSend.inscriptionSaveMailAfterRegistration;
exports.jobsSaveMailAfterSubmit = jobs.jobsSendApplyMails;

// ADMIN API
// All defined endpoints are available under the /admin path
const admin = express();
admin.use(cors(CORS_CONFIG));

admin.post('/api/addPaymentAndConfirm', (req, res) => {
  tools.executeRequest(adminPayment.addPaymentAndConfirm, req, res);
});

admin.post('/api/updateTemplate', (req, res) => {
  tools.executeRequest(manageTemplate.updateTemplate, req, res);
});

exports.admin = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(admin);

exports.createInitialPayment = adminPayment.createInitialPayment;

exports.createNotesCook = adminNotes.createNotesCook;
exports.createNotesNurse = adminNotes.createNotesNurse;

// TODO: migrate below to express.js based /admin/api endpoint
// exports.adminGetStudentNotes = adminNotes.adminGetStudentNotes;
// exports.adminListStudentNotes = adminNotes.adminListStudentNotes;

exports.createStudentAfterPayment = adminStudent.createStudentAfterPayment;
exports.addNewStudentToDefaultClass = adminClasses.addNewStudentToDefaultClass;
