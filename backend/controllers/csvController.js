const fs = require('fs');
const { parse } = require('csv-parse');

const getCsv = (req, res) => {
  const filePath = "C:/Users/joseph/Documents/cours/master/KBO-react-native-project/backend/data/branche_echantillon.csv";

  // Stream le fichier CSV et parser son contenu
  const parser = parse({ delimiter: ',' }, (err, data) => {
    if (err) {
      console.error("Error parsing CSV:", err);
      return res.status(500).json({ message: 'Error parsing CSV data' });
    }

    console.log(data);  // Affiche les données CSV dans la console
    return res.status(200).json({ csvData: data });  // Retourne les données en réponse JSON
  });

  // Lire le fichier et pipe les données vers le parser
  fs.createReadStream(filePath).pipe(parser);
};

module.exports = { getCsv };
