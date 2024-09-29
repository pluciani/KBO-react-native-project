const tmpActivityModel = require('./models/tmpActivityModel');
const tmpAddressModel = require('./models/tmpAddressModel');
const tmpBranchModel = require('./models/tmpBranchModel');
const tmpCodeModel = require('./models/tmpCodeModel');
const tmpContactModel = require('./models/tmpContactModel');
const tmpDenominationModel = require('./models/tmpDenominationModel');
const tmpEnterpriseModel = require('./models/tmpEnterpriseModel');
const tmpEstablishmentModel = require('./models/tmpEstablishmentModel');

const CHUNK_SIZE = 10000; // Nombre d'éléments par morceau

const setInMemoryData = async (fileType, data) => {

    let model;

    switch (fileType) {
        case "activity":
            model = tmpActivityModel;
            break;
        case "address":
            model = tmpAddressModel;
            break;
        case "branch":
            model = tmpBranchModel;
            break;
        case "code":
            model = tmpCodeModel;
            break;
        case "contact":
            model = tmpContactModel;
            break;
        case "denomination":
            model = tmpDenominationModel;
            break;
        case "enterprise":
            model = tmpEnterpriseModel;
            break;
        case "establishment":
            model = tmpEstablishmentModel;
            break;
    }

    await model.deleteMany();

    // Divisez les données en morceaux et insérez chaque morceau dans la collection temporaire
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        await model.insertMany(chunk, { ordered: false });
    }
};

module.exports = { 
    setInMemoryData, 
};
