import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import background from "../images/u_article6_background.jpg";
import u_article6_1 from "../images/u_article6_1.png";
import u_article6_2 from "../images/u_article6_2.png";
import u_article6_3 from "../images/u_article6_3.jpg";
import u_article6_4 from "../images/u_article6_4.jpg";
import u_article6_5 from "../images/u_article6_5.png";
import u_article6_6 from "../images/u_article6_6.jpg";

const Article6 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/comments6')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addComment6 = () => {
    // Get the comment values
    const name = document.getElementById('name6').value;
    const comment = document.getElementById('comment6').value;
    // Create a new comment object
    const newComment = {
      name: name,
      comment: comment,
    };
    // Send the new comment to the server
    fetch('http://localhost:8000/comments6', {
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
        document.getElementById('name6').value = '';
        document.getElementById('comment6').value = '';
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
        <h2 style={{ fontSize: '45px' ,marginBottom: '10px'}} className="dot_line">
          如何成為一個綠色消費者
        </h2>
        <section>
          <h3 style={{ marginTop: '15px', marginBottom: '20px', marginLeft: '20%', marginRight: '20%', textAlign: 'center' }}>
          環保已成為當今社會中不可或缺的議題，這也使得越來越多的人開始關注<br/>
          自己的消費行為是否對環境造成負面影響。也讓綠色消費成為了一種趨勢<br/>
          。但是，什麼是綠色消費呢？又該如何選擇符合環保理念的商品和服務？<br/>
          </h3>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#135ead' }}>
                1. 什麼是綠色消費？
                <br /><br />
              </span>
              &emsp;&emsp;綠色消費是指選擇環保、可再生、能源節約、健康、安全和社會責任等方面均符合環保理念的商品和服務。在綠色消費中，消費者的選擇能夠影響到生產商和供應商的生產和經營，進而帶動整個產業的轉型。<br/><br/>
            &emsp;&emsp;選購產品時，考量到產品對生態環境的衝擊。選擇對環境傷害較少、甚至是有利的商品。範圍涵蓋產品的生產、運輸、行銷、丟棄過程、回收程度及產品包裝內含物。<br/>
            通常，這些商品和服務符合以下要求：<br/><br/>
              <ul>
                <li>
                  <span style={{ color: '#088c41' }}>節能減碳：</span>
                  在生產過程中減少能源的消耗，減少二氧化碳等溫室氣體的排放。
                </li><br />
                <li><span style={{ color: '#088c41' }}>節水減廢：</span>生產過程中減少水的消耗，減少廢棄物的產生。</li><br/>
                <li><span style={{ color: '#088c41' }}>無害化：</span>生產過程中避免使用對環境和人體有害的物質。</li><br/>
                <li><span style={{ color: '#088c41' }}>可再生：</span>使用可再生能源進行生產。</li><br/><br/>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article6_1} style={{ width: '100%' }} alt=""/>
              </span>
            </p>
          </div>
          <br />
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#135ead' }}>
                2. 如何選擇符合環保理念的商品和服務？
                <br /><br />
              </span>
              <ul>
                <li>
                  <strong style={{ color: '#088c41', fontSize: '23px' }}>留意產品的材料和製造過程：</strong>
                  <br /><br />
                  選擇符合環保理念的商品和服務，還需要關注產品的材料和生產過程。選擇使用可再生材料或回收材料的產品，可以減少對自然資源的消耗和對環境的破壞。同時，消費者也可以選擇那些使用環保生產工藝的產品，如節能、減排、減少浪費等，這些產品的製造過程對環境的影響也會相對減少。
                </li><br />
                <li><strong style={{ color: '#088c41', fontSize: '23px' }}>檢視產品的包裝：</strong><br/><br/>選擇少包裝或可回收包裝的產品。減少包裝可以減少浪費和對環境的負擔。同時，可回收包裝可以再利用，減少資源的浪費。</li><br/>
                <li><strong style={{ color: '#088c41', fontSize: '23px' }}>選擇綠色的品牌：</strong><br/><br/>在選擇商品和服務時，可以選擇綠色品牌。這些品牌通常具有良好的環保聲譽和產品性能，而且在生產和經營中注重環保和社會責任。</li><br/>
                <li><strong style={{ color: '#088c41', fontSize: '23px' }}>注意環保標誌和認證：</strong><br/><br/>在購買商品和服務時，消費者可以先關注是否有環保標誌和認證。環保標誌是指在商品或服務上使用的具有環保意義的標誌，如綠色的圓形箭頭、葉子等，通常會與環保認證機構相關聯。而環保認證是指由獨立的第三方機構對商品或服務進行評估，並認定其是否符合環保標準的過程。消費者可以通過了解這些標誌和認證，選擇符合環保理念的商品和服務。</li><br/>
                <li><strong style={{ color: '#088c41', fontSize: '23px' }}>選擇本地產品或服務：</strong><br/><br/>在當地購買商品和服務可以幫助減少運輸成本和碳排放。當你在當地購買商品時，可以考慮選擇當地生產的商品，以支持當地經濟和社區發展。同時，你還可以選擇當地的服務，例如當地的餐廳、酒店和旅遊公司等等，以進一步減少你的碳足跡。</li>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article6_2} className="picture_3" alt=""/>
                <img src = {u_article6_3} className="picture_3" alt=""/>
                <img src = {u_article6_4} className="picture_3" alt=""/>
              </span>
            </p>
          </div>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#135ead' }}>
                3. 台灣的實施狀況
                <br /><br />
              </span>
              <h3 style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'center', fontSize: '18px' }}>
                台灣在綠色消費方面的實施狀況逐漸進步，
                <br />
                政府也推出了相關政策和措施：
                <br />
              </h3>
              <ul>
                <li>
                  <strong style={{ color: '#088c41', fontSize: '23px' }}>綠色商品標章</strong>
                  <br /><br />
                  台灣推出了綠色商品標章，這是一種經過認證的環保標誌，代表符合環保、節能、減碳等標準。消費者可以透過綠色商品標章來選擇符合環保理念的商品和服務。
                </li><br />
                <li><strong style={{ color: '#088c41', fontSize: '23px' }}>節能家電補助</strong><br/><br/>台灣政府推出了節能家電補助，鼓勵消費者選購節能家電，以減少能源的浪費。消費者在購買符合節能標準的家電產品時，可以享有一定的補助。</li><br/>
                <li><strong style={{ color: '#088c41', fontSize: '23px' }}>減塑政策</strong><br/><br/>台灣政府也推出了減塑政策，鼓勵消費者減少使用塑膠製品，如購物袋、吸管、餐具等，以減少對環境的影響。</li><br/>
                <li><strong style={{ color: '#088c41', fontSize: '23px' }}>環保署推動</strong><br/><br/>環保署也推動了各種環保相關的活動，如海灘清潔、回收輪胎、環境教育等，提高民眾對環保議題的認識和意識。</li>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article6_5} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
                <img src = {u_article6_6} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
              </span>
              <br />
              &emsp;&emsp;台灣在綠色消費方面的實施狀況已經有了很大的進步，政府、企業和消費者都有意識到環保的重要性，也積極採取措施來實現可持續發展的目標。但仍有許多的挑戰和問題需要解決，如提高綠色商品的認知度、改善產品生命週期的管理等，需要各方共同努力才能實現更環保的生活方式。<br/>
            </p>
          </div>
        </section>
        <div style={{ fontSize: '22px', fontWeight: '900', marginLeft: '13%', marginRight: '13%', border: '2px solid #135ead', borderRadius: '10px', padding: '15px', textAlign: 'center' }}>
        在現今社會，人們越來越關注環保問題，綠色消費已成為一個趨勢，選擇符合<br/>
        環保理念的商品和服務應該是我們每個人的責任和義務，一起共同努力，從自身做起！<br/>
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
        <div id="comment-section6" style={{ maxHeight: '150px', overflowY: 'scroll' }}>
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
          <input type="text" id="name6" name="name" placeholder="請輸入你想顯示的暱稱" style={{marginBottom: '1%'}} /><br />
          <label htmlFor="comment" style={{fontSize: '16px', fontWeight: 600}}>評論內容：</label><br />
          <textarea id="comment6" name="comment" placeholder="歡迎分享你對這部作品的想法和感受，但發表評論時，請避免使用不適當或冒犯性的語言，謝謝。" style={{marginBottom: '1%', height:'60px', width:'100%'}} defaultValue={""} /><br />
          <div style={{textAlign: 'center'}}>
          <button type="button" onClick={() => {addComment6();}} style={{fontSize: '16px', backgroundColor: '#5F9EA0', fontWeight: 600}}>發佈評論</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Article6;
