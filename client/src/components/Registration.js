import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { api } from "../customHooks/configAxios";
import { setCookie, getCookie } from "../customHooks/cookiesHandler";
function Registration() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [enableBtn, setEnable] = useState(true);
  const [confirmPass, setConfirmPass] = useState("");
  const [userData, setUserData] = useState({
    Email: "",
    Pnumber: "",
    Uname: "",
    Fname: "",
    Mname: "",
    Lname: "",
    Municipality: "",
    Brgy: "",
    Street_N_House: "",
    Password: "",
    code: "000000",
    verified: false,
  });

  const [license, setLicense] = useState(null);

  // dont acess registration if state is null the "userType" is null
  useEffect(() => {
    const cookieVerifyEmail = "emailVerification";
    const getEmail = getCookie(cookieVerifyEmail);
    if (location.state.userType === null) {
      navigate("/login");
    }

    console.log("UserTyep is : ", location.state.userType);







    if (getEmail) {
      navigate("/verification");
    }



  }, []);



  
  // Handle user Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberPattern = /^\d*$/;
    const alphabetPattern = /^([a-zA-Z\s]*)$/;
    //validate Phone Number
    if (name === "Pnumber") {
      if (numberPattern.test(value)) {
        setUserData((prev) => {
          return { ...prev, [name]: value };
        });
      } else {
        alert("Invalid Input!");
      }
    }
    //Validate Fname, Mname, Lname, Municipality to not contains numbers
    else if (
      name === "Fname" ||
      name === "Mname" ||
      name === "Lname" ||
      name === "Municipality"
    ) {
      if (alphabetPattern.test(value)) {
        setUserData((prev) => {
          return { ...prev, [name]: value };
        });
      } else {
        alert("Invalid Input!");
      }
    } else if (name !== "ConfirmPass") {
      setUserData((prev) => {
        return { ...prev, [name]: value };
      });
    } else {
      setConfirmPass(value);
    }
  };

  // Handle onsubmit buttton or register button
  const registerHandler = (e) => {
    e.preventDefault();
    const cookieVerifyEmail = "emailVerification";
    const email_pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // "valid email example : test@gmail.com"
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/; // text with numbers and other special characters


    if (userData.Email.match(email_pattern)) {
      
      if (userData.Password.match(password_pattern)) {
        //send request to server
        if (userData.Password === confirmPass) {
            
          setEnable(false);
       




          api
            .post(`/account/create/${location.state.userType}`, userData)
            .then((res) => {
              // console.log(res);
              if (res.data.sucsess === true) {
                  if(location.state.userType === "raider") {//post request for uploading lisence if userType is raider 
              
                
                      const formData = new FormData();
                      formData.append('userID', res.data.userID);
                      formData.append('license', license, license.name);
                      console.log(license.name);

          
                      api.post('/account/upload-license',formData,{
                        headers : {"Content-Type": "multipart/form-data"}
                      })
                      .then(res => console.log(res.data))
                      .catch(err => console.error(err))
                  }






                alert("Redirecting to Email Confirmation");
                //setCookie
                // setCookie(cookieVerifyEmail, userData.Email);

                //useNavigate
                navigate("/verification");
              } else {
                
                alert(res.data.notiff);
                setEnable(true);
              }
            })
            .catch((err) => console.log(err));
        } else {
          alert("Password does not match!");
        }
      } else {
        alert(
          "Please put some capital letters and numbers for strong password!"
        );
      }
    } else {
      alert("Not Valid!");
    }

    // console.log("Register!");
  };

  return (
    <div className="h-full bg-gray-200 p-6  ">
      <div className="max-w-md mx-auto bg-white p-8 -mt-4 mb-0 rounded shadow-lg text-sm">
        <h2 className="text-xl font-semibold text-center mb-4 -mt-4">Create An Account
        </h2>
        <form onSubmit={registerHandler}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
              onChange={handleChange}
              value={userData.Email}
            />
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="Pnumber"
              name="Pnumber"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
              maxLength="10"
              minLength="10"
              defaultValue="0"
              onChange={handleChange}
              value={userData.Pnumber}
            />
          </div>
            { location.state.userType === "raider" ?
              <div className="mb-4">
              <label
                htmlFor="Pnumber"
                className="block text-sm font-medium text-gray-700"
              >
                License
              </label>
              <input
                type="file"
                id="liscense"
                name="Pnumber"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                required
                onChange={(e) => {
                  setLicense(e.target.files[0]);
                }}
               
                // onChange={handleChange}
                // value={userData.Pnumber}
              />
            </div> : null
          
          }
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="Uname"
              name="Uname"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
              maxLength="10"
              onChange={handleChange}
              value={userData.Uname}
            />
          </div>
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="Fname"
              name="Fname"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
              maxLength="20"
              onChange={handleChange}
              value={userData.Fname}
            />
          </div>

          {/* Middle Name */}
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="Mname"
              name="Mname"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
              maxLength="20"
              onChange={handleChange}
              value={userData.Mname}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="Lname"
              name="Lname"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
              maxLength="10"
              onChange={handleChange}
              value={userData.Lname}
            />
          </div>

          {/* Municipality */}
          <div className="mb-4">
            <label
              htmlFor="municipality"
              className="block text-sm font-medium text-gray-700"
            >
              Municipality
            </label>
            <input
              type="text"
              id="Municipality"
              name="Municipality"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              placeholder="E.g., Magdalena"
              required
              maxLength="20"
              onChange={handleChange}
              value={userData.Municipality}
            />
          </div>

          <div className="mb-4 text-sm ">
            {/* Brgy */}
            <label
              htmlFor="municipality"
              className="block text-sm font-medium text-gray-700"
            >
              Brgy
            </label>
            <input
              type="text"
              id="Brgy"
              name="Brgy"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              placeholder="E.g., Duhat"
              required
              maxLength="25"
              onChange={handleChange}
              value={userData.Brgy}
            />
            {/* Street & House# */}
            <label
              htmlFor="municipality"
              className="block text-sm font-medium text-gray-700 "
            >
              Street & House#
            </label>
            <input
              type="text"
              id="Street_N_House"
              name="Street_N_House"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              placeholder="E.g., Sitio San Miguel 04-067"
              required
              maxLength="30"
              onChange={handleChange}
              value={userData.Street_N_House}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="Password"
              name="Password"
              className="mt-1 p-2 w-full border  border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
              minLength="7"
              onChange={handleChange}
              value={userData.Password}
            />
            <button
              className="absolute mt-6 inset-y-0 right-0 flex items-center text-gray-600"
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordVisible((prev) => !prev);
              }}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirm_pass"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={isPasswordVisible2 ? "text" : "password"}
              id="confirm_pass"
              name="ConfirmPass"
              onChange={handleChange}
              value={confirmPass}
              className="mt-1 p-2 w-full border  border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
              required
            />
            <button
              className="absolute mt-6 inset-y-0 right-0 flex items-center text-gray-600"
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordVisible2((prev) => !prev);
              }}
            >
              {isPasswordVisible2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Register */}
          <div className="mb-4">
            {
              enableBtn ?
            <button
              type="submit"
              className="w-full bg-lime-800 text-white p-3 md:hover:scale-110 rounded-xl hover:bg-white transition duration-300 relative bg-amber-950 isolation-auto z-10 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-950 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            >
              Register
            </button> : 'Loading...'
          }
          </div>
        </form>
        <p className="text-center text-gray-500 ml-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
