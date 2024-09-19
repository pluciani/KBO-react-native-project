const { setParsedData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseContact = (data) => {

    const manipulatedData = data.map(item => {
        
        item.EntityContact = getCode("EntityContact", item.EntityContact);
        item.ContactType = getCode("ContactType", item.ContactType);

        return item;
    })

    setParsedData("contact", manipulatedData);
}

module.exports = { parseContact };