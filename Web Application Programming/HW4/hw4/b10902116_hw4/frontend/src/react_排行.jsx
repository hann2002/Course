import React, { useEffect, useState } from 'react';
import "./css/hong.css";
class Footer extends React.Component{
    render(){
        return(
            <div className="hong-footer">
                <div>
                <p>2023, Web APP Team 5, All Rights Reserved</p>
                <p>Terms & Privacy</p>
                </div>
            </div>
        );
    }
}
export default function Rank(){
    const [rank, setrank] = useState({"plastic": [[0,0],[0,0],[0,0],[0,0],[0,0]],"meat": [[0,0],[0,0],[0,0],[0,0],[0,0]],"dish": [[0,0],[0,0],[0,0],[0,0],[0,0]],"trans": [[0,0],[0,0],[0,0],[0,0],[0,0]]});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/data');
                if (!response.ok) alert('Failed to fetch data from server');
                const result = await response.json();
                setrank(result);
            } catch (error) {alert('fetch error')}
        };
        fetchData();
    }, []);
    return(
        <div>
        <img className="row-pic" src={"./介紹排名.jpg"} alt="排行榜"/>
        <div className="four-container" id="你的排名">
            <div className="whitebox" id="div0" onMouseLeave={()=>out(0)} onMouseOver={()=>over(0)} style={{backgroundImage: 'url(./background/暗餐具.jpg)'}}>
            <img src={"./picture/查看排名.png"} alt="查看排名" id="img0" onMouseLeave={()=>out(0)} onMouseOver={()=>over(0)} style={{width:'65%', margin:'auto'}}/>
            <h2 id="rank0" style={{display: 'none', marginTop:'20px'}}>第{rank["dish"][3][1]}名</h2>
            <h4 id="field0" style={{display: 'none'}}>節省免洗餐具餐盒</h4>
            <h6 id="diff0" style={{display: 'none'}}>離上一名差{rank["dish"][3][0]}個</h6>
            </div>
            <div className="whitebox" id="div1" onMouseLeave={()=>out(1)} onMouseOver={()=>over(1)} style={{backgroundImage: 'url(./background/暗塑膠.jpg)'}}>
            <img src={"./picture/查看排名.png"} alt="查看排名" id="img1" onMouseLeave={()=>out(0)} onMouseOver={()=>over(0)} style={{width:'65%', margin:'auto'}}/>
            <h2 id="rank1" style={{display: 'none', marginTop:'20px'}}>第{rank["plastic"][3][1]}名</h2>
            <h4 id="field1" style={{display: 'none'}}>節省塑膠製品</h4>
            <h6 id="diff1" style={{display: 'none'}}>離上一名差{rank["plastic"][3][0]}個</h6>
            </div>
            <div className="whitebox" id="div2" onMouseLeave={()=>out(2)} onMouseOver={()=>over(2)} style={{backgroundImage: 'url(./background/暗肉.jpg)'}}>
            <img src={"./picture/查看排名.png"} alt="查看排名" id="img2" onMouseLeave={()=>out(0)} onMouseOver={()=>over(0)} style={{width:'65%', margin:'auto'}}/>
            <h2 id="rank2" style={{display: 'none', marginTop:'20px'}}>第{rank["meat"][3][1]}名</h2>
            <h4 id="field2" style={{display: 'none'}}>減少肉食碳排放</h4>
            <h6 id="diff2" style={{display: 'none'}}>離上一名差{rank["meat"][3][0]}KG</h6>
            </div>
            <div className="whitebox" id="div3" onMouseLeave={()=>out(3)} onMouseOver={()=>over(3)} style={{backgroundImage: 'url(./background/暗交通.jpg)'}}>
            <img src={"./picture/查看排名.png"} alt="查看排名" id="img3" onMouseLeave={()=>out(0)} onMouseOver={()=>over(0)} style={{width:'65%', margin:'auto'}}/>
            <h2 id="rank3" style={{display: 'none', marginTop:'20px'}}>第{rank["trans"][3][1]}名</h2>
            <h4 id="field3" style={{display: 'none'}}>減少交通碳排放</h4>
            <h6 id="diff3" style={{display: 'none'}}>離上一名差{rank["trans"][3][0]}KM</h6>
            </div>
        </div>
        <img className="row-pic" src={"./寬排行榜.jpg"} alt="排行榜"/>
        <div className="four-container" id="環保排行榜">
            <div className="blackbox" style={{padding:'5px'}}>
            <h3><b>節省免洗餐具餐盒</b></h3>
            <img src={"./picture/正技巧餐具.jpg"} id="img4" onMouseOver={()=>show(4)} onMouseLeave={()=>hide(4)} alt="砍竹子圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{rank["dish"][0][1]} ({rank["dish"][0][0]}個)</h4>
            <h4>第二名：{rank["dish"][1][1]} ({rank["dish"][1][0]}個)</h4>
            <h4>第三名：{rank["dish"][2][1]} ({rank["dish"][2][0]}個)</h4>
            </div>
            <div className="blackbox"  style={{padding:'5px'}}>
            <h3><b>節省塑膠製品</b></h3>
            <img src={"./picture/正技巧塑膠.jpg"} id="img5" onMouseOver={()=>show(5)} onMouseLeave={()=>hide(5)} alt="海中塑膠袋圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{rank["plastic"][0][1]} ({rank["plastic"][0][0]}個)</h4>
            <h4>第二名：{rank["plastic"][1][1]} ({rank["plastic"][1][0]}個)</h4>
            <h4>第三名：{rank["plastic"][2][1]} ({rank["plastic"][2][0]}個)</h4>
            </div>
            <div className="blackbox" style={{padding:'5px'}}>
            <h3><b>減少肉食碳排放</b></h3>
            <img src={"./picture/正技巧肉.jpg"} id="img6" onMouseOver={()=>show(6)} onMouseLeave={()=>hide(6)} alt="養雞場圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{rank["meat"][0][1]} ({rank["meat"][0][0]}KG)</h4>
            <h4>第二名：{rank["meat"][1][1]} ({rank["meat"][1][0]}KG)</h4>
            <h4>第三名：{rank["meat"][2][1]} ({rank["meat"][2][0]}KG)</h4>
            </div>
            <div className="blackbox" style={{padding:'5px'}}>
            <h3><b>減少交通碳排放</b></h3>
            <img src={"./picture/正技巧交通.jpg"} id="img7" onMouseOver={()=>show(7)} onMouseLeave={()=>hide(7)} alt="輕軌圖片" style={{marginBottom: '12px',width:'90%',borderRadius: '0px'}}/>
            <h4>第一名：{rank["trans"][0][1]} ({rank["trans"][0][0]}KM)</h4>
            <h4>第二名：{rank["trans"][1][1]} ({rank["trans"][1][0]}KM)</h4>
            <h4>第三名：{rank["trans"][2][1]} ({rank["trans"][2][0]}KM)</h4>
            </div>
        </div>
        <Footer></Footer>
        </div>
    );
}

