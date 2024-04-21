import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import background from "../images/u_article1_background.png";
import u_article1_1 from "../images/u_article1_1.jpg";
import u_article1_2 from "../images/u_article1_2.jpg";
import u_article1_3 from "../images/u_article1_3.jpg";
import u_article1_4 from "../images/u_article1_4.jpg";
import u_article1_5 from "../images/u_article1_5.jpg";
import u_article1_6 from "../images/u_article1_6.jpg";
import u_article1_7 from "../images/u_article1_7.jpg";

export const Article1 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/comments1')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addComment1 = () => {
    // Get the comment values
    const name = document.getElementById('name1').value;
    const comment = document.getElementById('comment1').value;
    // Create a new comment object
    const newComment = {
      name: name,
      comment: comment,
    };
    // Send the new comment to the server
    fetch('http://localhost:8000/comments1', {
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
        document.getElementById('name1').value = '';
        document.getElementById('comment1').value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
    <div className="back" style={{ backgroundImage: `url(${background})`, paddingTop: '25px', paddingBottom:'20px' }}>
      <link rel="stylesheet" href="./style.css" />
      <main>
        <h2 style={{ fontSize: '45px' }} className="dot_line">
        7個簡單的日常環保妙招
        </h2>
        <section>
          <div className="border">
            <span>
              <img src={u_article1_1} className="picture_2" alt=""/>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#135ead'
                }}
              >
                1. 攜帶可重複使用的袋子<br />
                <br />
              </span>
              &emsp;&emsp;大家應該都有幾個能重複使用的袋子，最難的其實是記得把它帶出門。
            可以嘗試將可重複使用的袋子放在家門旁最顯眼的地方，或是在你最常使用的幾個隨身包
            包裡面都各放一個小袋子，環保袋還有一個額外的好處，就是它們更加堅固耐用
            且更省錢，雖然單價可能比一次性塑膠袋高，但長期使用可以節省大量的金錢。
            每少用一個塑膠袋，可能就救了一隻海龜喔！
            </span>
          </div>
          <div className="border">
            <p>
              <img src={u_article1_2} className="picture_2" alt=""/>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#135ead'
                }}
              >
                2. 攜帶自己的杯子<br />
                <br />
              </span>
              &emsp;&emsp;現代爆炸式增加的外帶銷售量，卻為環境帶來嚴重後果。你可能會說，現在越來越多店都用紙杯取代塑膠杯了，紙杯可以回收再利用呀！事實卻並非如此。紙杯內會
            塗上一層薄薄的聚乙烯塑膠，這層塑料難以與紙杯分離，因此大多數的廢棄紙杯都會到垃圾掩埋場，成為塑膠污染源。使用自己的杯子也比較不會有塑化劑的問題，
            安全又環保！<br />
            </p>
          </div>
          <div className="border">
            <p>
              <img src={u_article1_3} className="picture_2" alt=""/>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#135ead'
                }}
              >
                3. 向塑膠吸管跟餐具說「不」！<br />
                <br />
              </span>
              &emsp;&emsp;據2014年臺灣淨灘統計結果，吸管和免洗餐具皆榜上有名，是海洋塑膠污染物的前
            五名。相信你應該看過海龜被塑膠吸管插傷鼻孔的影片，然而這隻海龜的遭遇，只
            是眾多野生動物們正在承受海洋遭到塑膠污染的一個縮影。雖然使用一次性吸管跟
            餐具非常方便，但保護環境應該是所有人的責任，沒有任何一個人可以置身事外，
            相信只要養成習慣，使用鏽鋼或玻璃製的吸管跟餐具絕非難事。
            </p>
          </div>
          <div className="border">
            <p>
              <img src={u_article1_4} className="picture_2" alt=""/>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#135ead'
                }}
              >
                4. 搭乘大眾運輸及騎腳踏車、多走路<br />
                <br />
              </span>
              &emsp;&emsp;全球有成千上萬的民眾開車上班，這也造成大量溫室氣體的排放。根據環保署統計，
            在臺灣，包含飛機、汽車等交通運輸產生的碳排放佔比約為總量的 14%，若我們能改
            變每天的通勤方式，搭乘捷運、公車，或與住的近的同事共乘，甚至挑戰騎腳踏車上
            、下班、多走路，不但能減少二氧化碳排放、減少空氣污染，還能擁有新鮮的體驗並
            且提高運動量！
            </p>
          </div>
          <div className="border">
            <p>
              <img src={u_article1_5} className="picture_2" alt=""/>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#135ead'
                }}
              >
                5. 養成節省能源的好習慣<br />
                <br />
              </span>
              &emsp;&emsp;盡可能的隨手關燈，在家也一樣，若待在客廳就要把房間的燈關起來，另外洗手、刷
            牙或洗澡時，不需要用到水時，請順手把水關起來，不要讓水一直流免得浪費．其它
            如購買有綠色能源標章的省電電器、使用省電燈泡、修理有漏的冷氣機和冷藏系統、
            自然風乾已洗好的衣物而不使用烘乾器等，室溫28度以上再開冷氣，都是很好的節能
            方法。
            </p>
          </div>
          <div className="border">
            <p>
              <img src={u_article1_6} className="picture_2" alt=""/>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#135ead'
                }}
              >
                6. 做好垃圾分類<br />
                <br />
              </span>
              &emsp;&emsp;不要覺得垃圾分類很麻煩，其實就是順手做的一件事！日常生活排出的垃圾，可分為
            一般垃圾、可回收物、廚餘這3類，其中可回收物和廚餘都是能夠做再生利用，創造新
            的資源。正確的垃圾分類也可以減少垃圾填埋場和焚化廠的需求，從而減少對土地、
            空氣和水的污染。總之垃圾分類是對環境友好的行動，有助於減少垃圾排放和廢物的
            浪費，提高資源利用效率，保護地球和人類的健康。
            </p>
          </div>
          <div className="border">
            <p>
              <img src={u_article1_7} className="picture_2" alt=""/>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#135ead'
                }}
              >
                7. 與你周遭的人分享這些減塑生活的妙招<br />
                <br />
              </span>
              &emsp;&emsp;環保是一個需要全球共同努力的議題。保護地球和環境不僅僅是政府的責任，每一個
            人都可以做出貢獻。以上的減塑妙招非常值得與你我身邊的家人朋友交流分享，啟發
            其他人加入減塑，踏入無塑生活的第一步。每個人都只有一次生命，也只有一個地球
            ，一起盡最大的力量和智慧，讓這個世界產生積極、良善的影響吧！心動不如行動，
            快用革新的精神，展開屬於你的減塑生活吧！
            </p>
          </div>
        </section>
        <br />
        <div
          style={{
            fontSize: '22px',
            fontWeight: '900',
            marginLeft: '6%',
            marginRight: '6%',
            border: '2px solid #135ead',
            borderRadius: '10px',
            padding: '10px'
          }}
        >
          綜合以上的日常環保妙招，我們可以看到，環保不是什麼困難的事情。每個人都可以通過這些簡單的行為來保護我們的地球。
        希望大家都能夠做出自己的貢獻，讓我們的地球更加美麗。<br />
        </div>
        <br />
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
        <div id="comment-section1" style={{ maxHeight: '150px', overflowY: 'scroll' }}>
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
          <input type="text" id="name1" name="name" placeholder="請輸入你想顯示的暱稱" style={{marginBottom: '1%'}} /><br />
          <label htmlFor="comment" style={{fontSize: '16px', fontWeight: 600}}>評論內容：</label><br />
          <textarea id="comment1" name="comment" placeholder="歡迎分享你對這部作品的想法和感受，但發表評論時，請避免使用不適當或冒犯性的語言，謝謝。" style={{marginBottom: '1%', height:'60px', width:'100%'}} defaultValue={""} /><br />
          <div style={{textAlign: 'center'}}>
          <button type="button" onClick={() => {addComment1();}} style={{fontSize: '16px', backgroundColor: '#5F9EA0', fontWeight: 600}}>發佈評論</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Article1;