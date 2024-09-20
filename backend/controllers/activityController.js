const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseActivity = async () => {
    const data = await getInMemoryData("activity");

    const manipulatedData = data.map(item => {
        
        item.ActivityGroup = getCode("ActivityGroup", item.ActivityGroup);
        item.Nace = getCode("Nace" + item.NaceVersion, item.NaceCode);
        delete item.NaceCode;
        item.Classification = getCode("Classification", item.Classification);

        return item;
    })

    await setParsedData("activity", manipulatedData);
}

const getActivities = (entityNumber) => {
    const activities = getParsedData("activity");

    return activities.filter(act => act.EntityNumber === entityNumber);
}

module.exports = { parseActivity, getActivities };