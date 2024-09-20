const { setParsedData, getParsedData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseDenomination = (data) => {

    const manipulatedData = data.map(item => {
        
        item.Language = getCode("Language", item.Language);
        item.TypeOfDenomination = getCode("TypeOfDenomination", item.TypeOfDenomination);

        return item;
    })

    setParsedData("denomination", manipulatedData);
}

const getDenominations = (entityNumber) => {
    const denominations = getParsedData("denomination");

    return denominations.filter(d => d.EntityNumber === entityNumber);
}

module.exports = { parseDenomination, getDenominations };