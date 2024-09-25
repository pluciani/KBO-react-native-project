const { parseDate } = require('../dateParser');
// const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
const { getCode } = require('./codeController');
const parsedAddressModel = require('../models/parsedAddressModel');
const tmpAddressModel = require('../models/tmpAddressModel');
// const parsedCodeModel = require('../models/parsedCodeModel');

const parseAddress = async () => {
    console.log("Parsing address data");
    console.time("Parsing address data");
    // const data = await getInMemoryData("address");
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
            // const typeOfAddress = await parsedCodeModel.findOne({ Category: "TypeOfAddress", Code: item.TypeOfAddress });
            // console.log("typeOfAddress.Code", typeOfAddress.Code);
            // delete item.TypeOfAddress;
            parsedItem.TypeOfAddress = typeOfAddress;
            // console.log("parsedItem.TypeOfAddress.Code", parsedItem.TypeOfAddress.Code);

            parsedItem.DateStrikingOff = item.DateStrikingOff ? parseDate(item.DateStrikingOff) : null;

            return parsedItem;
        }));
        // console.log("manipulatedData[0]", manipulatedData[0]);

        // Insérer les données manipulées dans la collection cible
        await parsedAddressModel.insertMany(manipulatedData);

        skip += BATCH_SIZE;
    }

    console.timeEnd("Parsing address data");

    // await setParsedData("address", manipulatedData);
}

const getAdress = async (entityNumber) => {
    // const addresses = await getParsedData("address");

    // return addresses.find(adr => adr.EntityNumber === entityNumber);
    return parsedAddressModel.findOne({ EntityNumber: entityNumber });
}

module.exports = { parseAddress, getAdress };