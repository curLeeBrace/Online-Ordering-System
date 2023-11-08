import { Route, Routes } from "react-router-dom";
import React from "react";

import { getCookie } from "./customHooks/cookiesHandler";
import { AuthProvider } from "./customHooks/context/auth";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ForgotPass from "./components/ForgotPass";
import VerifyCode from "./components/VerifyCode";
import UpdatePass from "./components/UpdatePass";

import Menu from "./components/Menu";
import AdminNavbar from "./components/Admin/AdminMain";
import Accounts from "./components/Admin/Accounts";
import RiderAccounts from "./components/Admin/RiderAccounts";
import SalesHistory from "./components/Admin/SalesHistory";
import AddProducts from "./components/Admin/AddProducts";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />

          <Route path="/registration" element={<Registration />} />
          <Route path="/verification" element={<VerifyCode />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/newPass" element={<UpdatePass />} />
          {/**figs Route */}

          {/* admin */}
          <Route path="/admin" element={<AdminNavbar />}>
            <Route index path="accounts" element={<Accounts />} />
            <Route path="rider" element={<RiderAccounts />} />
            <Route path="sales" element={<SalesHistory />} />
            <Route path="products" element={<AddProducts />} />
          </Route>
         
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
