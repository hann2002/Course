import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import "./css/hong.css";
import { useAuth } from '../../useAuth';
import axios from "axios";
const background_image = require('./background/背景肉.PNG')
export default function Meat(){
    const navigate = useNavigate();
    const {loggedIn} = useAuth();
    const [a, seta] = useState('0');
    const [b, setb] = useState('0');
    const [c, setc] = useState('0');
    const [d, setd] = useState('0');
    const [f, setf] = useState('0');
    const achange = (e) => seta(e.target.value);
    const bchange = (e) => setb(e.target.value);
    const cchange = (e) => setc(e.target.value);
    const dchange = (e) => setd(e.target.value);
    const fchange = (e) => setf(e.target.value);
    const handleSave = (e) => {
        e.preventDefault();
        if(loggedIn === ''){
            alert("請先登入網站");
            navigate('/account');
        }else if(!(Number(a) >= 0 && Number(a) < 1000) ){
            alert(`「少吃多少牛肉」欄位請輸入0~999的數字`);
        }else if(!(Number(b) >= 0 && Number(b) < 1000)){
            alert(`「少吃多少豬肉」欄位請輸入0~999的數字`);
        }else if(!(Number(c) >= 0 && Number(c) < 1000)){
            alert(`「少吃多少雞肉」欄位請輸入0~999的數字`);
        }else if(!(Number(d) >= 0 && Number(d) < 1000)){
            alert(`「少吃多少羊肉」欄位請輸入0~999的數字`);
        }else if(!(Number(f) >= 0 && Number(f) < 1000)){
            alert(`「少吃多少魚肉」欄位請輸入0~999的數字`);
        }else{
            if(a === "") seta("0");
            if(b === "") setb("0");
            if(c === "") setc("0");
            if(d === "") setd("0");
            if(f === "") setf("0");
            const newuser = {
                id: loggedIn,plastic: 0,meat: 60*Number(a)+7*Number(b)+6*Number(c)+24*Number(d)+5*Number(f),dish: 0,trans: 0
            }
            
            const fetchData = async () => {
                try {
                    const {data} = await axios.post('http://localhost:8000/users',newuser)
                    if(data.id === ""){
                        alert("使用者名稱錯誤\n找不到您的帳號，請檢查輸入是否正確。\n若尚未註冊，請點擊上方註冊按鈕。");
                    }else navigate('/rank');
                } catch (error) {alert('fetch error')}
            };
            fetchData();
        }
    };
    return(
        <div className="form-container" style={{backgroundImage:`url(${background_image})`, backgroundSize:'100% 100%'}}>
        <h3><b>
        <form onSubmit={handleSave} style={{paddingTop:'50px', paddingBottom:'60px'}}>
        <fieldset>
        <h1><b>減少肉食碳排放</b></h1>
        <br /><br />
        <div>
        <b><label>少吃多少牛肉（KG）：</label></b>
        <input id="a" onChange={achange} />
        <br /><br />
        </div>
        <div>
        <b><label>少吃多少豬肉（KG）：</label></b>
        <input id="b" onChange={bchange} />
        <br /><br />
        </div>
        <div>
        <b><label>少吃多少雞肉（KG）：</label></b>
        <input id="c" onChange={cchange} />
        <br /><br />
        </div>
        <div>
        <b><label>少吃多少羊肉（KG）：</label></b>
        <input id="d" onChange={dchange} />
        <br /><br />
        </div>
        <div>
        <b><label>少吃多少魚肉（KG）：</label></b>
        <input id="f" onChange={fchange} />
        <br /><br />
        </div>
        <br /><br />
        <button type="submit" className="form-button">提交今日環保成果</button>
        </fieldset>
        </form> 
        </b></h3></div>
    );
}
