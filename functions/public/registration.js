// =================================================================================
// Student temporary inscription
// This class is responsible for CRU interaction with the inscription_temporary,
// containing the students which aren't permanently inscribed into the system (yet).
// This might trigger actions defined in the inscription_temporary_mails_to_send.js.
// This functionality is only used when parents don't submit the student but rather
// save it's data and want to continue with the form data on a later moment.
// =================================================================================
const tools = require('../tools');
const {admin, db} = require('../db');

/**
 * REST: temporarily inscribe a student into the system
 * @param {Request} req the request
 * @param {Response} res the response
 * @return {Response} The response with status 200, 201 or 400
 */
exports.inscriptionSaveTemporary = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }

  const validation = preValidate(req.body);

  if (validation.error != null) {
    console.log(validation);
    return res.status(400).json(
        validation,
    );
  }

  console.log(`Request temporary create for parent ${validation.value.firstNameParent} ${validation.value.lastNameParent}`);

  docId = await performInsert(validation.value);

  const doc = await db.collection('inscription_temporary')
    .doc(docId).get();
  return res.status(201)
    .json(
      {...tools.stripTechnicalFields(doc.data()),
        id: docId,
      }
    );
};


/**
 * REST: update a temporary inscription
 * @param {Request} req the request
 * @param {Response} res the response
 * @return {Response} The response with status 200, 201 or 400
 */
 exports.inscriptionUpdateTemporary = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }

  const validation = preValidate(req.body);

  if (validation.error != null) {
    console.log(validation);
    return res.status(400).json(
        validation,
    );
  }

  let docId = req.body.id;
  console.log(`Request temporary update with id ${docId} for parent ${validation.value.firstNameParent} ${validation.value.lastNameParent}`);
  if (docId == null) {
    return res.status(400).json({
      message: 'id is a mandatory property for update',
    });
  }

  await performUpdate(docId, validation.value);

  const doc = await db.collection('inscription_temporary')
    .doc(docId).get();
  return res.status(200)
    .json(
      {...tools.stripTechnicalFields(doc.data()),
        id: docId,
      }
    );
};

/**
 * REST: retrieve a temporarily saved student
 * @param {Request} req the request
 * @param {Response} res the response
 * @return {Response} The response with the student as body (200), a 404 (not found) or 400 (id param missing)
 */
exports.inscriptionSaveGetTempInscription = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }

  const docId = req.query.id;
  if (docId == null) {
    return res.status(400).json({
      message: 'id is a mandatory parameter',
    });
  }

  const doc = await db.collection('inscription_temporary')
      .doc(docId).get();
  if (doc.exists) {
    return res.json(tools.stripTechnicalFields(doc.data()));
  } else {
    return res.status(404).json({
      message: `Document with ${docId} not found`,
      data: doc,
    });
  }
};

/**
 * Insert a new record in the table 'inscription_temporary'.
 * Returns the document ID
 * @param {*} data the request body (student data)
 */
async function performInsert(data) {
  const writeResult = await db
      .collection('inscription_temporary')
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
      .collection('inscription_temporary')
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
function preValidate(data) {
  const joi = tools.saferJoi;
  const schema = joi.object({
    id: joi.string().optional().trim().allow(''),
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
