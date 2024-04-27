import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: "react app", // app name registered
    entry: "//localhost:8080",
    container: "#yourContainer",
    activeRule: "/vue-app",
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
