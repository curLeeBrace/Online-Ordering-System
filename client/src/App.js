import { Route, Routes } from "react-router-dom";
import React from "react";

import { getCookie } from "./customHooks/cookiesHandler";
import { AuthProvider } from "./customHooks/context/auth";

import Navbar from "./components/Customer/Navbar";
import HomePage from "./components/Customer/HomePage";
import Login from "./components/Customer/Login";
import Menu from "./components/Customer/Menu";

import Registration from "./components/Registration";
import ForgotPass from "./components/ForgotPass";
import VerifyCode from "./components/VerifyCode";
import UpdatePass from "./components/UpdatePass";


import AdminNavbar from "./components/Admin/AdminMain";
import Accounts from "./components/Admin/Accounts";
import RiderAccounts from "./components/Admin/RiderAccounts";
import SalesHistory from "./components/Admin/SalesHistory";
import AddProducts from "./components/Admin/AddProducts";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <>
     
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index element = {<HomePage/>}/>
            <Route path = "home" element = {<HomePage/>}/> 
            <Route path = "menu" element={<Menu />} />
          </Route>

     
          <Route path = "login" element={<Login />}/>
          <Route path="/registration" element={<Registration />} />
          <Route path="/verification" element={<VerifyCode />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/newPass" element={<UpdatePass />} />
          {/**figs Route */}

          {/* admin */}
          <Route path="/admin" element={<AdminNavbar />}>
            <Route index element = {<Accounts/>}/>
            <Route path="accounts" element={<Accounts />} />
            <Route path="rider" element={<RiderAccounts />} />
            <Route path="sales" element={<SalesHistory />} />
            <Route path="products" element={<AddProducts />} />
          </Route>
         
        </Routes>

    </>
  );
}

export default App;
