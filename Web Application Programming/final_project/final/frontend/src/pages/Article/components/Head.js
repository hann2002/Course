import React from 'react';
// import { Link } from 'react-router-dom';
const Head = () => {
  return (
    <div className="header-container" style={{ marginBottom: '4%', backgroundColor: '#EEF6DF' }}>
      <div className="header">
        <div className="logo">LOGO</div>
        <div className="register">註冊</div>
      </div>
      <div className="navbar-container">
        <div className="navbar">首頁</div>
        <div className="navbar">
          <a href="./aboutus" style={{ textDecoration: 'none', color: 'black' }}>關於我們</a>
        </div>
        <div className="navbar-active">
          <a href="./article" style={{ textDecoration: 'none', color: '#366476' }}>環保文章</a>
        </div>
        <div className="navbar">環保競賽</div>
        <div className="navbar">環保捐款</div>
        <div className="navbar">小遊戲</div>
      </div>
    </div>
  );
};

export default Head;
