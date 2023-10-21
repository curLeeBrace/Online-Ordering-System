import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import VerifyCode from './pages/VerifyCode';
import ForgotPass from './pages/ForgotPass';


  
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
      },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/verify",
        element: <VerifyCode />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPass />,
      },
    
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router} />

);


