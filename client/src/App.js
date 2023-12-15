import { Route, Routes } from "react-router-dom";
import React from "react";

import LoadingPage from "./Loading";
import NotFoundPage from "./components/NotFoundPage";
//context custom hooks
import { OrderProvider } from "./customHooks/context/order_context";

// import Navbar from "./components/Customer/Navbar";
// import HomePage from "./components/Customer/HomePage";
// import Login from "./components/Customer/Login";
// import Menu from "./components/Customer/Menu";
// import OrderNav from "./components/Customer/OrderNav";
// import About from "./components/Customer/About";

const Navbar = React.lazy(() => import('./components/Customer/Navbar'))
const HomePage = React.lazy(() => import('./components/Customer/HomePage'))
const Login = React.lazy(() => import('./components/Customer/Login'))
const Menu = React.lazy(() => import('./components/Customer/Menu'))
const OrderNav = React.lazy(() => import('./components/Customer/OrderNav'))
const About = React.lazy(() => import('./components/Customer/About'))
const ChangeAddress = React.lazy(() => import('./components/Customer/ChangeAddress'))



// import Registration from "./components/Registration";
// import ForgotPass from "./components/ForgotPass";
// import VerifyCode from "./components/VerifyCode";
// import UpdatePass from "./components/UpdatePass";

const Registration = React.lazy(() => import('./components/Registration'))
const ForgotPass = React.lazy(() => import('./components/ForgotPass'))
const VerifyCode = React.lazy(() => import('./components/VerifyCode'))
const UpdatePass = React.lazy(() => import('./components/UpdatePass'))






// import AdminMain from "./components/Admin/AdminMain"
// import RiderAccounts from "./components/Admin/RiderAccounts";
// import SalesHistory from "./components/Admin/SalesHistory";
// import AddProducts from "./components/Admin/AddProducts";
// import AdminOrders from "./components/Admin/AdminOrders";

const AdminMain = React.lazy(() => import('./components/Admin/AdminMain'))
const RiderAccounts = React.lazy(() => import('./components/Admin/RiderAccounts'))
const SalesHistory = React.lazy(() => import('./components/Admin/SalesHistory'))
const AddProducts = React.lazy(() => import('./components/Admin/AddProducts'))
const AdminOrders = React.lazy(() => import('./components/Admin/AdminOrders'))





// import RiderNavbar from "./components/Rider/RiderNavbar";
// import OrderList from "./components/Rider/OrderList";
// import DeliveryList from "./components/Rider/DeliveryList";
// import UploadProof from "./components/Rider/UploadProof";

const RiderNavbar = React.lazy(() => import('./components/Rider/RiderNavbar'))
const OrderList = React.lazy(() => import('./components/Rider/OrderList'))
const DeliveryList = React.lazy(() => import('./components/Rider/DeliveryList'))
const UploadProof = React.lazy(() => import('./components/Rider/UploadProof'))







function App() {
  return (
 
     
        <Routes>
         
          
          <Route path="/" element={<React.Suspense fallback = {<LoadingPage/>}><Navbar/></React.Suspense>}>
            <Route index element = {<React.Suspense fallback = {<LoadingPage/>}><HomePage/></React.Suspense>}/>  
            <Route path = "home" element = {<React.Suspense fallback = {<LoadingPage/>}><HomePage/></React.Suspense>}/> 
            <Route path = "menu" element={<React.Suspense fallback = {<LoadingPage/>}><Menu /></React.Suspense>} />
            <Route path = "orders" element = {<React.Suspense fallback = {<LoadingPage/>}><OrderNav/></React.Suspense>}/>
            <Route path = "about" element = {<React.Suspense fallback = {<LoadingPage/>}><About/></React.Suspense>}/>
            <Route path = "change-address" element = {<React.Suspense fallback = {<LoadingPage/>}><ChangeAddress/></React.Suspense>}/>
          </Route>

     
          <Route path = "login" element={<React.Suspense fallback = {<LoadingPage/>}><Login /></React.Suspense>}/>
          <Route path="/registration" element={<React.Suspense fallback = {<LoadingPage/>}><Registration /></React.Suspense>} />
          <Route path="/verification" element={<React.Suspense fallback = {<LoadingPage/>}><VerifyCode /></React.Suspense>} />
          <Route path="/forgot-pass" element={<React.Suspense fallback = {<LoadingPage/>}><ForgotPass /></React.Suspense>} />
          <Route path="/newPass" element={<React.Suspense fallback = {<LoadingPage/>}><UpdatePass /></React.Suspense>} />
          
          {/**figs Route */}

          {/* admin */}
          <Route path="/admin" element={<React.Suspense fallback = {<LoadingPage/>}><AdminMain/></React.Suspense>}>
            <Route index element = {<OrderProvider><React.Suspense fallback = {<LoadingPage/>}><AdminOrders/></React.Suspense></OrderProvider>}/>
            {/* <Route path="accounts" element={<Accounts />} /> */}
            <Route path="raider" element={<React.Suspense fallback = {<LoadingPage/>}><RiderAccounts /></React.Suspense>} />
            <Route path="sales" element={<React.Suspense fallback = {<LoadingPage/>}><SalesHistory /></React.Suspense>} />
            <Route path="products" element={<React.Suspense fallback = {<LoadingPage/>}><AddProducts /></React.Suspense>} />
            <Route path="admin-orders" element={<OrderProvider><React.Suspense fallback = {<LoadingPage/>}><AdminOrders/></React.Suspense></OrderProvider>} />
          </Route>
         <Route path = "*" element = {<NotFoundPage/>}/>

         {/* rider */}
         <Route path="/raider" element={<React.Suspense fallback = {<LoadingPage/>}><RiderNavbar/></React.Suspense>}>
            <Route index element = {<React.Suspense fallback = {<LoadingPage/>}><OrderList/></React.Suspense>}/>
            <Route path="order-list" element={<React.Suspense fallback = {<LoadingPage/>}><OrderList /></React.Suspense>} />
            <Route path="my-delivery" element={<React.Suspense fallback = {<LoadingPage/>}><DeliveryList /></React.Suspense>} />
            <Route path="upload-proof" element={<React.Suspense fallback = {<LoadingPage/>}><UploadProof /></React.Suspense>} />
         </Route>

        </Routes>


  );
}

export default App;
