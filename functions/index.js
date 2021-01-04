const inscriptionSave = require('./inscription_save');
const inscriptionSubmit = require('./inscription_submit');

// ////.inscriptionTemporarySa <-- this is the max visible lenght of a function name
exports.inscriptionSaveTemporary = inscriptionSave.inscriptionSaveTemporary;
exports.inscriptionSaveGetTempInscrition = inscriptionSave.inscriptionSaveGetTempInscrition
exports.inscriptionSaveMailCreatedInscription = inscriptionSave.inscriptionSaveMailCreatedInscription;
exports.inscriptionSaveMailUpdatedInscription = inscriptionSave.inscriptionSaveMailUpdatedInscription;
exports.inscriptionSaveScheduleMail = inscriptionSave.inscriptionSaveScheduleMail;
