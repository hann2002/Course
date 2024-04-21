import "./Layer2.css"
import React, { useState, useEffect } from "react";
import Log_form from "./Log_form";
import Register_form from "./Register_form";
import { useAuth } from "../../../useAuth";


const Layer2 = () => {
    const [mode, setMode] = useState('login'); // 預設為登入模式
    const handleModeChange = (newMode) => {
      setMode(newMode);
    };
    const handleRegisterSuccess = () => {
      setMode('login'); //在註冊成功後，切換到登入模式
    };
  
    return (
      <div>
        <div className="button-group">
            <button  
                className={`button  ${mode === 'signup' ? 'selected' : ''}`}
                onClick={() => handleModeChange('signup')}>
                註冊帳號
            </button >
            <button  
                className={`button ${mode === 'login' ? 'selected' : ''}`}
                onClick={() => handleModeChange('login')}>
                登入帳號
            </button >
        </div>
        {mode === 'signup' ? (
          < Register_form onSuccess={handleRegisterSuccess}/>
        ) : (
          < Log_form />
        )}
      </div>
    );
  };

export default Layer2;
