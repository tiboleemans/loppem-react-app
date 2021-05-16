const inscriptionSave = require('./public/inscription_temporary');
const inscriptionMailToSend = require('./public/inscription_temporary_mails_to_send');
const inscriptionSubmit = require('./public/inscription');

const adminPayment = require('./admin/payments');
const adminNotes = require('./admin/notes');
const adminClasses = require('./admin/classes');

// ////.inscriptionTemporarySa <-- this is the max visible lenght of a function name
exports.inscriptionSaveTemporary = inscriptionSave.inscriptionSaveTemporary;
exports.inscriptionSaveGetTempInscription = inscriptionSave.inscriptionSaveGetTempInscription;

exports.inscriptionSaveMailAfterInscription = inscriptionMailToSend.inscriptionSaveMailAfterInscription;
exports.inscriptionSaveMailAfterUpdate = inscriptionMailToSend.inscriptionSaveMailAfterUpdate;
exports.inscriptionSaveConvertEmailForExt = inscriptionMailToSend.inscriptionSaveConvertEmailForExt;
exports.inscriptionSaveMailUpdatedInscription = inscriptionMailToSend.inscriptionSaveMailUpdatedInscription;
exports.inscriptionSaveScheduleMail = inscriptionMailToSend.inscriptionSaveScheduleMail;

exports.inscriptionSubmit = inscriptionSubmit.inscriptionSubmit;

exports.createInitialPayment = adminPayment.createInitialPayment;
exports.addPaymentAndConfirm = adminPayment.addPaymentAndConfirm;

exports.createNotesCook = adminNotes.createNotesCook;
exports.createNotesNurse = adminNotes.createNotesNurse;
exports.adminGetStudentNotes = adminNotes.adminGetStudentNotes;

exports.confirmStudentAfterPayment = adminClasses.confirmStudentAfterPayment;
