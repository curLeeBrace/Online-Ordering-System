import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN_HERE',
    }
    // timeout: 5000, // Set a default timeout for all requests to this instance
  });
  