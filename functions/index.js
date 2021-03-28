const inscriptionSave = require('./inscription_save');
const inscriptionSubmit = require('./inscription_submit');

// ////.inscriptionTemporarySa <-- this is the max visible lenght of a function name
exports.inscriptionSaveTemporary = inscriptionSave.inscriptionSaveTemporary;
exports.inscriptionSaveGetTempInscription = inscriptionSave.inscriptionSaveGetTempInscription;
exports.inscriptionSaveMailAfterInscription = inscriptionSave.inscriptionSaveMailAfterInscription;
exports.inscriptionSaveMailAfterUpdate = inscriptionSave.inscriptionSaveMailAfterUpdate;
exports.inscriptionSaveConvertEmailForExt = inscriptionSave.inscriptionSaveConvertEmailForExt;
exports.inscriptionSaveMailUpdatedInscription = inscriptionSave.inscriptionSaveMailUpdatedInscription;
exports.inscriptionSaveScheduleMail = inscriptionSave.inscriptionSaveScheduleMail;

exports.inscriptionSubmit = inscriptionSubmit.inscriptionSubmit;
exports.createInitialPayment = inscriptionSubmit.createInitialPayment;
exports.createNotesCook = inscriptionSubmit.createNotesCook;
exports.createNotesNurse = inscriptionSubmit.createNotesNurse;

exports.addPaymentAndConfirm = inscriptionSubmit.addPaymentAndConfirm;
exports.confirmStudentAfterPayment = inscriptionSubmit.confirmStudentAfterPayment;
