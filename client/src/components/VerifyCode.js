import React from 'react'

function VerifyCode() {
  return (
    
        <div className="h-full bg-gray-200 p-6 w-full h-screen">
          <div className="max-w-md mx-auto bg-white p-4 md:p-8 rounded shadow-lg text-sm">
          <form>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Enter the verification code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
          <button 
                id='sendCode'
                 className="w-full bg-lime-800 text-white p-3 rounded mt-2 hover:bg-amber-950 transition duration-300">
                  Send Verification Code  
                </button>
                </form>
        </div>
    </div>
  )
}

export default VerifyCode