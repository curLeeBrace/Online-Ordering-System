import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isNum, confirmEmail } from "../customHooks/verifyInput";
import { useState } from "react";

import { getCookie , setCookie} from "../customHooks/cookiesHandler";
import {api} from "../customHooks/configAxios";
function ForgotPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [enableVerification, setEnableVerification] = useState(false);
  const [enableEmailBtn, setEnableEmailBtn] = useState(true);
  const cookieEmail = "email-forgotPass";
  const cookieVerification = "verification-forgotPass";
  const cookieSetNewPAss = "setNewPass";
  
 
  useEffect(() => {
    const setNewPass = getCookie(cookieSetNewPAss);
    if(setNewPass) {
      navigate("/newPass", {replace : true});
    }
  }, [])

  useEffect(()=>{
    const email = getCookie(cookieEmail);
    const verification = getCookie(cookieVerification);
    
    if(email && verification){
      setEmail(email);
      setEnableVerification(true);
      setEnableEmailBtn(false);
    }
   
    // console.log(email, verification);

  },[])

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      isNum(setCode, value);
    }
  };

  const sendVerificationCode = (e) => {
    e.preventDefault();
    
    confirmEmail(email, () => {
      setEnableEmailBtn(false);

      api.post("/account/requestVerification", {
          email: email,
        })
        .then((res) => {
          const { 
            notiff: notiff, 
            sucsess: sucsess,
            cookies : cookies
          } = res.data;
          if (sucsess) {
            alert(notiff);
            //setCookie
            setCookie(cookieEmail, cookies.email);
            setCookie(cookieVerification, cookies.verification);
            // console.log(cookies.email);
            setEnableVerification(true);
          } else {
            alert(notiff);
            setEnableEmailBtn(true);
          }
        })
        .catch((err) => console.log(err));
    });
  };


  const submitCode = (e) => {
    e.preventDefault();
    api.post('/account/confirmVerificationCode',{
      email : email,
      clientCode : code, 
    })
    .then(res => {
      const {notiff, sucsess, cookies}= res.data;
      if(sucsess){
        alert(notiff)
        setCookie(cookieSetNewPAss, cookies.setNewPass);
        //navigate to change Pass Page
        navigate("/newPass", {replace : true});
      } 
      else {
        alert(notiff);
      }
    
    })
    .catch(err => console.log(err))

  }

  return (
    <div className="bg-gray-100 p-6 w-full h-screen">
      <div className="max-w-md mx-auto bg-white p-4 md:p-8 rounded shadow-lg text-sm">
        <form>
          {enableEmailBtn ? (
            <div>
              <label
                htmlFor="retrieve"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email
              </label>
              {/* Email */}
              <input
                type="email"
                id="retrieve"
                name="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                required
                onChange={handleChange}
                value={email}
              />

              <button
                id="retrieveCode"
                className="w-full bg-lime-800 text-white p-3 rounded mt-2 hover:bg-amber-950 transition duration-300"
                onClick={sendVerificationCode}
              >
                Send Verification Code
              </button>
            </div>
          ) : null}

          {
            // show code Textfield if true else hide
            enableVerification ? (
              <div>
                <h1>We sent code to: {email}</h1>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter confirmation code
                </label>

                <input
                  type="text"
                  id="code"
                  name="code"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                  maxLength="6"
                  minLength="6"
                  onChange={handleChange}
                  value={code}
                />

                <button
                  id="retrieveCode"
                  className="w-full bg-lime-800 text-white p-3 rounded mt-2 hover:bg-amber-950 transition duration-300"
                  onClick={submitCode}
                >
                  Submit
                </button>
              </div>
            ) : null
          }
        </form>
      </div>
    
    </div>
  );
}

export default ForgotPass;
