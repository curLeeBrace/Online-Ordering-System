import React from 'react'

function ChangeAddress() {
    let className = "block text-sm font-medium text-gray-700";
    return (
        <div className="h-screen bg-gray-200 p-6 ">
          <div className="max-w-md mx-auto bg-white p-8 -mt-4 mb-0 rounded shadow-lg text-sm">
            <h2 className="text-xl font-semibold text-center mb-4 -mt-4">Change your Address
            </h2>
            <form>
              {/* Email */}
              <div className="mb-4">
                <label
                  className={className}
                >
                  Municipality
                </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brgy
                </label>
                <input
                  type="text"
                  id="Pnumber"
                  name="Pnumber"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                  maxLength="10"
                  minLength="10"       
                />
              </div>
            
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street & House#
                </label>
                <input
                  type="text"
                  id="Uname"
                  name="Uname"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-950"
                  required
                  maxLength="10"
                 
                />
              
          </div>
          <button
              type="submit"
              className="w-full bg-lime-800 text-white p-3 md:hover:scale-110 rounded-xl hover:bg-white transition duration-300 relative bg-amber-950 isolation-auto z-10 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-950 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            >
              Change Address
            </button>
          </form>
          </div>
          </div>
      );
}

export default ChangeAddress

