import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./css/hong.css";

class Entran extends React.Component{
    render(){
        return(
        <div>
        <img className="row-pic" src={"./picture/比賽.jpg"} alt="比賽" />
        <div className="four-container">
            <div className="blackbox">
                <Link to="/dish">
                <img src="./picture/餐具.jpg" alt="砍竹子圖片" style={{width:'100%'}} />
                <h3>節省免洗餐具餐盒</h3>
                </Link>
                <p>記錄每天省下的免洗餐具、餐盒數量</p>
            </div>
            <div className="blackbox">
                <Link to="/plastic">
                <img src="./picture/塑膠袋.jfif" alt="海中塑膠袋圖片" style={{width:'100%'}} />
                <h3>節省塑膠製品</h3>
                </Link>
                <p>記錄每天省下的塑膠製品數量</p>
            </div>
            <div className="blackbox">
                <Link to="/meat">
                <img src="./picture/肉.jfif" alt="養雞場圖片" style={{width:'100%'}} />
                <h3>減少肉食碳排放</h3>
                </Link>
                <p>紀錄每日肉食減少量</p>
            </div>
            <div className="blackbox">
                <Link to="/tran">
                <img src="./picture/交通.jpg" alt="輕軌圖片" style={{width:'100%'}} />
                <h3>減少交通碳排放</h3>
                </Link>
                <p>紀錄走路、騎腳踏車、搭乘大眾運輸</p>
            </div>
        </div></div>     
        );
    }
}
class Footer extends React.Component{
    render(){
        return(
            <div className="hong-footer">
                <div>
                <p>2023, Web APP Team 5, All Rights Reserved</p>
                <p>Terms & Privacy</p>
                </div>
            </div>
        );
    }
}
export default function Race() {
    const [rank, setrank] = useState({"plastic": [[0,0],[0,0],[0,0],[0,0],[0,0]],"meat": [[0,0],[0,0],[0,0],[0,0],[0,0]],"dish": [[0,0],[0,0],[0,0],[0,0],[0,0]],"trans": [[0,0],[0,0],[0,0],[0,0],[0,0]]});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/data');
                if (!response.ok) alert('Failed to fetch data from server');
                const result = await response.json();
                setrank(result);
            } catch (error) {alert('fetch error')}
        };
        fetchData();
    }, []);
    return (
        <div>
        <div>
            <img className="row-pic" src={"./picture/成果.jpg"} alt="成果" />
            <div className="four-container">
            <div className="whitebox"  
                style={{backgroundImage:'url(./background/暗餐具.jpg)'}}>
            <h1 style={{marginTop:'20px'}}>{rank["dish"][4]}個</h1>
            <h3 style={{marginBottom:'20px'}}>節省免洗餐具餐盒</h3>
            </div>
            <div className="whitebox"  
                style={{backgroundImage:'url(./background/暗塑膠.jpg)'}}>
            <h1 style={{marginTop:'20px'}}>{rank["plastic"][4]}個</h1>
            <h3 style={{marginBottom:'20px'}}>節省塑膠製品</h3>
            </div>
            <div className="whitebox"  
                style={{backgroundImage:'url(./background/暗肉.jpg)'}}>
            <h1 style={{marginTop:'20px'}}>{rank["meat"][4]}KG</h1>
            <h3 style={{marginBottom:'20px'}}>減少肉食碳排放</h3>
            </div>
            <div className="whitebox"  
                style={{backgroundImage:'url(./background/暗交通.jpg)'}}>
            <h1 style={{marginTop:'20px'}}>{rank["trans"][4]}KM</h1>
            <h3 style={{marginBottom:'20px'}}>減少交通碳排放</h3>
            </div>
            </div>     
            </div>     
            <Entran />
            <Footer />
        </div>
    );
}