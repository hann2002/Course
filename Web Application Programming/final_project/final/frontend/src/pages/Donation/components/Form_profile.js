import "./Form_profile.css"
import man_icon from "../../../picture/user.png";
import React, { useState, useRef, useContext, useEffect} from "react";
import Input_set from "./Input_set";
import Chooseinvoice from "./Chooseinvoice";
import { useAuth } from "../../../useAuth";




const Form_profile = ({GO_Click, money_index}) => {
    const [surname, setName] = useState("");
    const [given_name, setgiveName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNum] = useState("");
    const [birth, setBirth] = useState("");
    const [selection, setSelection] = useState("");
    const { loggedIn, setLoggedIn } = useAuth();

    useEffect(() => {
      if (loggedIn !== "") {
        fetch(`http://localhost:8000/user/${loggedIn}`)
          .then(response => response.json())
          .then(data => {
            setName(data.Account.charAt(0));
            setgiveName(data.Account.slice(1));
            setEmail(data.Email);
            setNum(data.Number);
          })
          .catch(error => console.error(error));
      } else {
        ;
      }
    }, [loggedIn]);
    
    


    const Name_1 = "姓";
    const Name_2 = "名";
    const Email = "信箱";
    const Num = "電話";
    const Birth = "生日"

    const handleSelectionChange = (event) => {
      setSelection(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();      
      const requestOptions = {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({surname, given_name, email, number, money_index})
        
      };
      try {
        const response = await fetch(`http://0.0.0.0:8000/donate`, requestOptions);
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    const handleButtonClick = (event) => {
      handleSubmit(event);
      GO_Click();
    };
    return (
      <div style={{display: "flex", flexDirection: "column", width:"100%", height:"100%"}}>
        <form  className="Form_profile" onSubmit={handleSubmit} acceptCharset="UTF-8" style={{backgroundColor:"rgb(245, 245, 245)"}}>
            <div>
                <h3>捐款基本資料</h3>
            </div>
            <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Input_set Text={Name_1} Icon = {man_icon} accepted = {surname} API = {setName}/>
                <Input_set Text={Name_2} Icon = {man_icon} accepted = {given_name} API = {setgiveName}/>  
                </div>

            </div>
            
            <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Input_set Text={Email} Icon = {man_icon} accepted = {email} API = {setEmail}/>
                <Input_set Text={Num} Icon = {man_icon} accepted = {number} API = {setNum}/>  
            </div>
            </div>
            <label htmlFor="date">{Birth}</label>
            <input
              type="date"
              id={Birth}
              name={Birth}
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
            <div>
                <h3>收據寄發方式</h3>
            </div>
            <Chooseinvoice Option="ans" accepted = "Option1"  Text = "直接上傳至國稅局，由我們替您代辦稅捐事務" API={handleSelectionChange}/>
            <Chooseinvoice Option="ans" accepted = "Option2" Text = "開立三聯式發票，並在捐款後第七天寄發給您" API={handleSelectionChange}/>
            <Chooseinvoice Option="ans" accepted = "Option3" Text = "捐出發票" API={handleSelectionChange}/>
        </form>
        <div>
            <button type="submit" onClick={handleButtonClick}>Submit</button>
        </div>
      </div>
    );
  };  
export default Form_profile;