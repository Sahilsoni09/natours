const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app'); 


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false,
}).then(() => {
    console.log('DB connection successful!');
})

const port = process.env.PORT ||3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
} )