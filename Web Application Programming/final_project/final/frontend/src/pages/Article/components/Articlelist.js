import React from 'react';
import { Link } from 'react-router-dom';
import article1cover from "../images/u_article1_cover.jpg";
import article2cover from "../images/u_article2_cover.jpg";
import article3cover from "../images/u_article3_cover.jpg";
import article4cover from "../images/u_article4_cover.jpg";
import article5cover from "../images/u_article5_cover.jpg";
import article6cover from "../images/u_article6_cover.jpg";
import '../style.css'

function Articlelist() {
  return (
    <div style={{ background: 'linear-gradient(#EEF6DF, #CDE6C7, #A3CCD0)' , paddingTop: '50px', paddingBottom:'50px'}}>
    <div className="container">
      <Link to="/article_1" className="article_a" title="點擊看文章">
        <figure className="picture">
          <img src={article1cover} style={{ height: '200px', width: '330px' }} alt="文章封面" />
          <figcaption style={{marginTop:'15px'}}><strong>綠色小確幸：輕鬆環保生活</strong></figcaption>
        </figure>
      </Link>
      <Link to="/article_2" className="article_a" title="點擊看文章">
        <figure className="picture">
          <img src={article2cover} style={{ height: '200px', width: '330px' }} alt="文章封面" />
          <figcaption style={{marginTop:'15px'}}><strong>喝好茶，也要用好杯</strong></figcaption>
        </figure>
      </Link>
      <Link to="/article_3" className="article_a" title="點擊看文章">
        <figure className="picture">
          <img src={article3cover} style={{ height: '200px', width: '330px' }} alt="文章封面" />
          <figcaption style={{marginTop:'15px'}}><strong>愛地球，從節能減碳開始</strong></figcaption>
        </figure>
      </Link>
      <Link to="/article_4" className="article_a" title="點擊看文章">
        <figure className="picture">
          <img src={article4cover} style={{ height: '200px', width: '330px' }} alt="文章封面" />
          <figcaption style={{marginTop:'15px'}}><strong>地球不能再生，但能源可以</strong></figcaption>
        </figure>
      </Link>
      <Link to="/article_5" className="article_a" title="點擊看文章">
        <figure className="picture">
          <img src={article5cover} style={{ height: '200px', width: '330px' }} alt="文章封面" />
          <figcaption style={{marginTop:'15px'}}><strong>環保就是我的生活態度</strong></figcaption>
        </figure>
      </Link>
      <Link to="/article_6" className="article_a" title="點擊看文章">
        <figure className="picture">
          <img src={article6cover} style={{ height: '200px', width: '330px' }} alt="文章封面" />
          <figcaption style={{marginTop:'15px'}}><strong>綠色消費大作戰</strong></figcaption>
        </figure>
      </Link>
    </div>
    </div>
  );
}

export default Articlelist;
