const { setParsedData, getParsedData, getInMemoryData } = require('../memoryCache');

const parseCode = async () => {
    const data = await getInMemoryData("code");

    const manipulatedData = data.reduce((acc, item) => {
        // Trouver un objet existant avec la même Category et Code
        let existingItem = acc.find(i => i.Category === item.Category && i.Code === item.Code);

        if (existingItem) {
            // Ajouter la traduction à l'objet existant
            existingItem.Translations.push({
                Language: item.Language,
                Description: item.Description
            });
        } else {
            // Créer un nouvel objet avec Category, Code et Translations
            acc.push({
                Category: item.Category,
                Code: item.Code,
                Translations: [{
                    Language: item.Language,
                    Description: item.Description
                }]
            });
        }

        return acc;
    }, []);

    await setParsedData("code", manipulatedData);
}

const getCode = (category, code) => {
    const codes = getParsedData("code");

    return codes.find(c => c.Category === category && c.Code === code);
}

module.exports = { parseCode, getCode };