const { setParsedData } = require('../memoryCache');

const parseEstablishment = (data) => {

    const manipulatedData = data.map(item => {
        
        item.StartDate = new Date(item.StartDate);

        return item;
    })

    setParsedData("establishment", manipulatedData);
}

module.exports = { parseEstablishment };