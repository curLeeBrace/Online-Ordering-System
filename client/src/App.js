import {Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login"
import Registration from "./components/Registration"
import ForgotPass from "./components/ForgotPass";
import VerifyCode from "./components/VerifyCode";
import UpdatePass from "./components/UpdatePass";


function App() {
  return (
    <>    
        <Routes>
          <Route path = "/" element = {<HomePage/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/registration" element = {<Registration/>}/>
          <Route path= "/verification" element = {<VerifyCode/>}/>
          <Route path = "/forgot-pass" element = {<ForgotPass/>}/>
          <Route path = "/newPass" element = {<UpdatePass/>}/>

        </Routes>
    </>
  );
}

export default App;
