import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/hong.css";
import { useAuth } from '../../useAuth';
import axios from 'axios';

const background_image = require('./background/背景餐具.png')
export default function Dish(){
    const navigate = useNavigate();
    const {loggedIn} = useAuth();
    const [a, seta] = useState('0');
    const [b, setb] = useState('0');
    const [c, setc] = useState('0');
    const [d, setd] = useState('0');
    const achange = (e) => seta(e.target.value);
    const bchange = (e) => setb(e.target.value);
    const cchange = (e) => setc(e.target.value);
    const dchange = (e) => setd(e.target.value);
    const handleSave = (e) => {
        e.preventDefault();
        if(loggedIn === ''){
            alert("請先登入網站");
            navigate('/account');
        }else if(!(Number(a) >= 0 && Number(a) < 1000) || (parseInt(a) < a)){
            alert(`「節省免洗筷數量」欄位請輸入0~999的整數`);
        }else if(!(Number(b) >= 0 && Number(b) < 1000) || (parseInt(b) < b)){
            alert(`「節省塑膠匙數量」欄位請輸入0~999的整數`);
        }else if(!(Number(c) >= 0 && Number(c) < 1000) || (parseInt(c) < c)){
            alert(`「節省塑膠碗數量」欄位請輸入0~999的整數`);
        }else if(!(Number(d) >= 0 && Number(d) < 1000) || (parseInt(d) < d)){
            alert(`「節省紙餐盒數量」欄位請輸入0~999的整數`);
        }else{
            if(a.length == 0) seta("0");
            if(b.length == 0) setb("0");
            if(c.length == 0) setc("0");
            if(d.length == 0) setd("0");
            const newuser = {
                id: loggedIn,plastic: 0,meat: 0,dish: Number(a)+Number(b)+Number(c)+Number(d),trans: 0
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
        <div className="form-container" style={{ backgroundImage:`url(${background_image})`, backgroundSize:'100% 100%'}}>
        <h3><b>
        <form onSubmit={handleSave} style={{paddingTop:'30px', paddingBottom:'60px'}}>
        <fieldset>
        <h1><b>節省免洗餐具、餐盒</b></h1>
        <br /><br />
        <div>
        <b><label>節省免洗筷數量（雙）：</label></b>
        <input id="a" onChange={achange} />
        <br /><br />
        </div>
        <div>
        <b><label>節省塑膠匙數量（個）：</label></b>
        <input id="b" onChange={bchange} />
        <br /><br />
        </div>
        <div>
        <b><label>節省塑膠碗數量（個）：</label></b>
        <input id="c" onChange={cchange} />
        <br /><br />
        </div>
        <div>
        <b><label>節省紙餐盒數（個）：</label></b>
        <input id="d" onChange={dchange} />
        <br /><br />
        </div>
        <br /><br />
        <button type="submit" className="form-button">提交今日環保成果</button>
        </fieldset>
        </form> 
        </b></h3></div>
    );
}