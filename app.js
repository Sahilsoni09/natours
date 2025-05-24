const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message : 'Hello World!'
    });
})

app.post('/', (req, res) => {
    res.send('Hello World! POST');
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
} )