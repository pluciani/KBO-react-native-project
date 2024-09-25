// const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
const tmpCodeModel = require('../models/tmpCodeModel');
const parsedCodeModel = require('../models/parsedCodeModel');

const parseCode = async () => {
    console.log("Parsing code data");
    console.time("Parsing code data");
    // const data = await getInMemoryData("code");
    const BATCH_SIZE = 10000; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await parsedCodeModel.deleteMany({});

    while (hasMoreDocuments) {
        // Récupérer un lot de documents de la collection source
        const data = await tmpCodeModel.find().skip(skip).limit(BATCH_SIZE);

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        // Parser les documents
        const manipulatedData = data.reduce( (acc, item) => {
            // Trouver un objet existant avec la même Category et Code
            let existingItem = acc.find(i => i.Category === item.Category && i.Code === item.Code);

            if (existingItem) {
                // Ajouter la traduction à l'objet existant
                existingItem.Translations.push({
                    Language: item.Language,
                    Description: item.Description
                });
            } else {
                // Créer un nouvel objet avec Category, Code et Translations
                acc.push({
                    Category: item.Category,
                    Code: item.Code,
                    Translations: [{
                        Language: item.Language,
                        Description: item.Description
                    }]
                });
            }

            return acc;
        }, []);

        // Insérer les données manipulées dans la collection cible
        await parsedCodeModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing code data");

    // await setParsedData("code", manipulatedData);
}

const getCode = async (category, code) => {
    // const codes = await getParsedData("code");

    // return codes.find(c => c.Category === category && c.Code === code);
    return await parsedCodeModel.findOne({
        Category: category,
        Code: code
    });
}

module.exports = { parseCode, getCode };