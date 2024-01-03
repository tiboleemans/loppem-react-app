const {db} = require("../db");
const tools = require("../tools");
exports.claimDiscount = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }

  const docId = await performInsert(req.body);
  return res.status(201).json(await getAndTransformRegistration(docId));

}

async function performInsert(data) {
  const writeResult = await db
    .collection('bring_friend')
    .add({
      ...data,
      insertTimestamp: new Date(),
      campYear: tools.campYear(),
    });
  console.info(`Added document with id ${writeResult.id}`);
  return writeResult.id;
}

async function getAndTransformRegistration(docId) {
  const doc = await db.collection('bring_friend')
    .doc(docId).get();
  if (!doc.exists) {
    return null;
  }
  return {
    ...tools.stripTechnicalFields(doc.data()),
    id: docId,
  }
}