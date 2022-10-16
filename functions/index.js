const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors');
const tools = require('./tools');

const inscriptionSave = require('./public/inscription_temporary');
const inscriptionMailToSend = require('./public/inscription_temporary_mails_to_send');
const inscriptionSubmit = require('./public/inscription');
const inscriptionSubmitMailToSend = require('./public/inscription_mails_to_send');

const manageTemplate = require('./public/manage_template.js');

const adminPayment = require('./admin/payments');
const adminNotes = require('./admin/notes');
const adminClasses = require('./admin/classes');
const adminStudent = require('./admin/student.js');

// PUBLIC API
// All defined endpoints are available under the /api path
const app = express();
app.use(cors({origin: true}));

// Temporary inscriptions
// These are _only_ used when a parent doesn't submit the form but
// saves it for a later date (e.g. doesn't have all the data)
app.post('/inscriptionSaveTemporary', (req, res) => {
  inscriptionSave.inscriptionSaveTemporary(req, res);
});
app.get('/inscriptionSaveGetTempInscription', (req, res) => {
  inscriptionSave.inscriptionSaveGetTempInscription(req, res);
});
app.post('/inscriptionSubmit', (req, res) => {
  inscriptionSubmit.inscriptionSubmit(req, res);
});

exports.api = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(app);

// FIRESTORE TRIGGERED FUNCTIONS
exports.inscriptionSaveMailAfterInscription = inscriptionMailToSend.inscriptionSaveMailAfterInscription;
exports.inscriptionSaveMailAfterUpdate = inscriptionMailToSend.inscriptionSaveMailAfterUpdate;
exports.inscriptionSaveConvertEmailForExt = inscriptionMailToSend.inscriptionSaveConvertEmailForExt;
exports.inscriptionSaveMailUpdatedInscription = inscriptionMailToSend.inscriptionSaveMailUpdatedInscription;
exports.inscriptionSaveScheduleMail = inscriptionMailToSend.inscriptionSaveScheduleMail;

exports.inscriptionSaveMailAfterSubmit = inscriptionSubmitMailToSend.inscriptionSaveMailAfterSubmit;

// ADMIN API
// All defined endpoints are available under the /admin path
const admin = express();
admin.use(cors({origin: true}));

admin.post('/api/addPaymentAndConfirm', (req, res) => {
  adminPayment.addPaymentAndConfirm(req, res);
});

exports.admin = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(admin);

// JUST SOME ENDPOINT TO MANAGED MAIL TEMPLATES
exports.updateTemplate = manageTemplate.updateTemplate;

exports.createInitialPayment = adminPayment.createInitialPayment;

exports.createNotesCook = adminNotes.createNotesCook;
exports.createNotesNurse = adminNotes.createNotesNurse;

// TODO: migrate below to express.js based /admin/api endpoint
// exports.adminGetStudentNotes = adminNotes.adminGetStudentNotes;
// exports.adminListStudentNotes = adminNotes.adminListStudentNotes;

exports.createStudentAfterPayment = adminStudent.createStudentAfterPayment;
exports.addNewStudentToDefaultClass = adminClasses.addNewStudentToDefaultClass;
