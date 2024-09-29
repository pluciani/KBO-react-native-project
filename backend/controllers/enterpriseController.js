const { parseDate } = require('../dateParser');
const tmpEnterpriseModel = require('../models/tmpEnterpriseModel');
const EnterpriseModel = require('../models/enterpriseModel');

const parseEnterprise = async () => {
    console.log(new Date() + " : Parsing enterprise data...");
    console.time("Parsing enterprise data");
    const BATCH_SIZE = 100; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await EnterpriseModel.deleteMany({});

    while (hasMoreDocuments) {

        // Utiliser un pipeline d'agrégation pour récupérer et manipuler les données
        const data = await tmpEnterpriseModel.aggregate([
            { $skip: skip },
            { $limit: BATCH_SIZE },
            {
                $lookup: {
                    from: 'parsedcodes',
                    let: { code: '$Status' },
                    pipeline: [
                        {
                            $match: {
                                Category: 'Status',
                                $expr: { $eq: ['$Code', '$$code'] }
                            }
                        }
                    ],
                    as: 'StatusDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcodes',
                    let: { code: '$JuridicalSituation' },
                    pipeline: [
                        {
                            $match: {
                                Category: 'JuridicalSituation',
                                $expr: { $eq: ['$Code', '$$code'] }
                            }
                        }
                    ],
                    as: 'JuridicalSituationDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcodes',
                    let: { code: '$TypeOfEnterprise' },
                    pipeline: [
                        {
                            $match: {
                                Category: 'TypeOfEnterprise',
                                $expr: { $eq: ['$Code', '$$code'] }
                            }
                        }
                    ],
                    as: 'TypeOfEnterpriseDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcodes',
                    let: { code: '$JuridicalForm' },
                    pipeline: [
                        {
                            $match: {
                                Category: 'JuridicalForm',
                                $expr: { $eq: ['$Code', '$$code'] }
                            }
                        }
                    ],
                    as: 'JuridicalFormDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedaddresses',
                    localField: 'EnterpriseNumber',
                    foreignField: 'EntityNumber',
                    as: 'AddressDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedenterpriseactivities',
                    localField: 'EnterpriseNumber',
                    foreignField: 'EntityNumber',
                    as: 'ActivitiesDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcontacts',
                    localField: 'EnterpriseNumber',
                    foreignField: 'EntityNumber',
                    as: 'ContactsDetails'
                }
            },
            {
                $lookup: {
                    from: 'parseddenominations',
                    localField: 'EnterpriseNumber',
                    foreignField: 'EntityNumber',
                    as: 'DenominationDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedestablishments',
                    localField: 'EnterpriseNumber',
                    foreignField: 'EnterpriseNumber',
                    as: 'EstablishmentsDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedbranches',
                    localField: 'EnterpriseNumber',
                    foreignField: 'EnterpriseNumber',
                    as: 'BranchesDetails'
                }
            },
            {
                $project: {
                    EnterpriseNumber: 1,
                    JuridicalFormCAC: 1,
                    Status: { $arrayElemAt: ['$StatusDetails', 0] },
                    JuridicalSituation: { $arrayElemAt: ['$JuridicalSituationDetails', 0] },
                    TypeOfEnterprise: { $arrayElemAt: ['$TypeOfEnterpriseDetails', 0] },
                    JuridicalForm: { $arrayElemAt: ['$JuridicalFormDetails', 0] },
                    StartDate: 1,
                    Address: { $arrayElemAt: ['$AddressDetails', 0] },
                    Activities: '$ActivitiesDetails',
                    Contacts: '$ContactsDetails',
                    Denomination: '$DenominationDetails',
                    Establishments: '$EstablishmentsDetails',
                    Branches: '$BranchesDetails'
                }
            }
        ])

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        const manipulatedData = data.map(item => {
            return {
                EnterpriseNumber: item.EnterpriseNumber,
                JuridicalFormCAC: item.JuridicalFormCAC,
                Status: item.Status,
                JuridicalSituation: item.JuridicalSituation,
                TypeOfEnterprise: item.TypeOfEnterprise,
                JuridicalForm: item.JuridicalForm,
                StartDate: parseDate(item.StartDate),
                Address: item.Address,
                Activities: item.Activities,
                Contacts: item.Contacts,
                Denomination: item.Denomination,
                Establishments: item.Establishments,
                Branches: item.Branches
            };
        });

        // Insérer les données manipulées dans la collection cible
        await EnterpriseModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing enterprise data");
    console.log(new Date() + " : Enterprise data parsing completed.");

}

module.exports = { parseEnterprise };