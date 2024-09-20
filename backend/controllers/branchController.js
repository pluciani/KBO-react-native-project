const { parseDate } = require('../dateParser');
const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');
const { getActivities } = require('./activityController');
const { getAdress } = require('./addressController');
const { getContacts } = require('./contactController');
const { getDenominations } = require('./denominationController');

const parseBranch = async () => {
    const data = await getInMemoryData("branch");

    const manipulatedData = data.map(item => {
        
        item.StartDate = parseDate(item.StartDate);
        item.Address = getAdress(item.Id);
        item.Activities = getActivities(item.Id);
        item.Contacts = getContacts(item.Id);
        item.Denomination = getDenominations(item.Id);

        return item;
    })

    await setParsedData("branch", manipulatedData);
}

const getBranches = (enterpriseNumber) => {
    const branches = getParsedData("branch");

    return branches.filter(b => b.EnterpriseNumber === enterpriseNumber);
}

module.exports = { parseBranch, getBranches };