const express = require('express');
const { request } = require('http');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use(morgan('dev')); // Logging middleware



app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter); 


module.exports = app;