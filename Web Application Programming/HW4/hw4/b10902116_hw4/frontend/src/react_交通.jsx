import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import "./css/hong.css";
export default function Tran(){
    const navigate = useNavigate();
    const [walk, setwalk] = useState('0');
    const [bike, setbike] = useState('0');
    const [pub, setpub] = useState('0');
    const [ID, setid] = useState('0');
    
    const walkchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000)){
            alert(`請輸入0~9999的數字`);
        }else {
            setwalk(e.target.value);
        }
    };
    const idchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setid(e.target.value);
    };
    const bikechange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setbike(e.target.value);
    };
    const pubchange = (e) => {
        if(!(Number(e.target.value) >= 0 && Number(e.target.value) < 10000))
            alert(`請輸入0~9999的數字`);
        else 
            setpub(e.target.value);
    };

    const handleSave = () => {
        const newuser = {
          "id": Number(ID),"plastic": 0,"meat": 0,"dish": 0,"trans": Number(walk)+Number(bike)+Number(pub)
        }
        fetch('http://localhost:8000/data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newuser)
        });
        navigate('/rank');
    };

    return(
        <div className="form-container" style={{backgroundImage:'url(./background/背景交通.PNG)'}}>
        <h3><b>
        <form onSubmit={handleSave}>
        <fieldset>
        <h2><b>減少交通碳排放</b></h2>
        <br />
        <div>
        <b><label>你的ID（0~9999）：</label></b>
        <input id="ID" onChange={idchange} />
        <br /><br />
        </div>
        <div>
        <b><label>走了多長的路（KM）：</label></b>
        <input id="walk" onChange={walkchange} />
        <br /><br />
        </div>
        <div>
        <b><label>騎多遠的單車（KM）：</label></b>
        <input id="bike" onChange={bikechange} />
        <br /><br />
        </div>
        <div>
        <b><label>搭乘大眾運輸（KM）：</label></b>
        <input id="pub" onChange={pubchange} />
        <br /><br />
        </div>
        <br />
        <button type="submit" className="form-button">提交今日環保成果</button>
        </fieldset>
        </form> 
        </b></h3></div>
    );
}