// const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
// const { getCode } = require('./codeController');
const tmpActivityModel = require('../models/tmpActivityModel');
// const parsedActivityModel = require('../models/parsedActivityModel');
const parsedEnterpriseActivityModel = require('../models/parsedEnterpriseActivityModel');
const parsedEstablishmentActivityModel = require('../models/parsedEstablishmentActivityModel');
const parsedBranchActivityModel = require('../models/parsedBranchActivityModel');

const parseActivity = async () => {
    console.log("Parsing activity data");
    console.time("Parsing activity data");
    // const data = await getInMemoryData("activity");
    const BATCH_SIZE = 1000; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    // Supprimer les documents existants dans les collections cibles
    // await parsedActivityModel.deleteMany({});
    await parsedEnterpriseActivityModel.deleteMany({});
    await parsedEstablishmentActivityModel.deleteMany({});
    await parsedBranchActivityModel.deleteMany({});

    while (hasMoreDocuments) {
        // Récupérer un lot de documents de la collection source
        // const data = await tmpActivityModel.find().skip(skip).limit(BATCH_SIZE);

        // Utiliser un pipeline d'agrégation pour récupérer et manipuler les données
        const data = await tmpActivityModel.aggregate([
            { $skip: skip },
            { $limit: BATCH_SIZE },
            {
                $lookup: {
                    from: 'parsedcodes',
                    let: { code: '$ActivityGroup' },
                    pipeline: [
                        {
                            $match: {
                                Category: 'ActivityGroup',
                                $expr: { $eq: ['$Code', '$$code'] }
                            }
                        }
                    ],
                    as: 'ActivityGroupDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcodes',
                    let: { naceCode: '$NaceCode', naceVersion: '$NaceVersion' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $and: [
                                    { $eq: ['$Code', '$$naceCode'] },
                                    { $eq: ['$Category', { $concat: ['Nace', '$$naceVersion'] }] }
                                ]}
                            }
                        }
                    ],
                    as: 'NaceDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcodes',
                    let: { code: '$Classification' },
                    pipeline: [
                        {
                            $match: {
                                Category: 'Classification',
                                $expr: { $eq: ['$Code', '$$code'] }
                            }
                        }
                    ],
                    as: 'ClassificationDetails'
                }
            },
            {
                $project: {
                    EntityNumber: 1,
                    NaceVersion: 1,
                    ActivityGroup: { $arrayElemAt: ['$ActivityGroupDetails', 0] },
                    Nace: { $arrayElemAt: ['$NaceDetails', 0] },
                    Classification: { $arrayElemAt: ['$ClassificationDetails', 0] }
                }
            }
        ]);

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        let activitiesEnterprise = [];
        let activitiesEstablishment = [];
        let activitiesBranch = [];

        data.forEach(item => {
            const parsedItem = {
                EntityNumber: item.EntityNumber,
                NaceVersion: item.NaceVersion,
                ActivityGroup: item.ActivityGroup,
                Nace: item.Nace,
                Classification: item.Classification
            };
            
            // parsedItem.ActivityGroup = await getCode("ActivityGroup", item.ActivityGroup);
            // parsedItem.Nace = await getCode("Nace" + item.NaceVersion, item.NaceCode);
            // // delete item.NaceCode;
            // parsedItem.Classification = await getCode("Classification", item.Classification);

            // return parsedItem;
            switch (item.EntityNumber[0]) {
                case "0": // Enterprise
                    activitiesEnterprise.push(parsedItem);
                    break;
                case "2": // Establishment
                    activitiesEstablishment.push(parsedItem);
                    break;
                case "9": // Branch
                    activitiesBranch.push(parsedItem);
                    break;
                default:
                    throw new Error("Unknown entity number: " + item.EntityNumber);
            }
        });

        // Insérer les données manipulées dans la collection cible
        // await parsedActivityModel.insertMany(manipulatedData);
        await parsedEnterpriseActivityModel.insertMany(activitiesEnterprise);
        await parsedEstablishmentActivityModel.insertMany(activitiesEstablishment);
        await parsedBranchActivityModel.insertMany(activitiesBranch);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing activity data");

    // await setParsedData("activity", manipulatedData);
}

// const getActivities = async (entityNumber) => {
//     // const activities = await getParsedData("activity");

//     // return activities.filter(act => act.EntityNumber === entityNumber);
//     return parsedActivityModel.find({ EntityNumber: entityNumber });
// }

module.exports = { parseActivity };