import { Route, Routes } from "react-router-dom";
import React from "react";



import Navbar from "./components/Customer/Navbar";
import HomePage from "./components/Customer/HomePage";
import Login from "./components/Customer/Login";
import Menu from "./components/Customer/Menu";
import Orders from "./components/Customer/Orders";
import About from "./components/Customer/About"

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

import NotFoundPage from "./components/NotFoundPage";


import { OrderProvider } from "./customHooks/context/order_context";



function App() {
  return (
    <>
     
        <Routes>
         
          
          <Route path="/" element={<Navbar/>}>
            <Route index element = {<HomePage/>}/>
            <Route path = "home" element = {<HomePage/>}/> 
            <Route path = "menu" element={<Menu />} />
            <Route path = "orders" element = {<Orders/>}/>
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
            <Route index element = {<Accounts/>}/>
            <Route path="accounts" element={<Accounts />} />
            <Route path="rider" element={<RiderAccounts />} />
            <Route path="sales" element={<SalesHistory />} />
            <Route path="products" element={<AddProducts />} />
            <Route path="admin-orders" element={<OrderProvider><AdminOrders/></OrderProvider>} />
          </Route>
         <Route path = "*" element = {<NotFoundPage/>}/>
        </Routes>

    </>
  );
}

export default App;
