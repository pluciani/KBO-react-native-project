const { setParsedData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseAddress = (data) => {

    const manipulatedData = data.map(item => {
        
        item.TypeOfAddress = getCode("TypeOfAddress", item.TypeOfAddress);
        item.DateStrikingOff = item.DateStrikingOff ? new Date(item.DateStrikingOff) : null;

        return item;
    })

    setParsedData("address", manipulatedData);
}

module.exports = { parseAddress };