const { parseDate } = require('../dateParser');
const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
const { getActivities } = require('./activityController');
const { getAdress } = require('./addressController');
const { getContacts } = require('./contactController');
const { getDenominations } = require('./denominationController');

const parseEstablishment = async () => {
    const data = await getInMemoryData("establishment");

    const manipulatedData = data.map(item => {
        
        item.StartDate = parseDate(item.StartDate);
        item.Address = getAdress(item.EstablishmentNumber);
        item.Activities = getActivities(item.EstablishmentNumber);
        item.Contacts = getContacts(item.EstablishmentNumber);
        item.Denomination = getDenominations(item.EstablishmentNumber);

        return item;
    })

    await setParsedData("establishment", manipulatedData);
}

const getEstablishments = (enterpriseNumber) => {
    const establishments = getParsedData("establishment");

    return establishments.filter(est => est.EnterpriseNumber === enterpriseNumber);
}

module.exports = { parseEstablishment, getEstablishments };