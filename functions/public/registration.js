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

console.log("in registration.js")

// ████████╗███████╗███╗   ███╗██████╗  ██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗
// ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
//    ██║   █████╗  ██╔████╔██║██████╔╝██║   ██║██████╔╝███████║██████╔╝ ╚████╔╝
//    ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗██╔══██║██╔══██╗  ╚██╔╝
//    ██║   ███████╗██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║██║  ██║██║  ██║   ██║
//    ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

// ██████╗ ███████╗ ██████╗ ██╗███████╗████████╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   ██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║███████╗╚██████╔╝██║███████║   ██║   ██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
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

  if (validateBodyId(req, res, isUpdate) != null) {
    result.response = res;
    return result;
  }

  if (isUpdate) {
    if (await validateUpdateTemporary(req, res) != null) {
      result.response = res;
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
      birthdate: joi.string().trim().allow(''),
    }),
    parent: joi.object().keys({
      language: joi.string().trim().required(),
      firstName: joi.string().trim().min(3).required(),
      lastName: joi.string().trim().min(3).required(),
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
      name: joi.string().trim().allow(''),
      street: joi.string().trim().allow(''),
      houseNr: joi.string().trim().allow(''),
      busNr: joi.string().trim().allow(''),
      city: joi.string().trim().allow(''),
      zip: joi.string().trim().allow(''),
      titleProf: joi.string().trim().allow(''),
      nameProf: joi.string().trim().allow(''),
      years: joi.string().trim().allow(''),
      hours: joi.string().trim().allow(''),
      immersion: joi.string().trim().allow(''),
    }),
    extra: joi.object().keys({
      referral: joi.string().trim().allow(''),
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

async function validateUpdateTemporary(req, res) {
  const doc = await db.collection('registration')
    .doc(req.body.id).get();
  if (!doc.exists) {
    return res.status(404).json({
      message: `the registration with id ${req.body.id} was not found`,
    });
  }
  if (!doc.status == 'TEMPORARY') {
    return res.status(400).json({
      message: 'temporary updates are not allowed if the status is not TEMPORARY',
    });
  }
  return null;
}

// ███████╗██╗███╗   ██╗ █████╗ ██╗
// ██╔════╝██║████╗  ██║██╔══██╗██║
// █████╗  ██║██╔██╗ ██║███████║██║
// ██╔══╝  ██║██║╚██╗██║██╔══██║██║
// ██║     ██║██║ ╚████║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝

// ██████╗ ███████╗ ██████╗ ██╗███████╗████████╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   ██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║███████╗╚██████╔╝██║███████║   ██║   ██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝


exports.createFinalRegistration = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }

  validationResult = await validateFinal(req, res, req.body.id);
  if (!validationResult.isValid) {
    console.log(`Final validation failed: ${validationResult.response}`)
    return validationResult.response;
  }

  validationResult.validationData.value.status = 'FINAL';
  let docId = req.body.id;
  if (docId) {
    await performUpdate(docId, validationResult.validationData.value);
    return res.status(200).json(await getAndTransformRegistration(docId));
  } else {
    docId = await performInsert(validationResult.validationData.value);
    return res.status(201).json(await getAndTransformRegistration(docId));
  }
}

exports.updateFinalRegistration = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
}

async function validateUpdateFinal(req, res) {
  const doc = await db.collection('registration')
    .doc(req.body.id).get();
  if (!doc.exists) {
    return res.status(404).json({
      message: `the registration with id ${req.body.id} was not found`,
    });
  }
  if (!doc.status == 'FINAL') {
    return res.status(400).json({
      message: 'final updates are not allowed if the status is not FINAL',
    });
  }
  return null;
}

