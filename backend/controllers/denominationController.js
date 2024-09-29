const { getCode } = require('./codeController');
const tmpDenominationModel = require('../models/tmpDenominationModel');
const parsedDenominationModel = require('../models/parsedDenominationModel');

const parseDenomination = async () => {
    console.log("Parsing denomination data");
    console.time("Parsing denomination data");
    const BATCH_SIZE = 10000; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await parsedDenominationModel.deleteMany({});

    while (hasMoreDocuments) {
        // Récupérer un lot de documents de la collection source
        const data = await tmpDenominationModel.find().skip(skip).limit(BATCH_SIZE);

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        const manipulatedData = await Promise.all(data.map(async (item) => {
            const parsedItem = {
                EntityNumber: item.EntityNumber,
                Denomination: item.Denomination,
            }
            
            parsedItem.Language = await getCode("Language", item.Language);
            parsedItem.TypeOfDenomination = await getCode("TypeOfDenomination", item.TypeOfDenomination);

            return parsedItem;
        }))

        // Insérer les données manipulées dans la collection cible
        await parsedDenominationModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing denomination data");

}

module.exports = { parseDenomination };