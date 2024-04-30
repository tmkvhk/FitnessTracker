const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/nutrition', (req, res) => {
    const query = req.query.query;
  
    // Define the URL and API key
    const url = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;
    const apiKey = '1CVkczf/+3vz6KBha/rZQw==ifMPWZGqaDOIBRAq';
    const options = {
        url: url,
        headers: {
            'X-Api-Key': apiKey
        }
    };
  
    // Send the request to the external API
    request.get(options, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log("Received GET request to /api/nutrition");
            console.log("Query:", query);
            console.log("Response:", body);

            res.json(JSON.parse(body));
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
