const { setParsedData } = require('../memoryCache');

const parseBranch = (data) => {

    const manipulatedData = data.map(item => {
        
        item.StartDate = new Date(item.StartDate);

        return item;
    })

    setParsedData("branch", manipulatedData);
}

module.exports = { parseBranch };