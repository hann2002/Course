import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Meat from "./react_肉.jsx";
import Tran from "./react_交通.jsx";
import Plastic from "./react_塑膠.jsx";
import Rank from "./react_排行.jsx";
import Dish from "./react_餐具.jsx";
import Race from "./react_比賽.jsx";
import "./css/hong.css";
class NavbarContainer extends React.Component{
    renderNavbar(name){
        return(
            <Navbar value={name} />
        );
    }
    render(){
        return (
            <div className="navbar-container">
                {this.renderNavbar('首頁')}
                {this.renderNavbar('關於我們')}
                {this.renderNavbar('環保文章')}
                <div className="navbar-active"><Link to="/race">環保競賽</Link></div>
                {this.renderNavbar('環保捐款')}
                {this.renderNavbar('碳排放計算機')}
            </div>
        );
    }
}
class Navbar extends React.Component{
    render(){
        return(
            <div className="navbar" 
                onMouseLeave={() => notmine(this.props.value)}>
                {this.props.value}
            </div>
        );
    }
}
function notmine(s) {
    alert("剛剛滑鼠停留的導覽列「" + s + "」要前往的頁面是其他組員負責的部分\n功能尚未完成！\n最終功能為點擊跳轉到另外一個頁面");
}
export default function Home() {
    return (
        <div>
            <NavbarContainer></NavbarContainer>
            <Routes>
                <Route path="/race" element={<Race />} />
                <Route path="/meat" element={<Meat />} />
                <Route path="/tran" element={<Tran />} />
                <Route path="/plastic" element={<Plastic />} />
                <Route path="/dish" element={<Dish />} />
                <Route path="/rank" element={<Rank />} />
            </Routes>
        </div>
    );
}