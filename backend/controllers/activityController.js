const { setParsedData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseActivity = (data) => {

    const manipulatedData = data.map(item => {
        
        item.ActivityGroup = getCode("ActivityGroup", item.ActivityGroup);
        item.Nace = getCode("Nace" + item.NaceVersion, item.NaceCode);
        delete item.NaceCode;
        item.Classification = getCode("Classification", item.Classification);

        return item;
    })

    setParsedData("activity", manipulatedData);
}

module.exports = { parseActivity };