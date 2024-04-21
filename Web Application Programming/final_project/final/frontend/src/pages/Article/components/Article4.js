import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import background from "../images/u_article4_background.jpg";
import u_article4_1 from "../images/u_article4_1.jpg";
import u_article4_2 from "../images/u_article4_2.jpg";
import u_article4_3 from "../images/u_article4_3.jpg";
import u_article4_4 from "../images/u_article4_4.jpg";
import u_article4_5 from "../images/u_article4_5.jpg";
import u_article4_6 from "../images/u_article4_6.jpeg";

const Article4 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/comments4')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addComment4 = () => {
    // Get the comment values
    const name = document.getElementById('name4').value;
    const comment = document.getElementById('comment4').value;
    // Create a new comment object
    const newComment = {
      name: name,
      comment: comment,
    };
    // Send the new comment to the server
    fetch('http://localhost:8000/comments4', {
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
        document.getElementById('name4').value = '';
        document.getElementById('comment4').value = '';
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
          可再生能源的應用與發展
        </h2>
        <section>
          <h3 style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'center' }}>
          隨著能源消耗量的不斷增長，環境污染、資源枯竭等問題越來越嚴重。<br/>
            如何實現能源的可持續利用和發展已成為全球面臨的共同課題。<br/>
            其中，可再生能源被視為一種重要的解決方案，<br/>
            其應用與發展已成為當今世界綠色發展的主要方向之一。<br/>
          </h3>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#e6802c' }}>
                1. 可再生能源的定義與種類
                <br /><br />
              </span>
              <ul>
                <li>
                  <strong style={{ color: '#07750f', fontSize: '23px' }}>太陽能：</strong>
                  <br />
                  利用太陽輻射獲取能量的一種能源。應用主要包括太陽能光伏發電和太陽能熱利用。
                </li><br />
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>風能：</strong><br/>利用風力獲取能量的一種能源。風能的應用主要包括風力發電。</li><br/>
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>水力：</strong><br/>利用水流或水頭產生的動能轉化成電能的一種能源。水力的應用主要包括水力發電。</li><br/>
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>生物質能：</strong><br/>利用生物質能源（如農業廢棄物、林木廢料、能源作物等）轉化為固體、液體或氣體燃料的一種能源。生物質能的應用主要包括生物質發電、生物質燃料等。</li><br/>
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>地熱能：</strong><br/>利用地球深部的熱能進行能源開發的一種能源。應用主要包括地熱發電、地熱供暖等。</li>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article4_1} className="picture_3" alt=""/>
                <img src = {u_article4_2} className="picture_3" alt=""/>
                <img src = {u_article4_3} className="picture_3" alt=""/>
              </span>
            </p>
          </div>
          <br />
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#e6802c' }}>
                2. 可再生能源的應用現狀
                <br /><br />
              </span>
              &emsp;&emsp;近年來，可再生能源的應用已逐漸普及並且快速發展。以全球而言，可再生能源已成為能源結構調整和轉型的重要手段。根據國際能源署的報告，全球可再生能源的裝機容量已超過2萬GW，占全球裝機容量的34%。其中，水力、風能和太陽能是可再生能源的主要來源，它們的裝機容量占全球可再生能源裝機容量的90%以上。另外，生物質和地熱能等可再生能源也在不斷發展。<br/><br/>
              &emsp;&emsp;在各國家政策的推動下，可再生能源的應用也得到了廣泛的發展。歐洲各國是可再生能源的領先者，其中德國是最具代表性的國家之一。德國的可再生能源裝機容量已超過1.23萬MW，佔全國裝機容量的約47%。此外，丹麥、瑞典等國家也在可再生能源的發展上取得了巨大的進展。亞洲國家中，中國和印度是可再生能源發展最快的國家之一。<br/><br/>
              而在各種可再生能源中，太陽能、風能、水力和生物質能的應用最廣泛。<br/>
              <ul>
              <li><strong style={{ color: '#07750f', fontSize: '23px' }}>太陽能：</strong><br/><br/>應用主要有兩種：太陽能光伏發電和太陽能熱利用。
                    太陽能光伏發電是指通過太陽能電池將太陽輻射轉化為電能的過程。目前，太陽能光伏發電已成為世界上最主要的可再生能源之一，全球太陽能光伏發電的裝機容量已超過7萬MW。
                    太陽能熱利用是指通過太陽能集熱器將太陽輻射轉化為熱能，並用於供暖、熱水和工業生產等。太陽能熱利用的應用已逐步普及，尤其是在一些熱水器、空調、集中供熱等領域，其應用範圍更是不斷擴大。</li><br/>
                <li>
                  <strong style={{ color: '#07750f', fontSize: '23px' }}>風能：</strong>
                  <br /><br />
                  風能是指通過風力發電機將風能轉化為電能的過程。風能發電是目前全球上發展最成熟的可再生能源之一，也是全球風電發展最快的能源形式之一。根據國際能源署的統計，全球風能裝機容量已超過7萬MW，其中歐洲和北美洲是風能發展最快的區域。
                </li><br />
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>水力：</strong><br/><br/>水力是指通過水力發電機將水能轉化為電能的過程。水力發電是最早發展起來的可再生能源之一，世界上很多國家都有相應的水力發電工程。目前，全球水力發電的裝機容量已超過1.2萬GW，其中中國、巴西、加拿大和美國是水力發電裝機容量最大的國家。</li><br/>
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>生物質能：</strong><br/><br/>生物質能是指利用農作物殘渣、廢棄物、木材和能源作物等生物質資源，通過直接燃燒、氣化、液化等方式將生物質轉化為熱能、電能和燃料的過程。目前，生物質能的應用主要集中在工業鍋爐、家用暖氣、發電和燃料等方面。</li>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article4_4} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
                <img src = {u_article4_5} className="picture_3" style={{ height: '250px', width: '400px' }} alt=""/>
              </span>
            </p>
          </div>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#e6802c' }}>
                3. 可再生能源的發展趨勢
                <br /><br />
              </span>
              隨著全球能源需求的不斷增長，可再生能源的應用和發展已成為全球關注的焦點。<br/>
              未來的發展趨勢主要有以下幾點：<br/><br/>
              <ul>
                <li>
                  <strong style={{ color: '#07750f', fontSize: '23px' }}>儲能技術的發展</strong>
                  <br /><br />
                  目前，可再生能源的不穩定性是制約其應用和發展的一個主要問題。隨著儲能技術的發展，如電池儲能、超級電容器和儲水槽等，可以有效解決可再生能源的不穩定性問題，提高其可靠性和穩定性。
                </li><br />
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>多能互補系統的建立</strong><br/><br/>隨著可再生能源的發展，未來將出現多種不同類型的可再生能源，如太陽能、風能、水力等。建立多能互補系統，可以有效整合不同類型的可再生能源，提高能源的利用效率。</li><br/>
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>智能電網的發展</strong><br/><br/>隨著智能電網技術的不斷發展，未來的能源系統將更加智能化和自動化。智能電網可以通過預測能源需求，調節能源供應和儲存，實現能源的高效利用。</li><br/>
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>能源互聯網的建立</strong><br/><br/>能源互聯網是指通過信息技術和通訊技術將能源系統連接起來，實現能源的交換和共享。未來，能源互聯網可以實現不同地區、不同國家之間能源的交換和共享，提高能源的利用效率。</li><br/><br/>
              </ul>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img src = {u_article4_6} style={{ width: '100%', height: '470px' }} alt=""/>
              </span>
            </p>
          </div>
          <div className="border_2">
            <p>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#e6802c' }}>
                4. 可再生能源的挑戰和解決方案
                <br /><br />
              </span>
              <ul>
                <li>
                  <strong style={{ color: '#07750f', fontSize: '23px' }}>能源密度低</strong>
                  <br /><br />
                  相比化石燃料，可再生能源的能源密度相對較低，這意味著需要更多的空間和設備來收集和利用可再生能源。為了解決這個問題，可以采用集中式和分布式的能源系統相結合的方式，將多種不同類型的可再生能源集中在一起，提高能源密度，同時也可以在分布式系統中利用小型可再生能源設備來補充能源供應。
                </li><br />
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>不穩定性強</strong><br/><br/>可再生能源的不穩定性強是其面臨的另一個主要挑戰。例如，風力發電和太陽能發電都受到天氣環境的影響，會出現能源產量的不穩定性。為了解決這個問題，可以采用儲能技術，將多餘的能源存儲起來，以應對能源短缺的情況。</li><br/>
                <li><strong style={{ color: '#07750f', fontSize: '23px' }}>成本高</strong><br/><br/>可再生能源的建設和運維成本較高，這也是其應用和發展遇到的一個主要問題。為了解決這個問題，可以通過技術創新和政策扶持來降低成本。例如，通過研發高效的太陽能電池和風力發電機等技術，提高能源轉化效率，同時也可以通過政府的補貼和減稅等政策來鼓勵企業和個人投資可再生能源項目。</li><br/><br/>
              </ul>
            </p>
          </div>
        </section>
        <div style={{ fontSize: '22px', fontWeight: '900', marginLeft: '12%', marginRight: '12%', border: '2px solid #51ed0e', borderRadius: '10px', padding: '15px' }}>
        可再生能源的應用和發展是全球經濟和社會可持續發展的關鍵，積極發展同時也需要透過<br/>
        技術創新和政策扶持來解決可再生能源面臨的挑戰和問題<br/>
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
        <div id="comment-section4" style={{ maxHeight: '150px', overflowY: 'scroll' }}>
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
          <input type="text" id="name4" name="name" placeholder="請輸入你想顯示的暱稱" style={{marginBottom: '1%'}} /><br />
          <label htmlFor="comment" style={{fontSize: '16px', fontWeight: 600}}>評論內容：</label><br />
          <textarea id="comment4" name="comment" placeholder="歡迎分享你對這部作品的想法和感受，但發表評論時，請避免使用不適當或冒犯性的語言，謝謝。" style={{marginBottom: '1%', height:'60px', width:'100%'}} defaultValue={""} /><br />
          <div style={{textAlign: 'center'}}>
          <button type="button" onClick={() => {addComment4();}} style={{fontSize: '16px', backgroundColor: '#5F9EA0', fontWeight: 600}}>發佈評論</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Article4;
