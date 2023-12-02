require('dotenv').config();
const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io')
const cors = require('cors');
const cookieParser = require('cookie-parser');
//initialize or setup - server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {cors :{origin : "http://localhost:3000"}})


const connectDB = require('./database/connection'); // connection
//route
const account = require('./route/account');
const client = require('./route/client');
const product = require('./route/admin/product');
const a_order = require('./route/admin/order');
const c_order = require ('./route/customer/orders')


app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : "http://localhost:3000"
}));



//route
app.use('/api/account', account);
app.use('/api/client', client);
app.use('/api/product', product);

app.use('/api/customer', c_order);
app.use('/api/admin', a_order);



//socket controller
const a_registerOrderHandler = require ('./socket/admin/orderHandler');
const c_registerOrderHandler = require('./socket/customer/orderHandler');

const adminConnection = (socket) => {
    a_registerOrderHandler(io, socket);
}
const customerConnection = (socket) => {
    c_registerOrderHandler(io, socket);
    
}


io.of("/admin").on("connection",adminConnection);
io.of("/customer").on("connection", customerConnection);










//starting a server
const start = async () =>{ 
    try {
        await connectDB(process.env.MONGO_URI);
        httpServer.listen(3001, () => console.log("server is listening in port 3001"))

    } catch (error) {
        console.log(error);
    }
}

start(); // start server









