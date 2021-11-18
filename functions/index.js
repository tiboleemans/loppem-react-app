const inscriptionSave = require('./public/inscription_temporary');
const inscriptionMailToSend = require('./public/inscription_temporary_mails_to_send');
const inscriptionSubmit = require('./public/inscription');
const inscriptionSubmitMailToSend = require('./public/inscription_mails_to_send');

const manageTemplate = require('./public/manage_template.js');

const adminPayment = require('./admin/payments');
const adminNotes = require('./admin/notes');
const adminClasses = require('./admin/classes');
const adminStudent = require('./admin/student.js');

// ////.inscriptionTemporarySa <-- this is the max visible lenght of a function name
exports.inscriptionSaveTemporary = inscriptionSave.inscriptionSaveTemporary;
exports.inscriptionSaveGetTempInscription = inscriptionSave.inscriptionSaveGetTempInscription;

exports.inscriptionSaveMailAfterInscription = inscriptionMailToSend.inscriptionSaveMailAfterInscription;
exports.inscriptionSaveMailAfterUpdate = inscriptionMailToSend.inscriptionSaveMailAfterUpdate;
exports.inscriptionSaveConvertEmailForExt = inscriptionMailToSend.inscriptionSaveConvertEmailForExt;
exports.inscriptionSaveMailUpdatedInscription = inscriptionMailToSend.inscriptionSaveMailUpdatedInscription;
exports.inscriptionSaveScheduleMail = inscriptionMailToSend.inscriptionSaveScheduleMail;

exports.inscriptionSaveMailAfterSubmit = inscriptionSubmitMailToSend.inscriptionSaveMailAfterSubmit;

exports.updateTemplate = manageTemplate.updateTemplate

exports.inscriptionSubmit = inscriptionSubmit.inscriptionSubmit;

exports.createInitialPayment = adminPayment.createInitialPayment;
exports.addPaymentAndConfirm = adminPayment.addPaymentAndConfirm;

exports.createNotesCook = adminNotes.createNotesCook;
exports.createNotesNurse = adminNotes.createNotesNurse;
exports.adminGetStudentNotes = adminNotes.adminGetStudentNotes;
exports.adminListStudentNotes = adminNotes.adminListStudentNotes;

exports.createStudentAfterPayment = adminStudent.createStudentAfterPayment;
exports.addNewStudentToDefaultClass = adminClasses.addNewStudentToDefaultClass;
