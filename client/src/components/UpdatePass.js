import { useEffect, useState } from "react";
import { getCookie , removeCookies} from "../hooks/cookiesHandler";
import { useNavigate } from "react-router-dom";
import { api } from "../hooks/configAxios";

const UpdatePass = () => {
    const [newPass, setNewPass] = useState('');
    const [reTypePass, setReTypePass] = useState('');
    const navigate = useNavigate();
    const cookieSetNewPAss = "setNewPass";
    const cookieEmail = "email-forgotPass";
    const cookieVerification = "verification-forgotPass";
   
    //check if user can chang her password, check cookies if its true then if false go back to registration 
      useEffect(() => {
      
      const setNewPass = getCookie(cookieSetNewPAss);
      if(!setNewPass) {
        navigate("/forgot-pass");
      }
    }, [])

    const handleChange = (state, e) => {
        const { value } = e.target;
        state(value);
    }

    const updatePass = (e) => {
      e.preventDefault();
      const email = getCookie(cookieEmail);
      //request of changing password if new pass and confirmpass mathced!
      if(newPass === reTypePass){
        api.post('/account/updatePass', {
          email : email,
          newPass : newPass
        })
        .then(res => {
          const {sucsess, notiff} = res.data;
          if(sucsess){
            alert(notiff);
            //delete cookie
            removeCookies([cookieEmail, cookieSetNewPAss, cookieVerification]);
            //Then back to login Page
            navigate('/login', {replace : true});
          }
        })
        .catch(err => console.log(err))
      } 
      else {
        alert("Password does not matched!");
      } 
    }
    
    return (
        <div className="bg-gray-100 p-6 w-full h-screen">
          <div className="max-w-md mx-auto bg-white p-4 md:p-8 rounded shadow-lg text-sm">
            <form>

                  <label
                    htmlFor="retrieve"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  {/* New Pass */}
                  <input
                    type="password"
                    id="retrieve"
                    name="newPass"
                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                    required
                    minLength="8"
                    onChange={(e) => handleChange(setNewPass, e)}
                    value={newPass}
                  />
    
             
         
                  <div>
                    <label
                      htmlFor="rePass"
                      className="block text-sm font-medium text-gray-700"
                    >
                     Re-Type Password
                    </label>
    
                    <input
                      type="password"
                      id="rePass"
                      name="rePass"
                      className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                      required
                   
                      minLength="8"
                      onChange={(e) => handleChange(setReTypePass, e)}
                      value={reTypePass}
                    />
    
                    <button
                      id="retrieveCode"
                      className="w-full bg-lime-800 text-white p-3 rounded mt-2 hover:bg-amber-950 transition duration-300"
                      onClick={updatePass}
                    >
                      Submit
                    </button>
                  </div>
             
              
            </form>
          </div>
         
        </div>
        
      );
}

export default UpdatePass;