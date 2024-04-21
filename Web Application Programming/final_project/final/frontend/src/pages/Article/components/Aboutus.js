import React from 'react';
import img1 from "../images/tsai_2.jpg";
import img2 from "../images/mao.jpg";
import img3 from "../images/chi.jpg";
import img4 from "../images/coco.jpg";
import img5 from "../images/jason.jpg";


const Aboutus = () => {
  return (
    <div style={{ background: 'linear-gradient(#EEF6DF, #CDE6C7, #A3CCD0)' , paddingTop: '30px'}}>
      <div className="border_6">
        <h5 className="introduction">團隊介紹</h5>
        <div className="team">
          <p style={{ fontSize: '20px' }}>
            我們是一群台灣大學的學生，因為關注環保而在這次專案中合作，希望透過這個網站提高大眾對環保議題的認識和參與度，並提供相關的知識和資源，鼓勵大家一起行動，一起為地球盡一份心力。<br />
            我們致力於提供正確、實用的環保資訊，並用有趣的互動方式推廣環保生活，希望能夠讓環保成為一種習慣、生活態度。如果有任何疑問或合作意願，請隨時與我們聯繫。
          </p>
        </div>
      </div>
      <div className="container_1">
        <h5 className="introduction" style={{marginBottom:'40px'}}>成員介紹</h5>
        <div className="member">
          <img src = {img1} alt="成員照片"/>
          <div className="intro" style={{ fontSize: '20px' }}>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>姓名：</span>蔡漢錩
            </p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>學歷：</span>台灣大學會計學系
            </p>
            <p>目前就讀會計學系四年級，在這次專案製作中，主要是負責帳號註冊與環保捐款的功能。</p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>聯絡方式：</span>b07303047@ntu.edu.tw
            </p>
          </div>
        </div>
        <div className="member">
          <img src = {img2} alt="成員照片"/>
          <div className="intro" style={{ fontSize: '20px' }}>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>姓名：</span>毛翊蓁
            </p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>學歷：</span>台灣大學資訊工程學系
            </p>
            <p>目前就讀資訊工程學系二年級，在這次專案製作中，主要是負責環保知識小遊戲的遊戲介面設計以及前後端的串接。</p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>聯絡方式：</span>b10902103@ntu.edu.tw
            </p>
          </div>
        </div>
        <div className="member">
          <img src = {img3} alt="成員照片"/>
          <div className="intro" style={{ fontSize: '20px' }}>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>姓名：</span>陳儷其
            </p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>學歷：</span>台灣大學資訊工程學系
            </p>
            <p>目前就讀資訊工程學系二年級，在這次專案製作中，主要是負責文章、留言版功能以及前後端的串接。</p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>聯絡方式：</span>b10902073@ntu.edu.tw
            </p>
          </div>
        </div>
        <div className="member">
          <img src = {img4} alt="成員照片"/>
          <div className="intro" style={{ fontSize: '20px' }}>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>姓名：</span>洪子涵
            </p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>學歷：</span>台灣大學資訊工程學系
            </p>
            <p>目前就讀資訊工程學系二年級，在這次專案製作中，負責環保競賽介面與功能設計以及前後端的串接。</p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>聯絡方式：</span>b10902116@ntu.edu.tw
            </p>
          </div>
        </div>
        <div className="member">
          <img src = {img5} alt="成員照片"/>
          <div className="intro" style={{ fontSize: '20px' }}>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>姓名：</span>王錦盛
            </p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>學歷：</span>台灣大學電機工程學系
            </p>
            <p>目前就讀電機工程學碩一，在這次專案製作中，負責寫後端以及串接 API。</p>
            <p>
              <span style={{ fontWeight: '700', color: '#517ab0' }}>聯絡方式：</span>r11921108@ntu.edu.tw
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
