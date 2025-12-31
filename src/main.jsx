import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Store from "./Store";
import { Provider } from "react-redux";
import "./css/Style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

<Provider  store={Store}>

<App />
    
</Provider>



);
