const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

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
app.get('/api/cars', (_req, res) => {
    res.send(cars);
});

app.get('/api/mostPopularMake', (_req, res) => {
    const makes = cars.reduce((acc, car) => {
        const make = car.make.toLowerCase();
        acc[make] = (acc[make] || 0) + 1;
        return acc;
    }, {});

    // Find the most popular make, with tie-breaking logic
    const sortedMakes = Object.entries(makes)
        .sort(([, aCount], [, bCount]) => bCount - aCount || a.localeCompare(b))
        .map(([make]) => make);

    const mostPopularMake = sortedMakes[0];
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

// Export the `mostPopularMake` function for testing

function mostPopularMake(cars) {
    if (cars.length === 0) return undefined;

    const makes = cars.reduce((acc, car) => {
        const make = car.make.toLowerCase();
        acc[make] = (acc[make] || 0) + 1;
        return acc;
    }, {});

    // Convert makes object to an array and sort it
    const sortedMakes = Object.entries(makes)
        .sort(([, aCount], [, bCount]) => bCount - aCount) // Sort by count descending
        .map(([make]) => make);

    return sortedMakes[0]; // Return the most popular make
}

module.exports = {
    mostPopularMake
};
