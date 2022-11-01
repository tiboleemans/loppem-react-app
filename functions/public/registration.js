// =================================================================================
// Student registration
// This the public part of the registration process. The parents can temporarily
// register them without actually "submitting" them to the camp. As long as the
// parents do not finally submit the form, they can still modify the data.
// As soon as they finalize the registation, the status will change to "final"
// which indicates the it is pending payment for the camp.
// =================================================================================
const tools = require('../tools');
const {admin, db} = require('../db');


exports.createTemporaryRegistration = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
  validationResult = await validateTemporary(req, res, false);
  if (!validationResult.isValid) {
    console.log(`Validation failed: ${validationResult.response}`)
    return validationResult.response;
  }

  validationResult.validationData.value.status = 'TEMPORARY';
  const docId = await performInsert(validationResult.validationData.value);
  return res.status(201).json(await getAndTransformRegistration(docId));

}

exports.updateTemporaryRegistration = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
  validation = await validateTemporary(req, res, true);
  if (!validation.isValid) {
    return res;
  }

  validationResult.validationData.value.status = 'TEMPORARY';
  await performUpdate(req.body.id, validationResult.validationData.value);

  return res.status(200).json(await getAndTransformRegistration(req.body.id));

}

async function validateTemporary(req, res, isUpdate) {
  result = {
    isValid: false,
    response: null,
    validationData: null
  }

  if (!req.body.id && isUpdate) {
    result.response = res.status(400).json({
      message: 'id is mandatory when updating a registration',
    });
    return result;
  }

  if (req.body.id && !isUpdate) {
    result.response = res.status(400).json({
      message: 'id is not allowed when creating a registration',
    });
    return result;
  }

  if (isUpdate) {
    const doc = await db.collection('registration')
      .doc(req.body.id).get();
    if (!doc.exists) {
      result.response = res.status(404).json({
        message: `the registration with id ${req.body.id} was not found`,
      });
      return result;
    }
    if (!doc.status == 'TEMPORARY') {
      result.response = res.status(400).json({
        message: 'temporary updates are not allowed if the status is not TEMPORARY',
      });
      return result;
    }
  }

  const validation = preValidateTemporary(req.body);

  if (validation.error != null) {
    console.log(validation);
    result.response = res.status(400).json(
        validation,
    );
    return result;
  }

  result.isValid = true;
  result.validationData = validation;
  return result;
}

exports.createFinalRegistration = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
}

exports.updateFinalRegistration = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
}


exports.getRegistration = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }

  const docId = req.params.id;
  if (docId == null) {
    return res.status(400).json({
      message: 'id is a mandatory parameter',
    });
  }

  const registration = await getAndTransformRegistration(docId);
  if (registration) {
    return res.json(registration);
  } else {
    return res.status(404).json({
      message: `Document with ${docId} not found`
    });
  }
};

async function getAndTransformRegistration(docId) {
  const doc = await db.collection('registration')
    .doc(docId).get();
  if (!doc.exists) {
    return null;
  }
  return {...tools.stripTechnicalFields(doc.data()),
    id: docId,
  }
}

/**
 * Insert a new record in the table 'inscription_temporary'.
 * Returns the document ID
 * @param {*} data the request body (student data)
 */
async function performInsert(data) {
  const writeResult = await db
      .collection('registration')
      .add({
        ...data,
        insertTimestamp: new Date(),
        campYear: tools.campYear(),
      });
  console.info(`Added document with id ${writeResult.id}`);
  return writeResult.id;
}

/**
 * Updates an existing document, merges the data (e.g. missing fields will not be removed)
 * @param {string} docId
 * @param {*} data student data
 */
async function performUpdate(docId, data) {
  await db
      .collection('registration')
      .doc(docId)
      .set({
        ...data,
        updateTimestamp: new Date(),
      }, {
        merge: true,
      },
      );
  console.info(`Updated document with id ${docId}`);
}


/**
 * Contact information of parents is required, otherwise we can't contact them
 * @param {*} data student data
 * @return {boolean} true if contact information is correct
 */
function preValidateTemporary(data) {
  const joi = tools.saferJoi;
  const schema = joi.object({
    id: joi.string().optional().trim().allow(''),
    status: joi.string().optional().trim().allow('TEMPORARY', 'FINAL', ''),
    student: joi.object().keys({
      language: joi.string().trim().allow(''),
      period: joi.string().trim().allow(''),
      firstNameStudent: joi.string().trim().allow(''),
      lastNameStudent: joi.string().trim().allow(''),
      gender: joi.string().trim().allow(''),
      birthday: joi.string().trim().allow(''),
    }),
    parent: joi.object().keys({
      siteLanguage: joi.string().trim().required(),
      firstNameParent: joi.string().trim().min(3).required(),
      lastNameParent: joi.string().trim().min(3).required(),
      email: joi.string().trim().email().required(),
      relation: joi.string().trim().allow(''),
      street: joi.string().trim().allow(''),
      houseNr: joi.string().trim().allow(''),
      busNr: joi.string().trim().allow(''),
      city: joi.string().trim().allow(''),
      zipCode: joi.string().trim().allow(''),
      gsm: joi.string().trim().allow(''),
      gsm2: joi.string().trim().allow(''),
    }),
    school: joi.object().keys({
      nameSchool: joi.string().trim().allow(''),
      streetSchool: joi.string().trim().allow(''),
      houseNrSchool: joi.string().trim().allow(''),
      busNrSchool: joi.string().trim().allow(''),
      citySchool: joi.string().trim().allow(''),
      zipSchool: joi.string().trim().allow(''),
      titleProfSchool: joi.string().trim().allow(''),
      nameProfSchool: joi.string().trim().allow(''),
      yearsSchool: joi.string().trim().allow(''),
      hoursSchool: joi.string().trim().allow(''),
      immersionSchool: joi.boolean().allow(null),
      reportSchool: joi.boolean().allow(null),
    }),
    extra: joi.object().keys({
      apportedStudent: joi.string().trim().allow(''),
      contact: joi.string().trim().allow(''),
      additionalInfo: joi.string().trim().allow(''),
      foodInfo: joi.string().trim().allow(''),
      interest: joi.string().trim().allow(''),
      acceptPictures: joi.boolean().allow(null),
      acceptTerms: joi.boolean().allow(null),
    }),
  });

  return schema.validate(data, {
    presence: 'required', // don't save an empty object
    convert: true, // perform trim and XSS sanitizations
    abortEarly: true, // temporary save is very lax
    allowUnknown: false, // do not allow unknonw fields
    errors: {
      escapeHtml: true, // espace the original data in error messages
    },
  });
}
