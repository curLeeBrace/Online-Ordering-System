import { Route, Routes } from "react-router-dom";
import React from "react";



import Navbar from "./components/Customer/Navbar";
import HomePage from "./components/Customer/HomePage";
import Login from "./components/Customer/Login";
import Menu from "./components/Customer/Menu";
import OrderNav from "./components/Customer/OrderNav";
import About from "./components/Customer/About";

import Registration from "./components/Registration";
import ForgotPass from "./components/ForgotPass";
import VerifyCode from "./components/VerifyCode";
import UpdatePass from "./components/UpdatePass";


import AdminMain from "./components/Admin/AdminMain"
import Accounts from "./components/Admin/Accounts";
import RiderAccounts from "./components/Admin/RiderAccounts";
import SalesHistory from "./components/Admin/SalesHistory";
import AddProducts from "./components/Admin/AddProducts";
import AdminOrders from "./components/Admin/AdminOrders";

import RiderNavbar from "./components/Rider/RiderNavbar";
import OrderList from "./components/Rider/OrderList";
import DeliveryList from "./components/Rider/DeliveryList";
import UploadProof from "./components/Rider/UploadProof";

import NotFoundPage from "./components/NotFoundPage";
//context custom hooks
import { OrderProvider } from "./customHooks/context/order_context";





function App() {
  return (
 
     
        <Routes>
         
          
          <Route path="/" element={<Navbar/>}>
            <Route index element = {<HomePage/>}/>  
            <Route path = "home" element = {<HomePage/>}/> 
            <Route path = "menu" element={<Menu />} />
            <Route path = "orders" element = {<OrderNav/>}/>
            <Route path = "about" element = {<About/>}/>
          </Route>

     
          <Route path = "login" element={<Login />}/>
          <Route path="/registration" element={<Registration />} />
          <Route path="/verification" element={<VerifyCode />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/newPass" element={<UpdatePass />} />
          
          {/**figs Route */}

          {/* admin */}
          <Route path="/admin" element={<AdminMain/>}>
            <Route index element = {<OrderProvider><AdminOrders/></OrderProvider>}/>
            {/* <Route path="accounts" element={<Accounts />} /> */}
            <Route path="raider" element={<RiderAccounts />} />
            <Route path="sales" element={<SalesHistory />} />
            <Route path="products" element={<AddProducts />} />
            <Route path="admin-orders" element={<OrderProvider><AdminOrders/></OrderProvider>} />
          </Route>
         <Route path = "*" element = {<NotFoundPage/>}/>

         {/* rider */}
         <Route path="/raider" element={<RiderNavbar/>}>
            <Route index element = {<OrderList/>}/>
            <Route path="order-list" element={<OrderList />} />
            <Route path="my-delivery" element={<DeliveryList />} />
            <Route path="upload-proof" element={<UploadProof />} />
         </Route>

        </Routes>


  );
}

export default App;
