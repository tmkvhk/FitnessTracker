const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3000; // Set port

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

app.get('/api/nutrition', (req, res) => {
    const query = req.query.query;
  
    // Define the URL and API key
    const url = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;
    const apiKey = '1CVkczf/+3vz6KBha/rZQw==ifMPWZGqaDOIBRAq'; // Replace with your actual API key
  
    // Options for the request to the external API
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

            // Send the response received from the external API back to the client
            res.json(JSON.parse(body));
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Example response:

// [
//     {
//       "name": "brisket",
//       "calories": 1312.3,
//       "serving_size_g": 453.592,
//       "fat_total_g": 82.9,
//       "fat_saturated_g": 33.2,
//       "protein_g": 132,
//       "sodium_mg": 217,
//       "potassium_mg": 781,
//       "cholesterol_mg": 487,
//       "carbohydrates_total_g": 0,
//       "fiber_g": 0,
//       "sugar_g": 0
//     },
//     {
//       "name": "fries",
//       "calories": 317.7,
//       "serving_size_g": 100,
//       "fat_total_g": 14.8,
//       "fat_saturated_g": 2.3,
//       "protein_g": 3.4,
//       "sodium_mg": 212,
//       "potassium_mg": 124,
//       "cholesterol_mg": 0,
//       "carbohydrates_total_g": 41.1,
//       "fiber_g": 3.8,
//       "sugar_g": 0.3
//     }
//   ]