// const { setParsedData, getInMemoryData } = require('../memoryCache');
// const { getCode } = require('./codeController');
// const { getActivities } = require('./activityController');
// const { getAdress } = require('./addressController');
// const { getContacts } = require('./contactController');
// const { getDenominations } = require('./denominationController');
// const { getBranches } = require('./branchController');
// const { getEstablishments } = require('./establishmentController');
const { parseDate } = require('../dateParser');
const tmpEnterpriseModel = require('../models/tmpEnterpriseModel');
const EnterpriseModel = require('../models/enterpriseModel');

const parseEnterprise = async () => {
    console.log("Parsing enterprise data...");
    console.time("Parsing enterprise data");
    // const data = await getInMemoryData("enterprise");
    const BATCH_SIZE = 10000; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await EnterpriseModel.deleteMany({});

    while (hasMoreDocuments) {
        // Récupérer un lot de documents de la collection source
        // const data = await tmpEnterpriseModel.find().skip(skip).limit(BATCH_SIZE);

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
            // const parsedItem = {
            //     EnterpriseNumber: item.EnterpriseNumber,
            //     JuridicalFormCAC: item.JuridicalFormCAC,
            // }

            // parsedItem.Status = await getCode("Status", item.Status);
            // parsedItem.JuridicalSituation = await getCode("JuridicalSituation", item.JuridicalSituation);
            // parsedItem.TypeOfEnterprise = await getCode("TypeOfEnterprise", item.TypeOfEnterprise);
            // parsedItem.JuridicalForm = await getCode("JuridicalForm", item.JuridicalForm);
            // parsedItem.StartDate = parseDate(item.StartDate);
            // parsedItem.Address = await getAdress(item.EnterpriseNumber);
            // parsedItem.Activities = await getActivities(item.EnterpriseNumber);
            // parsedItem.Contacts = await getContacts(item.EnterpriseNumber);
            // parsedItem.Denomination = await getDenominations(item.EnterpriseNumber);
            // parsedItem.Establishments = await getEstablishments(item.EnterpriseNumber);
            // parsedItem.Branches = await getBranches(item.EnterpriseNumber);

            // return parsedItem;
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

    // await setParsedData("enterprise", manipulatedData);
}

module.exports = { parseEnterprise };