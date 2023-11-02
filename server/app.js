
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const connectDB = require('./database/connection');
const account = require('./route/account');

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : "http://localhost:3000"
}));




app.use('/api/account', account);

//testing setup cookie
// app.post('/api/setCookie', (req, res) => {

//     res.cookie('email', `${req.body.email}`);//set cookie
//     res.cookie('verification', true);//set cookie
//     res.json({setCoockie : true});
// })

// app.post('/api/account/create/:type', (req, res)=>{
    
//     let {type} = req.params;
//     console.log(type);
//     res.json({succses : true});
// })

const start = async () =>{ 
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3001, () => console.log("server is listening in port 3001"))

    } catch (error) {
        console.log(error);
    }
}

start();



