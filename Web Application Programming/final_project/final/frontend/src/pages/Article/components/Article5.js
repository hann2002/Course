import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import background from "../images/u_article5_background.jpg";
import u_article5_1 from "../images/u_article5_1.jpg";
import u_article5_2 from "../images/u_article5_2.jpg";
import u_article5_3 from "../images/u_article5_3.jpg";

const Article5 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/comments5')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addComment5 = () => {
    // Get the comment values
    const name = document.getElementById('name5').value;
    const comment = document.getElementById('comment5').value;
    // Create a new comment object
    const newComment = {
      name: name,
      comment: comment,
    };
    // Send the new comment to the server
    fetch('http://localhost:8000/comments5', {
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
        document.getElementById('name5').value = '';
        document.getElementById('comment5').value = '';
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
          提高環保意識與社會責任
        </h2>
        <section>
          <h3 style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'center' }}>
          隨著人類對自然環境的破壞和消耗加劇，保護環境已經成為全球共同的課題和責任。<br/>
            只要是地球的一份子，我們都應該擔起環保的社會責任，<br/>
            積極參與環保運動，提高環保意識，共同推動環保事業的發展。<br/>
          </h3>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#8317ef' }}>
                1. 環保意識的重要性
                <br /><br />
              </span>
              &emsp;&emsp;當今世界，環境問題已經成為一個全球性的問題。空氣污染、水質污染、垃圾問題等都嚴重影響著人類的生存和發展。環保意識的提高可以讓我們更加關注這些問題，積極參與環保行動，共同保護我們的生存環境。<br/><br/>
            &emsp;&emsp;環保意識的提高也是我們身為社會成員和企業家應該承擔的社會責任。企業應該不斷推行綠色產品和環保技術，從根本上減少環境污染和資源消耗，為社會做出貢獻。
            </p>
          </div>
          <br />
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#8317ef' }}>
                2. 環保意識的提高
                <br /><br />
              </span>
              <ul>
                <li>
                  <strong style={{ color: '#135ead', fontSize: '23px' }}>環保教育：</strong>
                  <br />
                  環保教育是提高環保意識的重要途徑之一。學校和社區可以開展各種環保教育活動，通過演講、講座、宣傳和實踐等形式，讓人們更加了解環境問題和環保知識，提高環保意識。
                </li><br />
                <li><strong style={{ color: '#135ead', fontSize: '23px' }}>節能減碳</strong><br/><br/>節能減排是提高環保意識的實際行動之一。通過使用節能燈具、減少用水、垃圾分類等措施，可以減少能源消耗和環境污染，同時也可以降低生活成本。</li><br/>
                <li><strong style={{ color: '#135ead', fontSize: '23px' }}>綠色消費</strong><br/><br/>綠色消費是提高環保意識的重要方向之一。消費者可以選擇綠色產品和環保產品，這些產品不僅可以保護環境，還可以支持環保產業的發展。消費者的綠色消費行為可以影響企業的生產和經營，推動綠色產品和環保技術的應用和發展。</li>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={u_article5_1} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
                <img src={u_article5_2} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
              </span>
            </p>
          </div>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#8317ef' }}>
                3. 企業的環保責任
                <br /><br />
              </span>
              企業作為社會的一員，應該承擔環保責任，推行綠色經濟和可持續發展。具體措施包括：
              <ul>
                <li>
                  <strong style={{ color: '#135ead', fontSize: '23px' }}>減少污染排放：</strong>
                  <br />
                  企業應該將污染排放降到最低限度，採取先進的治理技術和設備，減少對環境的影響。
                </li><br />
                <li><strong style={{ color: '#135ead', fontSize: '23px' }}>推行環保技術</strong><br/><br/>積極推行環保技術，將環保要求納入生產和經營中，通過技術手段減少污染和能源消耗。</li><br/>
                <li><strong style={{ color: '#135ead', fontSize: '23px' }}>推廣綠色產品</strong><br/><br/>透過推廣環保產品，推動綠色消費，降低對環境的影響，同時也可以增加市場競爭力。</li><br/>
                <li><strong style={{ color: '#135ead', fontSize: '23px' }}>環保教育</strong><br/><br/>企業可以通過環保教育活動，提高員工和客戶的環保意識，讓環保理念融入到企業文化中。</li>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={u_article5_3} style={{ width: '70%', height: '8%' }} alt=""/>
              </span>
            </p>
          </div>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#8317ef' }}>
                4. 挑戰與展望
                <br /><br />
              </span>
              <strong>&emsp;&emsp;提高環保意識和社會責任是推動環保事業發展的關鍵，但在實踐中還存在一些挑戰。</strong><br/><br/>
              &emsp;&emsp;首先，環保知識和技術普及率不高。由於環保知識的專業性和技術性，一些人對環保缺乏了解，難以有效地參與環保行動。<br/><br/>
              &emsp;&emsp;其次，環保行動的效果不明顯。一些人的環保行動缺乏系統性和長期性，難以形成有效的推動力量。另外，一些企業在環保方面的投入不足，環保產品的研發和應用面臨著技術和成本上的難題。<br/><br/>
              &emsp;&emsp;最後，環保運動需要更多的資源和支持。政府應該加強對環保事業的投入和政策支持，企業應該積極承擔社會責任，通過技術和產品的創新推動綠色經濟和可持續發展。<br/><br/>
              &emsp;&emsp;總之，環保意識的提高和社會責任的承擔是推動環保事業發展的重要保障。個人和企業都應該積極參與環保運動，共同推動環保事業的發展和可持續發展的實現。讓我們擁抱綠色、擁抱環保，共建美好家園。<br/><br/>
            </p>
          </div>
        </section>
        <div style={{ fontSize: '22px', fontWeight: '900', marginLeft: '13%', marginRight: '13%', border: '2px solid #135ead', borderRadius: '10px', padding: '15px', textAlign: 'center' }}>
        個人和企業都應該積極參與環保運動，從自身做起，從微小的行動開始促進環保。<br/>
        讓我們一起努力，促進環保事業和可持續發展，共同打造一個美好的地球家園！<br/>
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
        <div id="comment-section5" style={{ maxHeight: '150px', overflowY: 'scroll' }}>
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
          <input type="text" id="name5" name="name" placeholder="請輸入你想顯示的暱稱" style={{marginBottom: '1%'}} /><br />
          <label htmlFor="comment" style={{fontSize: '16px', fontWeight: 600}}>評論內容：</label><br />
          <textarea id="comment5" name="comment" placeholder="歡迎分享你對這部作品的想法和感受，但發表評論時，請避免使用不適當或冒犯性的語言，謝謝。" style={{marginBottom: '1%', height:'60px', width:'100%'}} defaultValue={""} /><br />
          <div style={{textAlign: 'center'}}>
          <button type="button" onClick={() => {addComment5();}} style={{fontSize: '16px', backgroundColor: '#5F9EA0', fontWeight: 600}}>發佈評論</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Article5;
