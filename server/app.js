require('dotenv').config();
const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io')
const cors = require('cors');
const cookieParser = require('cookie-parser');
//initialize or setup - server
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {cors :{origin : "*"}})


const connectDB = require('./database/connection'); // connection
//route
const account = require('./route/account');
const client = require('./route/client');
const product = require('./route/admin/product');
const a_order = require('./route/admin/order');
const c_order = require ('./route/customer/orders')
const raider_acc = require('./route/admin/raider_acc');
const sales_history = require('./route/admin/sales_history');
const r_delivery = require('./route/raider/deliveryHandler');
const address = require('./route/customer/address');

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(cors());



//route
app.use('/api/account', account);
app.use('/api/client', client);
app.use('/api/product', product);

app.use('/api/customer', c_order);
app.use('/api/admin', a_order);

app.use('/api/admin', raider_acc);  
app.use('/api/admin', sales_history);

app.use('/api/raider', r_delivery);

app.use('/api/address', address);

app.get('/', (req, res)=>{
    return res.send("Server Confirmed!");
})

//socket controller
const a_registerOrderHandler = require ('./socket/admin/orderHandler');
const c_registerOrderHandler = require('./socket/customer/orderHandler');
const r_reghisterDeliveryHandler = require('./socket/raider/deliveryHandler');
const adminConnection = (socket) => {
    a_registerOrderHandler(io, socket);
}
const customerConnection = (socket) => {
    c_registerOrderHandler(io, socket);
    
}
const raiderConnection = (socket) => {
    r_reghisterDeliveryHandler(io, socket)
}


io.of("/admin").on("connection",adminConnection);
io.of("/customer").on("connection", customerConnection);
io.of("/raider").on("connection", raiderConnection);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});






//starting a server
const start = async () =>{ 
    try {
        const PORT = process.env.PORT || 3001;
        await connectDB(process.env.MONGO_URI);
        httpServer.listen(PORT, () => console.log(`server is listening in port ${PORT}`))

    } catch (error) {
        console.log(error);
    }
}

start(); // start server









