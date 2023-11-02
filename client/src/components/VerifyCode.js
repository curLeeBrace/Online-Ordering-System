import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isNum } from "../Auth/verifyInput";
import { getCookie , removeCookie} from "../hooks/cookiesHandler";
import { api } from "../hooks/configAxios";


function VerifyCode({}) {
  const location = useLocation();

  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState("");
  const cookieVerifyEmail = "emailVerification";

  // back to registration path if no cookie email found and verification is false

  useEffect(() => {
    
    const getEmail = getCookie(cookieVerifyEmail);
    if(!getEmail) {

      navigate('/login');
    }

    setEmail(getEmail);
    
  }, []);

  // request code verification if valid
  const handleVerification = (e) => {
    e.preventDefault();
    api
      .post("/account/verifyAccount", { email: email, code: code })
      .then((res) => {
        alert(res.data.notiff);
        if(res.data.sucsess) {
          removeCookie(cookieVerifyEmail);
          navigate("/login", {replace : true});
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const {value} = e.target;
    isNum(setCode, value);
    
  }
  
  return (
    <div className="bg-gray-100 p-6 w-full h-screen">
       
      <div className="max-w-md mx-auto bg-white p-4 md:p-8 rounded shadow-lg text-sm">
        <b><h1>We sent a launch code to : {email} </h1></b>
        <form>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Enter the verification code
          </label>
          <input
            type="text"
            id="code"
            onChange={handleChange}
            name="code"
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
            value={code}
            maxLength="6"
            required
          />
          <button
            id="sendCode"
            onClick={handleVerification}
            className="w-full bg-lime-800 text-white p-3 rounded mt-2 hover:bg-amber-950 transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyCode;
