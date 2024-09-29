const { parseDate } = require('../dateParser');
const { getCode } = require('./codeController');
const parsedAddressModel = require('../models/parsedAddressModel');
const tmpAddressModel = require('../models/tmpAddressModel');

const parseAddress = async () => {
    console.log("Parsing address data");
    console.time("Parsing address data");
    const BATCH_SIZE = 10000; // Définissez la taille du lot
    let skip = 0;
    let hasMoreDocuments = true;

    await parsedAddressModel.deleteMany({});

    while (hasMoreDocuments) {
        // Récupérer un lot de documents de la collection source
        const data = await tmpAddressModel.find().skip(skip).limit(BATCH_SIZE);

        if (data.length === 0) {
            hasMoreDocuments = false;
            break;
        }

        // Parser les documents
        const manipulatedData = await Promise.all(data.map(async (item) => {
            const parsedItem = {
                EntityNumber: item.EntityNumber,
                CountryNL: item.CountryNL,
                CountryFR: item.CountryFR,
                Zipcode: item.Zipcode,
                MunicipalityNL: item.MunicipalityNL,
                MunicipalityFR: item.MunicipalityFR,
                StreetNL: item.StreetNL,
                StreetFR: item.StreetFR,
                HouseNumber: item.HouseNumber,
                Box: item.Box,
                ExtraAddressInfo: item.ExtraAddressInfo,
            };
            const typeOfAddress = await getCode("TypeOfAddress", item.TypeOfAddress)
            parsedItem.TypeOfAddress = typeOfAddress;

            parsedItem.DateStrikingOff = item.DateStrikingOff ? parseDate(item.DateStrikingOff) : null;

            return parsedItem;
        }));

        // Insérer les données manipulées dans la collection cible
        await parsedAddressModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing address data");

}

module.exports = { parseAddress };