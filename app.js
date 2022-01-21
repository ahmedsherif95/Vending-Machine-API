const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{
        useNewUrlParser:true
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.listen(3000);
//For Cross Domain Access
app.use(cors());

//Body Parser
app.use(bodyParser.json());

//Home Page Route
app.get('/', (req,res) => {
    res.send('Welcome To The Vending Machine')
});
//Import Products Routes
const productsRoute = require('./routes/Products');
app.use('/products', productsRoute);

//Import Users Routes
const usersRoute = require('./routes/Users');
app.use('/users', usersRoute);

const depositRoute = require('./routes/deposit');
app.use('/deposit',depositRoute);

const buyRoute = require('./routes/buy');
app.use('/buy',buyRoute);

const resetRoute = require('./routes/reset');
app.use('/reset',resetRoute);