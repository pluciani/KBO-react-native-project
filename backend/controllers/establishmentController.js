const { parseDate } = require('../dateParser');
const tmpEstablishmentModel = require('../models/tmpEstablishmentModel');
const parsedEstablishmentModel = require('../models/parsedEstablishmentModel');

const parseEstablishment = async () => {
    console.log(new Date() + " : Parsing establishment data...");
    console.time("Parsing establishment data");
    const BATCH_SIZE = 100; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await parsedEstablishmentModel.deleteMany({});

    while (hasMoreDocuments) {
        // Utiliser un pipeline d'agrégation pour récupérer et manipuler les données
        const data = await tmpEstablishmentModel.aggregate([
            { $skip: skip },
            { $limit: BATCH_SIZE },
            {
                $lookup: {
                    from: 'parsedaddresses',
                    localField: 'EstablishmentNumber',
                    foreignField: 'EntityNumber',
                    as: 'AddressDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedestablishmentactivities',
                    localField: 'EstablishmentNumber',
                    foreignField: 'EntityNumber',
                    as: 'ActivitiesDetails'
                }
            },
            {
                $lookup: {
                    from: 'parsedcontacts',
                    localField: 'EstablishmentNumber',
                    foreignField: 'EntityNumber',
                    as: 'ContactsDetails'
                }
            },
            {
                $lookup: {
                    from: 'parseddenominations',
                    localField: 'EstablishmentNumber',
                    foreignField: 'EntityNumber',
                    as: 'DenominationDetails'
                }
            },
            {
                $project: {
                    EstablishmentNumber: 1,
                    EnterpriseNumber: 1,
                    StartDate: 1,
                    Address: { $arrayElemAt: ['$AddressDetails', 0] },
                    Activities: '$ActivitiesDetails',
                    Contacts: '$ContactsDetails',
                    Denomination: '$DenominationDetails',
                }
            }
        ])

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        const manipulatedData = data.map(item => {
            return {
                EstablishmentNumber: item.EstablishmentNumber,
                EnterpriseNumber: item.EnterpriseNumber,
                StartDate: parseDate(item.StartDate),
                Address: item.Address,
                Activities: item.Activities,
                Contacts: item.Contacts,
                Denomination: item.Denomination
            };
        });
        
        // Insérer les données manipulées dans la collection cible
        await parsedEstablishmentModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing establishment data");
    console.log(new Date() + " : Establishment data parsed");

}

module.exports = { parseEstablishment };