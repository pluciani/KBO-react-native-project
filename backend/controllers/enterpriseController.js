const { setParsedData, getParsedData } = require('../memoryCache');

const parseEnterprise = (data) => {
    
    const manipulatedData = data.map(item => {
        item.StartDate = new Date(item.StartDate);
        return item;
    })

    setParsedData("enterprise", manipulatedData);
}

module.exports = { parseEnterprise };