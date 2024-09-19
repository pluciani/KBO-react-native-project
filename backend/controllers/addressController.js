const { setParsedData, getParsedData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseAddress = (data) => {

    const manipulatedData = data.map(item => {
        
        item.TypeOfAddress = getCode("TypeOfAddress", item.TypeOfAddress);
        item.DateStrikingOff = item.DateStrikingOff ? new Date(item.DateStrikingOff) : null;

        return item;
    })

    setParsedData("address", manipulatedData);
}

const getAdress = (entityNumber) => {
    const addresses = getParsedData("address");

    return addresses.find(adr => adr.EntityNumber === entityNumber);
}

module.exports = { parseAddress, getAdress };