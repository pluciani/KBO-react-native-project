const { getCode } = require('./codeController');
const parsedContactModel = require('../models/parsedContactModel');
const tmpContactModel = require('../models/tmpContactModel');

const parseContact = async () => {
    console.log("Parsing contact data");
    console.time("Parsing contact data");
    const BATCH_SIZE = 10000; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await parsedContactModel.deleteMany({});

    while (hasMoreDocuments) {
        // Récupérer un lot de documents de la collection source
        const data = await tmpContactModel.find().skip(skip).limit(BATCH_SIZE);

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        const manipulatedData = await Promise.all(data.map(async (item) => {
            const parsedItem = {
                EntityNumber: item.EntityNumber,
                Value: item.Value,
            }
            
            parsedItem.EntityContact = await getCode("EntityContact", item.EntityContact);
            parsedItem.ContactType = await getCode("ContactType", item.ContactType);

            return parsedItem;
        }))

        // Insérer les données manipulées dans la collection cible
        await parsedContactModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing contact data");

}

module.exports = { parseContact };