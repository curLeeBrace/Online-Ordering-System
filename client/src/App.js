import {Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login"
import Registration from "./components/Registration"
import ForgotPass from "./components/ForgotPass";
import VerifyCode from "./components/VerifyCode";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import AdminPage from "./components/AdminPage";
import Accounts from "./components/Accounts";
import RiderAccounts from "./components/RiderAccounts";
import SalesHistory from "./components/SalesHistory";
import AddProducts from "./components/AddProducts";


function App() {
  return (
    <>    
        <Routes>
          <Route path = "/" element = {<HomePage/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/registration" element = {<Registration/>}/>
          <Route path = "/forgot-pass" element = {<ForgotPass/>}/>
          <Route path= "/verification" element = {<VerifyCode/>}/>
          <Route path= "/navbar" element = {<Navbar/>}/>
          <Route path= "/menu" element = {<Menu/>}/>
          <Route path= "/admin" element = {<AdminPage/>}/>
          <Route path= "/accounts" element = {<Accounts/>}/>
          <Route path= "/rider" element = {<RiderAccounts/>}/>
          <Route path= "/sales" element = {<SalesHistory/>}/>
          <Route path= "/products" element = {<AddProducts/>}/>
        

        </Routes>
    </>
  );
}

export default App;
