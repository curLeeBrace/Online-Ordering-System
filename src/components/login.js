import React, { useState } from "react";

function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your login logic here, e.g., make an API request to authenticate.

    console.log("User: " + user);
    console.log("Password: " + password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
      <img src="./img/milktealogo.png" alt="" className=" lg:h-12 md:h-20 flex items-center justify-center" />
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="user" className="block text-gray-700 text-sm font-semibold">
              Email:
            </label>
            <input
              type="text"
              id="user"
              className="w-full p-2 border rounded"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser  (e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
