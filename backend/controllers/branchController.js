const { parseDate } = require('../dateParser');
// const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
// const { getActivities } = require('./activityController');
// const { getAdress } = require('./addressController');
// const { getContacts } = require('./contactController');
// const { getDenominations } = require('./denominationController');
const tmpBranchModel = require('../models/tmpBranchModel');
const parsedBranchModel = require('../models/parsedBranchModel');

const parseBranch = async () => {
    console.log("Parsing branch data...");
    console.time("Parsing branch data");
    // const data = await getInMemoryData("branch");
    const BATCH_SIZE = 10000; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await parsedBranchModel.deleteMany({});

    while (hasMoreDocuments) {
        // Récupérer un lot de documents de la collection source
        // const data = await tmpBranchModel.find().skip(skip).limit(BATCH_SIZE);

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
            // const parsedItem = {
            //     Id: item.Id,
            // }
            
            // parsedItem.StartDate = parseDate(item.StartDate);
            // parsedItem.Address = await getAdress(item.Id);
            // parsedItem.Activities = await getActivities(item.Id);
            // parsedItem.Contacts = await getContacts(item.Id);
            // parsedItem.Denomination = await getDenominations(item.Id);

            // return parsedItem;
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

    // await setParsedData("branch", manipulatedData);
}

// const getBranches = async (enterpriseNumber) => {
//     // const branches = await getParsedData("branch");

//     // return branches.filter(b => b.EnterpriseNumber === enterpriseNumber);
//     return parsedBranchModel.find({ EnterpriseNumber: enterpriseNumber });
// }

module.exports = { parseBranch, /* getBranches */ };