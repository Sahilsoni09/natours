const express = require('express');
const fs = require("fs");
const { request } = require('http');
const morgan = require('morgan');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use(morgan('dev')); // Logging middleware

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        requestTime: req.requestTime,
        data: {
            tours: tours
        }
    });
}

const getTour =  (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
}

const updateTour = (req, res) => {   
    const id = req.params.id*1;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: "<update tour here>"
        }
    });
}

const deleteTour = (req, res) => {
    
    const id = req.params.id*1;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(204).json({
        status: 'success',
        data: null
    });
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined yet!'
    });
}

const getUser =  (req, res) => {
   res.status(500).json({
        status: 'error',
        message: 'This route is not defined yet!'
    });
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined yet!'
    });
}

const updateUser = (req, res) => {   
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined yet!'
    });
}

const deleteUser = (req, res) => {
   res.status(500).json({
        status: 'error',
        message: 'This route is not defined yet!'
    });
}

const tourRouter = express.Router();
app.use("/api/v1/tours", tourRouter);

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);
tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

const userRouter = express.Router();
app.use("/api/v1/users", userRouter); 

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);
userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
} )