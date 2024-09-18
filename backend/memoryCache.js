let inMemoryData = {
    activity: [],
    address: [],
    branch: [],
    code: [],
    contact: [],
    denomination: [],
    enterprise: [],
    establishment: [],
};

const setInMemoryData = (type, data) => {
    if (inMemoryData[type]) {
        inMemoryData[type] = data;
    } else {
        throw new Error(`Invalid file type: ${type}`);
    }
};

const getInMemoryData = (type) => {
    if (inMemoryData[type]) {
        return inMemoryData[type];
    } else {
        throw new Error(`Invalid file type: ${type}`);
    }
};

const getAllInMemoryData = () => {
    return inMemoryData;
};

module.exports = { setInMemoryData, getInMemoryData, getAllInMemoryData };