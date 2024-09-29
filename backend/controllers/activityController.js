const tmpActivityModel = require('../models/tmpActivityModel');
const parsedEnterpriseActivityModel = require('../models/parsedEnterpriseActivityModel');
const parsedEstablishmentActivityModel = require('../models/parsedEstablishmentActivityModel');
const parsedBranchActivityModel = require('../models/parsedBranchActivityModel');

const parseActivity = async () => {
    console.log(new Date() + " : Parsing activity data");
    console.time("Parsing activity data");
    const BATCH_SIZE = 1000; // Définissez la taille du lot
    let skip = 3807000;
    let hasMoreDocuments = true;

    // Supprimer les documents existants dans les collections cibles
    await parsedEnterpriseActivityModel.deleteMany({});
    await parsedEstablishmentActivityModel.deleteMany({});
    await parsedBranchActivityModel.deleteMany({});

    while (hasMoreDocuments) {

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
            
            switch (item.EntityNumber[0]) {
                case "0": // Enterprise
                case "1": // Enterprise
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
        await parsedEnterpriseActivityModel.insertMany(activitiesEnterprise);
        await parsedEstablishmentActivityModel.insertMany(activitiesEstablishment);
        await parsedBranchActivityModel.insertMany(activitiesBranch);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing activity data");
    console.log(new Date() + " : Done parsing activity data");

}

module.exports = { parseActivity };