import React from 'react'
import './Main.css'



const Main = () => {
  return (
    <>
    <div className="main-content">
        <div className="about-us">
            <div className="who">
                <div id="who-title">我們是誰？</div>
                <div id="who-content">
                    <img height={"200px"} src="../../picture/kids.png" />
                    <p>Web APP 第5組</p>
                </div>
            </div>
            <div className="purpose">
                <div id="purpose-title">想做什麼？</div>
                <div id="purpose-content">
                    <img src="./pict/earth.png" />
                    <p>鼓勵大家去環保</p>
                </div>
            </div>
        </div>
        <div className="paragraphs">
            <img src="../../picture/sample1.jpeg" className="paragraph"></img>
            <img src="../../picture/sample2.png" className="paragraph"></img>
            <img src="../../picture/sample3.jpeg" className="paragraph"></img>
            <img src="../../picture/sample4.jpeg" className="paragraph"></img>
            <img src="../../picture/sample5.png" className="paragraph"></img>
        </div>
    </div>
    <div className="footer">
        <div className="top-footer">
            <div className="icons">
                <div href="#" className="fa fa-facebook"></div>
                <div href="#" className="fa fa-twitter"></div>
                <div href="#" className="fa fa-instagram"></div>
                <div href="#" className="fa fa-youtube"></div>
                <div href="#" className="fa fa-linkedin"></div>
            </div>
        </div>
        <div className="bot-footer">
            <p>2023, Web APP Team 5, All Rights Reserved</p>
            <p>Terms & Privacy</p>
        </div>
    </div>
    </>
  )
}

export default Main