async function validateFinal(req, res, isUpdate) {
  result = {
    isValid: false,
    response: null,
    validationData: null
  }

  if (validateBodyId(req, res, isUpdate) != null) {
    result.response = res;
    return result;
  }

  if (isUpdate) {
    if (await validateUpdateFinal(req, res) != null) {
      result.response = res;
      return result;
    }
  }

  const validation = preValidateFinal(req.body);
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

/**
 * Validates and sanitizes input
 * @param {*} data
 * @return {*} validation data
 */
function preValidateFinal(data) {
  const joi = tools.saferJoi;
  const schema = joi.object({
    id: joi.string().optional().trim().allow(''),
    status: joi.string().optional().trim().allow('TEMPORARY', 'FINAL', ''),
    student: joi.object().keys({
      language: joi.string().trim().min(1).max(100).required(),
      period: joi.string().trim().min(1).max(100).required(),
      firstName: joi.string().trim().min(1).max(100).required(),
      lastName: joi.string().trim().min(1).max(100).required(),
      gender: joi.string().trim().min(1).max(100).required(),
      birthdate: joi.string().trim().max(100).required(), // TODO: add regex or use date
    }),
    parent: joi.object().keys({
      language: joi.string().trim().allow(''),
      firstName: joi.string().trim().min(1).max(100).required(),
      lastName: joi.string().trim().min(1).max(100).required(),
      // email: joi.string().trim().email().required(),
      email: joi.string().trim().required().min(1).max(100),
      relation: joi.string().trim().required().min(1).max(100),
      street: joi.string().trim().min(1).required().min(1).max(100),
      houseNr: joi.string().trim().min(1).required().min(1).max(100),
      busNr: joi.string().trim().allow('').max(100),
      city: joi.string().trim().min(1).required().min(1).max(100),
      zipCode: joi.string().trim().min(1).required().min(1).max(100),
      gsm: joi.string().trim().min(1).required().min(1).max(100),
      gsm2: joi.string().trim().allow(''),
    }),
    school: joi.object().keys({
      name: joi.string().trim().required().min(1).max(100),
      city: joi.string().trim().required().min(1).max(100),
      years: joi.string().trim().required().min(1).max(100),
      hours: joi.string().trim().required().min(1).max(100),
      immersion: joi.string().trim().required().min(1).max(100),
    }),
    extra: joi.object().keys({
      contact: joi.string().trim().min(1).required(),
      additionalInfo: joi.string().trim().allow('').max(1000),
      foodInfo: joi.string().trim().allow('').max(1000),
      acceptPictures: joi.boolean(),
      acceptTerms: joi.boolean(),
    })
  });

  return schema.validate(data, {
    presence: 'required', // don't save an empty object
    convert: true, // perform trim and XSS sanitizations
    abortEarly: false, // validate all fields instead of stopping at the first error
    allowUnknown: false, // do not allow unknown fields
    errors: {
      escapeHtml: true, // espace the original data in error messages
    },
  });
}


// ██████╗ ███████╗████████╗
// ██╔════╝ ██╔════╝╚══██╔══╝
// ██║  ███╗█████╗     ██║
// ██║   ██║██╔══╝     ██║
// ╚██████╔╝███████╗   ██║
//  ╚═════╝ ╚══════╝   ╚═╝

// ██████╗ ███████╗ ██████╗ ██╗███████╗████████╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   ██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║███████╗╚██████╔╝██║███████║   ██║   ██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

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
  return {
    ...tools.stripTechnicalFields(doc.data()),
    id: docId,
  }
}

//  ██████╗ ████████╗██╗  ██╗███████╗██████╗     ███████╗████████╗██╗   ██╗███████╗███████╗
// ██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗    ██╔════╝╚══██╔══╝██║   ██║██╔════╝██╔════╝
// ██║   ██║   ██║   ███████║█████╗  ██████╔╝    ███████╗   ██║   ██║   ██║█████╗  █████╗
// ██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██╗    ╚════██║   ██║   ██║   ██║██╔══╝  ██╔══╝
// ╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║    ███████║   ██║   ╚██████╔╝██║     ██║
//  ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝


/**
 * Insert a new record in the table 'inscription_temporary'.
 * Returns the document ID
 * @param {*} data the request bodyActiveTab (student data)
 */
async function performInsert(data) {
  console.log("In performInsert");
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

function validateBodyId(req, res, isUpdate) {
  if (!req.body.id && isUpdate) {
    return res.status(400).json({
      message: 'id is mandatory when updating a registration',
    });
  }

  if (req.body.id && !isUpdate) {
    return res.status(400).json({
      message: 'id is not allowed when creating a registration',
    });
  }
  return null;
}
