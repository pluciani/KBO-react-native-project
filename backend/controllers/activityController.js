const { setParsedData, getParsedData } = require('../memoryCache');

const parseActivity = (data) => {

    const manipulatedData = data.map(item => {
        


    })

    setParsedData("activity", manipulatedData);
}

module.exports = { parseActivity };