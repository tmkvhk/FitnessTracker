const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://kjo889:anyone123@cluster0.55ctkqr.mongodb.net/FitnessTracker?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('connected to database')
})
.catch(()=>{
    console.log('connection error')
})

const foodSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    serving_size_g: Number,
    fat_total_g: Number,
    fat_saturated_g: Number,
    protein_g: Number,
    sodium_mg: Number,
    potassium_mg: Number,
    cholesterol_mg: Number,
    carbohydrates_total_g: Number,
    fiber_g: Number,
    sugar_g: Number,
    enteredQuery: String
})
const FoodModel = mongoose.model('Food', foodSchema)

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
            
            const bodyJSON = JSON.parse(body);
            const newData = [];

            bodyJSON.forEach(element => {
                element.enteredQuery = query;
                const newFood = new FoodModel(element);
                newFood.save();
                newData.push(newFood); // Collect data to send in the response
            });

            res.status(201).json({
                message: "This is data from api",
                data: newData // Send collected data in the response
            });
        }
    });
});

app.get('/api/nutrition/data', (req, res, next) => {
    FoodModel.find().then(documents =>{
        res.status(200).json({
            message: "This is fetched data",
            data: documents
        })
    })
})

app.delete('/api/nutrition/:id', (req, res, next) => {
    FoodModel.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result)
        res.status(200).json({message: "Post Deleted"})
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
