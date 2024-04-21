import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import background from "../images/u_article3_background.jpg";
import u_article3_1 from "../images/u_article3_1.png";
import u_article3_2 from "../images/u_article3_2.jpg";
import u_article3_3 from "../images/u_article3_3.jpg";
import u_article3_4 from "../images/u_article3_4.jpg";
import u_article3_5 from "../images/u_article3_5.jpg";
import u_article3_6 from "../images/u_article3_6.png";

const Article3 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/comments3')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addComment3 = () => {
    // Get the comment values
    const name = document.getElementById('name3').value;
    const comment = document.getElementById('comment3').value;
    // Create a new comment object
    const newComment = {
      name: name,
      comment: comment,
    };
    // Send the new comment to the server
    fetch('http://localhost:8000/comments3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the UI by adding the new comment to the state
        setComments([...comments, newComment]);
        // Clear the comment inputs
        document.getElementById('name3').value = '';
        document.getElementById('comment3').value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
    <div className="back" style={{ backgroundImage: `url(${background})` , paddingTop: '25px', paddingBottom:'20px'}}>
        <link rel="stylesheet" href="./style.css" />
      <script src="myscript.js"></script>
      <main>
        <h2 style={{ fontSize: '45px' }} className="dot_line">
        節能減碳好簡單
        </h2>
        <section>
          <h3 style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'center' }}>
          節能減碳是當前全球環境保護的重要方針之一。隨著經濟的發展和人口的增長，<br/>
            能源消耗和二氧化碳排放量也在不斷增加，加劇了全球氣候變化的威脅。<br/>
            為了減少對環境的不良影響，節能減碳已經成為全球共識。<br/>
          </h3>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#135ead' }}>1. 什麼是節能減碳<br /><br /></span>
              &emsp;&emsp;節能減碳是指通過減少能源的消耗，減少二氧化碳等溫室氣體的排放，以達到減少對環境影響的目的。節能減碳包括多個方面，例如改善建築能源效率、推廣節能照明和電氣產品、提高交通運輸效率、促進可再生能源的發展等。<br/><br/>
            &emsp;&emsp;節能減碳有著廣泛的應用，包括家庭、商業和工業領域。在家庭方面，我們可以通過更換節能燈泡、關閉未使用的電器、控制空調溫度等方式來實現節能減碳。在商業和工業領域，可以通過採用節能的生產設備、提高能源利用率、實行能源管理等方式實現節能減碳。
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article3_1} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
                <img src = {u_article3_2} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
              </span>
            </p>
          </div>
          <br />
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#135ead' }}>2. 為什麼需要節能減碳<br /><br /></span>
              &emsp;&emsp;節能減碳是因為現代化社會對能源的需求越來越大，能源消耗量和二氧化碳等溫室氣體排放量也在不斷增加，對環境造成了嚴重的威脅。大量二氧化碳等溫室氣體的排放導致全球氣溫上升，引發了極端氣候事件，如颶風、洪水、干旱和暴風雪等，對人類社會造成了嚴重的破壞。<br/><br/>
              &emsp;&emsp;另外，二氧化碳等溫室氣體的排放還對全球生態系統造成了嚴重的損害。由排放導致的氣候變化對生態系統的影響包括冰川消融、海平面上升、珊瑚礁死亡等，進而影響海洋生態系統、森林生態系統和陸地生態系統的平衡。因此，為了保護環境、維護生態平衡，實現節能減碳是非常必要的。
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article3_3} className="picture_3" alt=""/>
                <img src = {u_article3_4} className="picture_3" alt=""/>
                <img src = {u_article3_5} className="picture_3" alt=""/>
              </span>
            </p>
          </div>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#135ead' }}>3. 如何實現節能減碳<br /><br /></span>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#0f7b4c' }}>(一)、提高建築能源效率<br /><br /></span>
              &emsp;&emsp;建築業是能源消耗和碳排放的重要領域之一。因此，在建築設計和建造過程中應該注意節能減碳。例如，通過改善建築隔熱材料、控制室內照明和空調的使用等方式，提高建築能源效率。<br/><br/>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#0f7b4c' }}>(二)、推廣節能照明和電氣產品<br /><br /></span>
              &emsp;&emsp;節能燈泡、太陽能燈、節能插座等節能電器產品都可以減少能源的消耗和二氧化碳等溫室氣體的排放。因此，推廣節能照明和電氣產品是實現節能減碳的一個重要措施。<br/><br/>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#0f7b4c' }}>(三)、提高交通運輸效率<br /><br /></span>
              &emsp;&emsp;交通運輸是全球能源消耗和二氧化碳等溫室氣體排放的重要來源之一。因此，提高交通運輸效率可以減少能源的消耗和二氧化碳等溫室氣體的排放。例如，推廣公共交通、鼓勵共享單車和汽車等，都可以有效地降低交通運輸對環境的影響。<br/><br/>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#0f7b4c' }}>(四)、促進可再生能源的發展<br /><br /></span>
              &emsp;&emsp;可再生能源是指不會枯竭且能夠再生的能源，如太陽能、風能、水能等。因此，促進可再生能源的發展可以減少對有限資源的依賴，同時減少二氧化碳等溫室氣體的排放。<br/><br/>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#0f7b4c' }}>(五)、實行能源管理<br /><br /></span>
              &emsp;&emsp;能源管理是指通過科學的方法對能源進行管理，以實現節能減碳的目的。能源管理可以包括能源使用監測、節能減排技術的應用和節能減碳相關的其他技術和措施。通過能源管理，可以更好地掌握能源的使用情況，更加有效地實現節能減碳。<br/><br/>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#0f7b4c' }}>(六)、提高人們的環保意識<br /><br /></span>
              &emsp;&emsp;提高人們的環保意識是實現節能減碳的重要前提。透過加強環保教育、推廣環保產品和服務、鼓勵人們參與環保活動等方式，可以促進人們的環保意識的提高，進而推動節能減碳。<br/><br/>
            </p>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
              <img src = {u_article3_6} style={{ width: '100%' }} alt=""/>
            </span>
          </div>
          <br />
        </section>
        <div style={{ fontSize: '22px', fontWeight: '900', marginLeft: '8%', marginRight: '8%', border: '2px solid #135ead', borderRadius: '10px', padding: '10px' }}>
        透過加強技術研發、推廣節能減碳產品和服務、提高人們的環保意識等方式，進而推動綠色發展。
        在未來的發展中，繼續加強節能減碳相關工作，將是我們每個人都應該承擔的社會責任。
        </div>
      </main>
      <footer style={{ textAlign: 'center', fontSize: '20px' }}>
        <div style={{ padding: '1%' }}>
        <Link to="/" className="last_page">回上一頁</Link>
        </div>
      </footer>
    </div>
    <div style={{paddingTop:'15px', paddingBottom:'50px', backgroundColor: '#CCE5FF'}}>
      <h3 style={{marginTop:'20px', marginBottom:'30px', textAlign:'center' }}><b> — 評論區 —</b></h3>
      <div className="border_3">
        <div id="comment-section3" style={{ maxHeight: '150px', overflowY: 'scroll' }}>
          {comments.map((comment, index) => (
            <div className="comment-box" key={index}>
              <span style={{ color: '#4682B4', fontSize: '20px', fontWeight: 800 }}>暱稱：</span>
              <span style={{ fontWeight: 700, fontSize: '20px', color: '#003333' }}>{comment.name}</span>
              &emsp;&emsp;
              <span style={{ color: '#2f45d6', fontSize: '20px', fontWeight: 800 }}>{comment.date}</span>
              <br /><br />
              <span style={{ letterSpacing: '1px', fontSize: '16px' }}>{comment.comment}</span>
            </div>
          ))}
        </div>
        <form>
        <label htmlFor="name" style={{fontSize: '16px', fontWeight: 600}}>名稱：</label><br />
          <input type="text" id="name3" name="name" placeholder="請輸入你想顯示的暱稱" style={{marginBottom: '1%'}} /><br />
          <label htmlFor="comment" style={{fontSize: '16px', fontWeight: 600}}>評論內容：</label><br />
          <textarea id="comment3" name="comment" placeholder="歡迎分享你對這部作品的想法和感受，但發表評論時，請避免使用不適當或冒犯性的語言，謝謝。" style={{marginBottom: '1%', height:'60px', width:'100%'}} defaultValue={""} /><br />
          <div style={{textAlign: 'center'}}>
          <button type="button" onClick={() => {addComment3();}} style={{fontSize: '16px', backgroundColor: '#5F9EA0', fontWeight: 600}}>發佈評論</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Article3;
