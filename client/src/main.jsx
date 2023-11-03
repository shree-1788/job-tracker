import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </React.StrictMode>
);

// scripts from package.json to run sepeartely
// "test": "echo \"Error: no test specified\" && exit 1",
// "setup-project": "npm i && cd client && npm i",
// "dev": "nodemon server.js",
