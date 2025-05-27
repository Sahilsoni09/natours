const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logging middleware for development
}

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(`${__dirname}/public`)); // Serve static files from the public directory

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter); 


module.exports = app;