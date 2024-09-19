const { setParsedData } = require('../memoryCache');
const { getCode } = require('./codeController');

const parseEnterprise = (data) => {

    const manipulatedData = data.map(item => {

        item.Status = getCode("Status", item.Status);
        item.JuridicalSituation = getCode("JuridicalSituation", item.JuridicalSituation);
        item.TypeOfEnterprise = getCode("TypeOfEnterprise", item.TypeOfEnterprise);
        item.JuridicalForm = getCode("JuridicalForm", item.JuridicalForm);
        item.StartDate = new Date(item.StartDate);

        return item;
    })

    setParsedData("enterprise", manipulatedData);
}

module.exports = { parseEnterprise };