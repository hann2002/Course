import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Home from "./home.jsx";
import "./css/hong.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </StrictMode>
);