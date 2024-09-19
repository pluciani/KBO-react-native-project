const express = require('express');
const router = express.Router();
const axios = require('axios'); // Use axios to fetch the HTML
const cheerio = require('cheerio'); // Parse HTML with cheerio

// Define a POST route for searching an enterprise
router.post('/', async (req, res) => {
  const { cat, value } = req.body;

  if (!cat || !value) {
    return res.status(400).json({ error: 'Il manque des informations' });
  }

  try {
    // Fetch the HTML content of the page
    const { data } = await axios.get('https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer=' + value);

    // Load the HTML into cheerio for parsing
    const $ = cheerio.load(data);

    // Remove the elements
    // const base = $('span').remove();
    
    // Extract the necessary data
    const phoneNumber = $('td:contains("Numéro de téléphone:")').next().text().trim(); 
    const fax = $('td:contains("Numéro de fax:")').next().text().trim(); 
    const typeEntite = $('td:contains("Type d\'entité:")').next().text().trim(); 
    const legaleForme = $('td:contains("Forme légale:")').next().text().trim(); 
    const numberEtablissment = $('td:contains("Nombre d\'unités d\'établissement:")').next().text().trim(); 

    // Simulate some processing logic (e.g., searching the enterprise in a database)
    const result = {
      cat,
      value,
      scraper: {
        phoneNumber: phoneNumber,
        fax: fax,
        typeEntite: typeEntite,
        legaleForme: legaleForme,
        numberEtablissment: numberEtablissment
      },
      status: 'found',
    };

    // Send the result back to the client
    res.status(200).json(result);
  } catch (error) {
    // Handle any errors during the request or parsing
    console.error('Error fetching or parsing the page:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

module.exports = router;