var back = ["餐具","塑膠","肉","交通"];
function over(num){
  var div=document.getElementById("div"+String(num));
  div.style.backgroundImage = "url(./background/暗"+back[num]+".jpg)";
  div.style.width=String(div.offsetWidth)+"px";
  div.style.height=String(div.offsetHeight)+"px";
  var img=document.getElementById("img"+String(num));
  var rank=document.getElementById("rank"+String(num));
  var diff=document.getElementById("diff"+String(num));
  var field=document.getElementById("field"+String(num));
  img.style.display="none";
  field.style.display=rank.style.display=diff.style.display="block";
}
function out(num){
  var div=document.getElementById("div"+String(num));
  div.style.backgroundImage = "url(./background/暗"+back[num]+".jpg)";
  div.style.width=String(div.offsetWidth)+"px";
  div.style.height=String(div.offsetHeight)+"px";
  var img=document.getElementById("img"+String(num));
  var rank=document.getElementById("rank"+String(num));
  var diff=document.getElementById("diff"+String(num));
  var field=document.getElementById("field"+String(num));
  img.style.display="block";
  field.style.display=rank.style.display=diff.style.display="none";
}
function show(num){
  var img=document.getElementById("img"+String(num));
  img.src="./picture/技巧"+back[num-4]+".jpg";
}
function hide(num){
  var img=document.getElementById("img"+String(num));
  img.src="./picture/正技巧"+back[num-4]+".jpg";
}