const { parseDate } = require('../dateParser');
const tmpBranchModel = require('../models/tmpBranchModel');
const parsedBranchModel = require('../models/parsedBranchModel');

const parseBranch = async () => {
    console.log(new Date() + " : Parsing branch data...");
    console.time("Parsing branch data");
    const BATCH_SIZE = 100; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await parsedBranchModel.deleteMany({});

    while (hasMoreDocuments) {

        // Utiliser un pipeline d'agrégation pour récupérer et manipuler les données
        const data = await tmpBranchModel.aggregate([
            { $skip: skip },
            { $limit: BATCH_SIZE },
            {
                $lookup: {
                    from: 'parsedaddresses',
                    localField: 'Id',
                    foreignField: 'EntityNumber',
                    as: 'AddressDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedbranchactivities',
                    localField: 'Id',
                    foreignField: 'EntityNumber',
                    as: 'ActivitiesDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcontacts',
                    localField: 'Id',
                    foreignField: 'EntityNumber',
                    as: 'ContactsDetails'
                }
            },
            {
                $lookup: {
                    from: 'parseddenominations',
                    localField: 'Id',
                    foreignField: 'EntityNumber',
                    as: 'DenominationDetails'
                }
            },
            {
                $project: {
                    Id: 1,
                    StartDate: 1,
                    Address: { $arrayElemAt: ["$AddressDetails", 0] },
                    Activities: "$ActivitiesDetails",
                    Contacts: "$ContactsDetails",
                    Denomination: "$DenominationDetails"
                }
            }
        ])

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        const manipulatedData = data.map(item => {
            return {
                Id: item.Id,
                StartDate: parseDate(item.StartDate),
                Address: item.Address,
                Activities: item.Activities,
                Contacts: item.Contacts,
                Denomination: item.Denomination
            };
        })

        // Insérer les données manipulées dans la collection cible
        await parsedBranchModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing branch data");
    console.log(new Date() + " : Parsing branch data completed.");

}

module.exports = { parseBranch, /* getBranches */ };