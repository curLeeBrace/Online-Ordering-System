
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


const connectDB = require('./database/connection');
const account = require('./route/account');

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors({
  origin : "http://localhost:3000"
}));




app.use('/api/account', account);

const start = async () =>{ 
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3001, () => console.log("server is listening in port 3001"))

    } catch (error) {
        console.log(error);
    }
}

start();



