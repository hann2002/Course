import "./Register_form.css"

import man_icon from "../../../picture/user.png";
import React, { useState } from "react";
import Input_set from "./Input_set";
import axios from "axios";
import Chooseinvoice from "./Chooseinvoice";
import donationTeamImg from "../../../picture/donation_team.png";



const Register_form = ({ onSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_again, setPassword_again] = useState("");
    const [num, setnum] = useState("");
    


    const Name = "使用者名稱";
    const Email = "信箱帳號";
    const Password = "密碼";
    const Password_again = "驗證密碼";
    const Num = "電話號碼";
    const password_type = "password";
    const text_type = "text";

    const handleSubmit = async (event) => {
      event.preventDefault();      

      if (password !== password_again) {
        alert('Password and confirm password do not match!');
        return;
      }
      
      const requestOptions = {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password, password_again, num})
      };
      try {
        const response = await fetch(`http://127.0.0.1:8000/register`, requestOptions);
        if (!response.ok) { // 如果 HTTP 狀態碼不在 200-299 範圍內，表示出現錯誤
          alert(`Account has been used!`); // 你可以使用你自己的錯誤處理機制，這裡只是一個簡單的示例
          return;
        }
        const responseData = await response.json();
        console.log(responseData);
        const newuser = {
          id: name, plastic: 0, meat: 0, dish: 0, trans: 0
        }
        const fetchData = async () => {
            try {
                await axios.post('http://localhost:8000/users', newuser)
            } catch (error) {alert('create race_user error')}
        };
        fetchData();
        onSuccess();
      } catch (error) {
        alert('Account has been used!');
        return;
      }
    };
    

    return ( 
      <div style={{display: "flex", flexDirection: "column", width:"100%", minHeight:"500px", marginBottom:'40px'}}>
        <form className="Form_profile" onSubmit={handleSubmit} acceptCharset="UTF-8">
            <Input_set Text={Name} Icon = {man_icon} accepted = {name} API = {setName} Type = {text_type}/>
            <Input_set Text={Email} Icon = {man_icon} accepted = {email} API = {setEmail} Type = {text_type}/>
            <Input_set Text={Password} Icon = {man_icon} accepted = {password} API = {setPassword} Type = {password_type}/>
            <Input_set Text={Password_again} Icon = {man_icon} accepted = {password_again} API = {setPassword_again}  Type = {password_type}/>
            <Input_set Text={Num} Icon = {man_icon} accepted = {num} API = {setnum} Type = {text_type}/>
            <button type="submit" onClick={handleSubmit} style={{height:"55px", marginTop:'50px', fontSize:"27.5px"}}>Submit</button >
        </form>
      </div>
      );
      
  };  
export default Register_form;