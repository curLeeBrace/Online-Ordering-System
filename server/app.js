
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const connectDB = require('./database/connection');
const account = require('./route/account');
const client = require('./route/client');
const product = require('./route/admin/product');
const order = require ('./route/customer/orders')

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : "http://localhost:3000"
}));




app.use('/api/account', account);
app.use('/api/client', client);
app.use('/api/product', product);

app.use('/api/customer', order);





const start = async () =>{ 
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3001, () => console.log("server is listening in port 3001"))

    } catch (error) {
        console.log(error);
    }
}

start();



