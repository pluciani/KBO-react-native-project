const { setParsedData, getInMemoryData } = require('../memoryCache');
const { getCode } = require('./codeController');
const { getActivities } = require('./activityController');
const { getAdress } = require('./addressController');
const { getContacts } = require('./contactController');
const { getDenominations } = require('./denominationController');
const { getBranches } = require('./branchController');
const { getEstablishments } = require('./establishmentController');
const { parseDate } = require('../dateParser');

const parseEnterprise = async () => {
    const data = await getInMemoryData("enterprise");

    const manipulatedData = data.map(item => {

        item.Status = getCode("Status", item.Status);
        item.JuridicalSituation = getCode("JuridicalSituation", item.JuridicalSituation);
        item.TypeOfEnterprise = getCode("TypeOfEnterprise", item.TypeOfEnterprise);
        item.JuridicalForm = getCode("JuridicalForm", item.JuridicalForm);
        item.StartDate = parseDate(item.StartDate);
        item.Address = getAdress(item.EnterpriseNumber);
        item.Activities = getActivities(item.EnterpriseNumber);
        item.Contacts = getContacts(item.EnterpriseNumber);
        item.Denomination = getDenominations(item.EnterpriseNumber);
        item.Establishments = getEstablishments(item.EnterpriseNumber);
        item.Branches = getBranches(item.EnterpriseNumber);

        return item;
    })

    await setParsedData("enterprise", manipulatedData);
}

module.exports = { parseEnterprise };