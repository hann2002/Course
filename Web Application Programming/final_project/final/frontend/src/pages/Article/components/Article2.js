import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import background from "../images/u_article2_background.jpg";
import u_article2_1 from "../images/u_article2_1.jpg";
import u_article2_2 from "../images/u_article2_2.jpg";
import u_article2_3 from "../images/u_article2_3.jpg";
import u_article2_4 from "../images/u_article2_4.jpg";
import u_article2_5 from "../images/u_article2_5.jpg";

const Article2 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/comments2')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addComment2 = () => {
    // Get the comment values
    const name = document.getElementById('name2').value;
    const comment = document.getElementById('comment2').value;
    // Create a new comment object
    const newComment = {
      name: name,
      comment: comment,
    };
    // Send the new comment to the server
    fetch('http://localhost:8000/comments2', {
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
        document.getElementById('name2').value = '';
        document.getElementById('comment2').value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className="back" style={{ backgroundImage: `url(${background})`, paddingTop: '25px', paddingBottom:'20px' }}>
        <link rel="stylesheet" href="./style.css" />
        <script src="myscript.js"></script>
        <main>
          <h2 style={{ fontSize: '45px' }} className="dot_line">
          環保杯該怎麼選?
          </h2>
          <section>
            <h3 style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'center' }}>
            減塑的意識越來越普及，多數人家裡都有環保杯，<br/>
            但不一定會常帶出門使用，導致所謂的「環保杯」無法達到環保的目的。<br/>
            環保杯要怎麼選才適合自己？市面上有哪些款式和材質可以挑？<br/>
            讓我們來告訴你！<br/>
            </h3>
            <div className="border_2">
              <p>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#f29c12' }}>使用飲料環保杯有哪些好處？臺灣現在有哪些環保杯政策？<br /><br /></span>
                &emsp;&emsp;購買飲料的時候，如果自備環保杯盛裝，除了兼顧衛生和環保的初衷、減少使用一次性容器和避免製造垃圾，其實還能省錢哦！
            您有發現嗎？現在自備環保杯在連鎖飲料店、便利商店、速食店和超市購買飲料，可以享有至少 5 元優惠！現行政策為消費者提供更高的減塑誘因。<br/><br/>
            &emsp;&emsp;這進展可回溯至 2017 年，綠色和平與在地公民團隊持續合作，偕同環保署成立「臺灣海廢治理平臺」，
            定期檢討減塑政策，並逐步催生出擴大限塑的目標，綠色和平也持續推動提高優惠、導入循環杯服務的訴求。
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={u_article2_1} className="picture_3" style={{ height: '250px', width: '400px' }} alt = ""/>
                  <img src={u_article2_2} className="picture_3" style={{ height: '250px', width: '400px' }} alt = ""/>
                </span>
              </p>
            </div>
            <br />
            <div className="border_2">
              <p>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#f29c12' }}>市面上的環保杯推薦嗎？有哪些地方要注意？<br/><br/></span>
                <br />
                <ul>
                  <li>
                    <strong style={{ color: '#0c891b' }}>適合喝珍珠奶茶：</strong>
                    <br />
                    <br />
                    大象杯、內建吸管的 ho-lim 飲料杯、不需吸管的 FLOAT 漂浮珍奶杯
                  </li>
                  <br />
                  <li>
                    <strong style={{ color: '#0c891b' }}>具保溫效果：</strong>
                    <br />
                    <br />
                    象印、Thermos 膳魔師、虎牌、HYDY
                  </li>
                  <br />
                  <li>
                    <strong style={{ color: '#0c891b' }}>透明可看見飲品漸層設計：</strong>
                    <br />
                    <br />
                    美國梅森玻璃杯、Tritan 雙層隨行杯
                  </li>
                  <br />
                  <li>
                    <strong style={{ color: '#0c891b' }}>運動族群愛用：</strong>
                    <br />
                    <br />
                    大容量的 KOR 水壺、喝高蛋白用的搖搖杯、輕便耐摔的不鏽鋼杯
                  </li>
                </ul>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={u_article2_3} className="picture_3" alt = ""/>
                  <img src={u_article2_4} className="picture_3" alt = ""/>
                  <img src={u_article2_5} className="picture_3" alt = ""/>
                </span>
              </p>
            </div>
            <h3 style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'center' }}>
            究竟要選哪一個比較好？除了考量美觀之外，<br/>
            也許找出適合您的環保杯，是落實減塑生活的第一步，<br/>
            畢竟杯子還是要常用且用得久，才能達到環保的目的。<br/>
            選購環保杯的時候，您可以注意這些事：
            </h3>
            <div className="border_2">
              <p>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#f29c12' }}>1. 環保杯容量大小<br/></span>
                <br />
                &emsp;&emsp;首先，環保杯的尺寸完全取決於您的使用情境和需求。可以試想您的杯子通常會裝多少容量？您需要的是可以裝大杯手搖飲約 700cc 的杯子？還是方便裝水的 250cc 小容量即可？您攜帶環保杯的袋子或包包裝得下嗎？如果您習慣在開車時喝飲料，您車上的置杯架寬度放得下多大的杯子？
                <br />
                <br />
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#f29c12' }}>2. 環保杯材質<br/></span>
                <br />
                &emsp;&emsp;市面上的環保杯百百種，材質更是多元，有玻璃、陶瓷、不鏽鋼、塑膠、矽膠、小麥等，玲瑯滿目讓您難以選擇嗎？也許可以從幾個重點考量：
                <li>
                  <strong>重量：</strong>
                  <br />
                  &emsp;&emsp;&emsp;&emsp;您願意拿多重的環保杯出門？玻璃、不鏽鋼屬於較重的材質。
                </li>
                <br />
                <li>
                  <strong>保溫：</strong>
                  <br />
                  &emsp;&emsp;&emsp;&emsp;您喝的飲品需要保溫功能嗎？不鏽鋼的保溫效果較好。
                </li>
                <br />
                <li>
                  <strong>堅固：</strong>
                  <br />
                  &emsp;&emsp;&emsp;&emsp;您常會不小心碰撞或摔落杯子嗎？
                </li>
                <br />
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src="images/u_article2_6.png" style={{ width: '100%' }} alt = ""/>
                </span>
                <br />
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#f29c12' }}>3. 清洗難易度</span>
                <br />
                &emsp;&emsp;環保杯是否容易清洗，實在是太重要了！如果杯子容易藏污納垢，或是清潔起來很麻煩，不僅對身體健康造成疑慮，也會降低使用意願。關於清洗環保杯的注意事項，以下為您整理出幾個重點：
                <br />
                <br />
                <li>杯口寬度足夠讓您伸手進去刷洗嗎？家裡有方便使用的洗杯刷嗎？</li><br/>
                <li>杯子的構造複雜嗎？可以拆開零件清洗嗎？</li><br/>
                <li>杯子的材質是否容易殘留味道或色素？</li><br/>
                <li>杯子的材質可否使用清潔劑清洗？</li>
              </p>
            </div>
            <div className="border_2">
              <p>
                <h3 style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'center', fontSize: '18px' }}>
                即使已經有一個完美的環保杯了，相信大家還是會有<br/>
                    想買飲料但杯子卻不在身邊的經驗，<br/>
                    不想使用一次性的杯子卻又好想喝飲料！<br/>
                    這時候該怎麼辦呢？<br/>
                </h3>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#f29c12' }}>忘記帶環保杯怎麼辦？循環杯是您的救急好幫手！<br/><br/></span>
                &emsp;&emsp;在綠色和平與多個在地團體的努力推動之下，終於促使環保署推出循環杯政策，零售通路業者也陸續推出循環杯方案。近年來有越來越多店家開始為消費者提供循環杯服務，例如麥當勞、肯德基、統一超商、星巴克、全家、摩斯漢堡、萊爾富、全聯等。<br/><br/>
              &emsp;&emsp;為了鼓勵更多業者導入循環杯系統，也有一致的管理標準可依循，環保署在 2022 年 10 月 31 日發布「循環（外借）杯良好服務指引」，針對材質及標示、借用及歸還、清洗、檢驗、環保理念溝通、良好服務標誌等 6 大面向，提供標準規範，更在同年 12 月 22 日推動「外借杯良好服務標誌」，方便民眾辨識符合標準、獲得認證的店家。<br/><br/>
              &emsp;&emsp;同時也計劃 2023 年起，全臺各便利商店、連鎖飲料店及速食店，須有至少 5% 門市提供循環杯借用服務，並且規定逐年增加門市比例，為消費者提供便利又環保的選擇。<br/>
              </p>
            </div>
          </section>
          <div
            style={{
              fontSize: '22px',
              fontWeight: '900',
              marginLeft: '8%',
              marginRight: '8%',
              border: '2px solid #0c891b',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            實踐環保並不困難，只要找到適合自己的工具和方式，都能在能力所及範圍內達成減塑目的。<br/>
        邀請您分享資訊給親友，也嘗試用「重複使用」的生活模式，一起為您我打造更乾淨、永續的家園。<br/>
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
        <div id="comment-section2" style={{ maxHeight: '150px', overflowY: 'scroll' }}>
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
          <input type="text" id="name2" name="name" placeholder="請輸入你想顯示的暱稱" style={{marginBottom: '1%'}} /><br />
          <label htmlFor="comment" style={{fontSize: '16px', fontWeight: 600}}>評論內容：</label><br />
          <textarea id="comment2" name="comment" placeholder="歡迎分享你對這部作品的想法和感受，但發表評論時，請避免使用不適當或冒犯性的語言，謝謝。" style={{marginBottom: '1%', height:'60px', width:'100%'}} defaultValue={""} /><br />
          <div style={{textAlign: 'center'}}>
          <button type="button" onClick={() => {addComment2();}} style={{fontSize: '16px', backgroundColor: '#5F9EA0', fontWeight: 600}}>發佈評論</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Article2;
