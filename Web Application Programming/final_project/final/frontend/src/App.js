import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Donation from "./pages/Donation";
import NavbarContainer from "./pages/Account/components/NavbarContainer";
import Header from "./pages/Account/components/Header";
import Main from "./pages/Main/Main";
import ArticleList from './pages/Article/components/Articlelist';
import Article1 from './pages/Article/components/Article1';
import Article2 from './pages/Article/components/Article2';
import Article3 from './pages/Article/components/Article3';
import Article4 from './pages/Article/components/Article4';
import Article5 from './pages/Article/components/Article5';
import Article6 from './pages/Article/components/Article6';
import Aboutus from './pages/Article/components/Aboutus'
import Game from "./pages/Games/Game";
import Race from "./pages/Race/react_比賽";
import Rank from "./pages/Race/react_排行";
import Meat from "./pages/Race/react_肉";
import Tran from "./pages/Race/react_交通";
import Plastic from "./pages/Race/react_塑膠";
import Dish from "./pages/Race/react_餐具";
import Footer from './Footer';
import './App.css';
import { AuthProvider } from "./useAuth";

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="header-container">
        <Header loggedIn=""/>
        <NavbarContainer />
      </div>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article_1" element={<Article1 />} />
          <Route path="/article_2" element={<Article2 />} />
          <Route path="/article_3" element={<Article3 />} />
          <Route path="/article_4" element={<Article4 />} />
          <Route path="/article_5" element={<Article5 />} />
          <Route path="/article_6" element={<Article6 />} />
          <Route path="/account" element={<Account />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/games" element={<Game />} />
          <Route path="/race" element={<Race />} />
          <Route path="/meat" element={<Meat />} />
          <Route path="/tran" element={<Tran />} />
          <Route path="/plastic" element={<Plastic />} />
          <Route path="/dish" element={<Dish />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
    
  );
}

export default App;
