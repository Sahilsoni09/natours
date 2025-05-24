const express = require('express');
const fs = require("fs");

const app = express();

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours: tours
        }
    });
})

app.post('/', (req, res) => {
    res.send('Hello World! POST');
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
} )