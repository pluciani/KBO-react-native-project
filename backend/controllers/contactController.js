const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseContact = async () => {
    const data = await getInMemoryData("contact");

    const manipulatedData = data.map(item => {
        
        item.EntityContact = getCode("EntityContact", item.EntityContact);
        item.ContactType = getCode("ContactType", item.ContactType);

        return item;
    })

    await setParsedData("contact", manipulatedData);
}

const getContacts = (entityNumber) => {
    const contacts = getParsedData("contact");

    return contacts.filter(c => c.EntityNumber === entityNumber);
}

module.exports = { parseContact, getContacts };