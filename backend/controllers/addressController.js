const { setParsedData, getParsedData } = require('../memoryCache');

const parseAddress = (data) => {

    const manipulatedData = data.map(item => {
        


    })

    setParsedData("address", manipulatedData);
}

module.exports = { parseAddress };