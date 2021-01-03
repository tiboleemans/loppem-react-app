const submitTempForm = require('./inscription_temporary_save');
const sendTempMail = require('./inscription_temporary_mail');

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({
  origin: true,
});
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.inscriptionTemporarySave = submitTempForm.inscriptionTemporarySave;
exports.inscriptionTemporarySaveMailRequest = submitTempForm.inscriptionTemporarySaveMailRequest;
exports.inscriptionTemporarySaveMailRequestUpdate = submitTempForm.inscriptionTemporarySaveMailRequestUpdate;

exports.inscriptionTemporaryMail = sendTempMail.inscriptionTemporaryMail;
