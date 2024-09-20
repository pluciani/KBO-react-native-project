const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

// Créez le répertoire de données s'il n'existe pas
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const CHUNK_SIZE = 1000000; // Nombre d'éléments par morceau

const setInMemoryData = async (fileType, data) => {
    const filePath = path.join(dataDir, `${fileType}`);
    // Supprimez les anciens fichiers de morceaux
    fs.readdirSync(dataDir).forEach(file => {
        if (file.startsWith(fileType)) {
            fs.unlinkSync(path.join(dataDir, file));
        }
    });

    // Divisez les données en morceaux et écrivez chaque morceau dans un fichier séparé
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        fs.writeFileSync(`${filePath}_chunk_${i / CHUNK_SIZE}.json`, JSON.stringify(chunk));
    }
};

const getInMemoryData = async (fileType) => {
    const filePath = path.join(dataDir, `${fileType}`);
    const data = [];

    let i = 0;
    // Lire tous les fichiers de morceaux et les concaténer
    fs.readdirSync(dataDir).forEach(file => {
        console.log(i++);
        if (file.startsWith(fileType)) {
            console.log(fileType);
            // console.trace();
            const chunk = fs.readFileSync(path.join(dataDir, file), 'utf8');
            console.log(chunk[0]);
            /* TODO: Fix maximum call size error */
            data.push(...JSON.parse(chunk));
        }
    });

    return data;
};

const setParsedData = async (fileType, data) => {
    await setInMemoryData(`p_${fileType}`, data);
}

const getParsedData = async (fileType) => {
    return getInMemoryData(`p_${fileType}`);
}


module.exports = { 
    setInMemoryData, 
    getInMemoryData, 
    setParsedData,
    getParsedData
};
