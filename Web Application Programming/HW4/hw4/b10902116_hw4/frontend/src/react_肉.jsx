import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import "./css/hong.css";
export default function Meat(){
    const navigate = useNavigate();
    const [ID, setid] = useState('0');
    const [a, seta] = useState('0');
    const [b, setb] = useState('0');
    const [c, setc] = useState('0');
    const [d, setd] = useState('0');
    const [f, setf] = useState('0');
    const achange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000)){
            alert(`請輸入0~9999的數字`);
        }else {
            seta(e.target.value);
        }
    };
    const idchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setid(e.target.value);
    };
    const bchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setb(e.target.value);
    };
    const cchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setc(e.target.value);
    };
    const dchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setd(e.target.value);
    };
    const fchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setf(e.target.value);
    };
    const handleSave = () => {
        const newuser = {
          "id": Number(ID),"plastic": 0,"meat": Number(a)+Number(b)+Number(c)+Number(d)+Number(f),"dish": 0,"trans": 0
        }
        fetch('http://localhost:8000/data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newuser)
        });
        navigate('/rank');
    };

    
    return(
        <div className="form-container" style={{backgroundImage:"url(./background/背景肉.PNG)"}}>
        <h3><b>
        <form onSubmit={handleSave}>
        <fieldset>
        <h2><b>減少肉食碳排放</b></h2>
        <br />
        <div>
        <b><label>你的ID（0~9999）：</label></b>
        <input id="ID" onChange={idchange} />
        <br /><br />
        </div>
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
        <br />
        <button type="submit" className="form-button">提交今日環保成果</button>
        </fieldset>
        </form> 
        </b></h3></div>
    );
}
