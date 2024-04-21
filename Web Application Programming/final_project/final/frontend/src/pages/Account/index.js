import Header from "./components/Header"
import NavbarContainer from "./components/NavbarContainer"
import Layer1 from "./components/Layer1"
import Layer2 from "./components/Layer2"
import React, { createContext, useState, useContext } from 'react';



import "./index.css"


const Account = () => {
   
    return (
        <div>
            <Layer1 />
            <hr/>
            <Layer2 />
      </div>
      );
    };
export default Account