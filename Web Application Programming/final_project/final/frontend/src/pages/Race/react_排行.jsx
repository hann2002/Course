import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/hong.css";
import { useAuth } from '../../useAuth';
import axios from 'axios';
export default function Rank(){
    const {loggedIn} = useAuth();
    const navigate = useNavigate();
    const [rank, setrank] = useState({"plastic_rank": 0,"plastic_num": 0, "meat_rank": 0, "meat_num": 0, "dish_rank": 0,"dish_num":0, "trans_rank": 0, "trans_num": 0});
    const [three, setthree] = useState(Array(12).fill({ id: "", num: 0 }));
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/getrank/${loggedIn}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });

            const result = await response.json();
            setrank(result);
        } catch (error) {console.log(error)}
        
        try {
            const response = await fetch('http://localhost:8000/users/three');
            const result = await response.json();
            setthree(result);
        } catch (error) {console.log(error)}
    };
    useEffect(() => {
        if(loggedIn) fetchData();
        else{
            alert('您已登出，請重新登入帳號');
            navigate('/account');
        } 
    }, []);
    return(
        <div style={{marginBottom:'20px'}}>
        <img className="row-pic" src={require("./圖片1.png")} alt="排行榜"/>
        <div className="four-container" id="你的排名">
            <div className="whitebox" id="div0" style={{backgroundImage: `url(${require('./background/暗餐具.jpg')})`}}>
            <h1 id="rank0" style={{marginTop:'20px'}}>第{rank["dish_rank"]}名</h1>
            <h4 id="field0">節省免洗餐具餐盒</h4>
            <h6 id="diff0">離上一名差{rank["dish_num"]?.toFixed(0)}個</h6>
            </div>
            <div className="whitebox" id="div1" style={{backgroundImage: `url(${require('./background/暗塑膠.jpg')})`}}>
            <h1 id="rank1" style={{marginTop:'20px'}}>第{rank["plastic_rank"]}名</h1>
            <h4 id="field1">節省塑膠製品</h4>
            <h6 id="diff1">離上一名差{rank["plastic_num"]?.toFixed(0)}個</h6>
            </div>
            <div className="whitebox" id="div2" style={{backgroundImage: `url(${require('./background/暗肉.jpg')})`}}>
            <h1 id="rank2" style={{marginTop:'20px'}}>第{rank["meat_rank"]}名</h1>
            <h4 id="field2">減少肉食碳排放</h4>
            <h6 id="diff2">離上一名差{rank["meat_num"]?.toFixed(1)}KG</h6>
            </div>
            <div className="whitebox" id="div3" style={{backgroundImage: `url(${require('./background/暗交通.jpg')})`}}>
            <h1 id="rank3" style={{marginTop:'20px'}}>第{rank["trans_rank"]}名</h1>
            <h4 id="field3">減少交通碳排放</h4>
            <h6 id="diff3">離上一名差{rank["trans_num"]?.toFixed(1)}KG</h6>
            </div>
        </div>
        <img className="row-pic" src={require("./寬排行榜.jpg")} alt="排行榜"/>
        <div className="four-container" id="環保排行榜">
            <div className="blackbox" style={{padding:'5px'}}>
            <h3><b>節省免洗餐具餐盒</b></h3>
            <img src={require("./picture/技巧餐具.jpg")} id="img4" alt="砍竹子圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{three[0]["id"]} ({three[0]["num"]?.toFixed(0)}個)</h4>
            <h4>第二名：{three[1]["id"]} ({three[1]["num"]?.toFixed(0)}個)</h4>
            <h4>第三名：{three[2]["id"]} ({three[2]["num"]?.toFixed(0)}個)</h4>
            </div>
            <div className="blackbox"  style={{padding:'5px'}}>
            <h3><b>節省塑膠製品</b></h3>
            <img src={require("./picture/技巧塑膠.jpg")} id="img5" alt="海中塑膠袋圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{three[3]["id"]} ({three[3]["num"]?.toFixed(0)}個)</h4>
            <h4>第二名：{three[4]["id"]} ({three[4]["num"]?.toFixed(0)}個)</h4>
            <h4>第三名：{three[5]["id"]} ({three[5]["num"]?.toFixed(0)}個)</h4>
            </div>
            <div className="blackbox" style={{padding:'5px'}}>
            <h3><b>減少肉食碳排放</b></h3>
            <img src={require("./picture/技巧肉.jpg")} id="img6" alt="養雞場圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{three[6]["id"]} ({three[6]["num"]?.toFixed(1)}KG)</h4>
            <h4>第二名：{three[7]["id"]} ({three[7]["num"]?.toFixed(1)}KG)</h4>
            <h4>第三名：{three[8]["id"]} ({three[8]["num"]?.toFixed(1)}KG)</h4>
            </div>
            <div className="blackbox" style={{padding:'5px'}}>
            <h3><b>減少交通碳排放</b></h3>
            <img src={require("./picture/技巧交通.jpg")} id="img7" alt="輕軌圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{three[9]["id"]} ({three[9]["num"]?.toFixed(1)}KG)</h4>
            <h4>第二名：{three[10]["id"]} ({three[10]["num"]?.toFixed(1)}KG)</h4>
            <h4>第三名：{three[11]["id"]} ({three[11]["num"]?.toFixed(1)}KG)</h4>
            </div>
        </div>
        </div>
    );
}
