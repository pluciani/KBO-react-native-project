let inMemoryData = [];

const setInMemoryData = (data) => {
    inMemoryData = data;
};

const getInMemoryData = () => {
    return inMemoryData;
};

module.exports = { setInMemoryData, getInMemoryData };