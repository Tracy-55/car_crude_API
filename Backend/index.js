const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let cars = [];

// Fetch car data from the external API
async function fetchCarData() {
    try {
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        cars = response.data;
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}

// Initial fetch of car data
fetchCarData();

// Define routes
app.get('/api/cars', (req, res) => {
    res.send(cars);
});

app.get('/api/mostPopularCar', (req, res) => {
    const makes = cars.reduce((acc, car) => {
        acc[car.make] = (acc[car.make] || 0) + 1;
        return acc;
    }, {});
    const mostPopularMake = Object.keys(makes).reduce((a, b) => makes[a] > makes[b] ? a : b);
    res.send({ make: mostPopularMake });
});

// Endpoint to add a new car
app.post('/api/cars', (req, res) => {
    const newCar = req.body;
    if (!newCar.color || !newCar.make || !newCar.model || !newCar.reg_number) {
        return res.status(400).send({ error: 'Missing car information' });
    }
    cars.push(newCar);
    res.status(201).send(newCar);
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
