import React from 'react';
import "./Header.css";
import { useAuth } from '../../../useAuth';
import { useNavigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from '../../../useAuth';
// import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
    const {loggedIn, setLoggedIn} = useAuth();
    // const {loggedIn} = useAuth();
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/account");
    }

    const handleLogout = () => {
        setLoggedIn('');
        alert('您已登出系統');
        navigate("/account");
    }

    const loggedInName = () => (
        <div onClick={handleLogout}>{loggedIn}</div>
    )
    const notLoggedInbutton  = () => (
        <div onClick={handleRegister}>入籍系統</div>
    )
    return (
        <div className="header">
            <div className="logo-x">綠山行動</div>
            
            <div className="register">
                {loggedIn==="" ? notLoggedInbutton () : loggedInName()}
            </div>
        </div>
    );
}

export default Header;
