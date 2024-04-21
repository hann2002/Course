import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./css/hong.css";

class Entran extends React.Component{
    render(){
        return(
        <div style={{marginBottom:'20px'}}>
        <img className="row-pic" src={require("./picture/比賽.jpg")} alt="比賽"/>
        <div className="four-container">
            <div className="blackbox">
                <Link to="/dish">
                <img src={require("./picture/餐具.jpg")} alt="砍竹子圖片" style={{width:'100%'}} />
                <h3 style={{marginTop:'15px'}}>節省免洗餐具餐盒</h3>
                </Link>
                <p>記錄每天省下的免洗餐具、餐盒數量</p>
            </div>
            <div className="blackbox">
                <Link to="/plastic">
                <img src={require("./picture/塑膠袋.jfif")} alt="海中塑膠袋圖片" style={{width:'100%'}} />
                <h3 style={{marginTop:'15px'}}>節省塑膠製品</h3>
                </Link>
                <p>記錄每天省下的塑膠製品數量</p>
            </div>
            <div className="blackbox">
                <Link to="/meat">
                <img src={require("./picture/肉.jfif")} alt="養雞場圖片" style={{width:'100%'}} />
                <h3 style={{marginTop:'15px'}}>減少肉食碳排放</h3>
                </Link>
                <p>紀錄每日肉食減少量</p>
            </div>
            <div className="blackbox">
                <Link to="/tran">
                <img src={require("./picture/交通.jpg")} alt="輕軌圖片" style={{width:'100%'}} />
                <h3 style={{marginTop:'15px'}}>減少交通碳排放</h3>
                </Link>
                <p>紀錄走路、騎腳踏車、搭乘大眾運輸</p>
            </div>
        </div></div>     
        );
    }
}
export default function Race() {
    const [rank, setrank] = useState({"id":0, "plastic": 0,"meat": 0,"dish": 0,"trans": 0});
    useEffect(() => {
        fetch('http://localhost:8000/users/sum', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {console.log('Success: ', response); setrank(response);})
        .catch(error => console.error('Error: ', error));
    }, []);
    return (
        <div>
        <div>
            <img className="row-pic" src={require("./picture/成果.png")} alt="成果"/>
            <div className="four-container">
            <div className="whitebox"  
                style={{backgroundImage:`url(${require('./background/暗餐具.jpg')}`}}>
            <h1 style={{marginTop:'20px', marginBottom:'20px'}}>{rank["dish"].toFixed(0)}個</h1>
            <h3 style={{marginBottom:'20px'}}>節省免洗餐具餐盒</h3>
            </div>
            <div className="whitebox"  
                style={{backgroundImage:`url(${require('./background/暗塑膠.jpg')}`}}>
            <h1 style={{marginTop:'20px', marginBottom:'20px'}}>{rank["plastic"].toFixed(0)}個</h1>
            <h3 style={{marginBottom:'20px'}}>節省塑膠製品</h3>
            </div>
            <div className="whitebox"  
                style={{backgroundImage:`url(${require('./background/暗肉.jpg')}`}}>
            <h1 style={{marginTop:'20px', marginBottom:'20px'}}>{rank["meat"].toFixed(1)}KG</h1>
            <h3 style={{marginBottom:'20px'}}>減少肉食碳排放</h3>
            </div>
            <div className="whitebox"  
                style={{backgroundImage:`url(${require('./background/暗交通.jpg')}`}}>
            <h1 style={{marginTop:'20px', marginBottom:'20px'}}>{rank["trans"].toFixed(1)}KG</h1>
            <h3 style={{marginBottom:'20px'}}>減少交通碳排放</h3>
            </div>
            </div>     
            </div>     
            <Entran />
        </div>
    );
}