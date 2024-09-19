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

let parsedData = {
    activity: [],
    address: [],
    branch: [],
    code: [],
    contact: [],
    denomination: [],
    enterprise: [],
    establishment: [],
};

let finalData = [];

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

const setParsedData = (type, data) => {
    if (parsedData[type]) {
        parsedData[type] = data;
    } else {
        throw new Error(`Invalid file type: ${type}`);
    }
};

const getParsedData = (type) => {
    if (parsedData[type]) {
        return parsedData[type];
    } else {
        throw new Error(`Invalid file type: ${type}`);
    }
};

const getAllParsedData = () => {
    return parsedData;
};

const setFinalData = (data) => {
    finalData = data;
};

const getFinalData = () => {
    return finalData;
};

module.exports = { 
    setInMemoryData, 
    getInMemoryData, 
    getAllInMemoryData, 
    setFinalData, 
    getFinalData, 
    setParsedData, 
    getParsedData, 
    getAllParsedData 
};
