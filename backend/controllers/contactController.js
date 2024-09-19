const { setParsedData, getParsedData } = require('../memoryCache');

const parseContact = (data) => {

    const manipulatedData = data.map(item => {
        


    })

    setParsedData("contact", manipulatedData);
}

module.exports = { parseContact };