import React from 'react';
import { useState, useEffect, useContext} from "react";
import './App.css';
import { useAuth } from '../../useAuth';
// import { useContext } from 'react';
// import QuizContextProvider, { QuizContext } from "./quizContext";
import './footer.css';
import './header.css';
import './main-content.css';
import './navbar-container.css';
import './fontawesome.css';
import './style.css';
import './game.css';
import './bootstrap.min.css';
import './bootstrap.min.css.map';
import axios from "axios";
import { HighlightSpanKind } from 'typescript';

const Game = () => {
    const {loggedIn} = useAuth();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [gameStart, setGameStart] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [totalStars, setTotalStars] = useState(0);
    const [submitTime, setSubmitTime] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [starRating, setStarRating] = useState('');
    const [message, setMessage] = useState('');
    const [starSum, setStarSum] = useState(0);
    const [toBackend, setToBackend] = useState(false);
    


    useEffect(() => {
        const selectedQuestions = []
        axios.get("http://127.0.0.1:8000/list/random")
          .then(response => {
            response.data.forEach(element => {
              selectedQuestions.push({
                question: element.question_name,
                options: [element.option_1,element.option_2,element.option_3,element.option_4],
                answer: element.answer
              })
            });
            console.log(selectedQuestions)
            setQuestions(selectedQuestions);
          })
          .catch(error => console.log(error));
        
      }, []);

      useEffect(() => {
        if(loggedIn){
          axios.get(`http://127.0.0.1:8000/getscore/${loggedIn}`)
          .then(response => {
            console.log(response.data.total_stars)
            setTotalStars(response.data.total_stars)
            setHighestScore(response.data.highest_score)
            setSubmitTime(response.data.submit_time)
          })
          .catch(error => console.log(error));
        }
      }, []);

      useEffect(() => {
        if(currentQuestionIndex>=5){
            setEndGame(true);
        }
        else{
            setCurrentQuestion(questions[currentQuestionIndex]);
        }
      }, [currentQuestionIndex]);

      useEffect(() => {
        if(endGame){
            if(numCorrectAnswers===5){
                setStarRating("☆☆☆");
                setMessage("Congratulations, you answered all of them correctly!");
                setTotalStars(prev => prev+3);
                
            }
            else if(numCorrectAnswers>=3){
                setStarRating("☆☆");
                setMessage("Just a little bit!");
                setTotalStars(prev => prev+2);
               
            }
            else{
                setStarRating("☆");
                setMessage("Come on!");
                setTotalStars(prev => prev+1);
                
            }
            if(numCorrectAnswers>highestScore){
                setHighestScore(numCorrectAnswers);
            }
            setSubmitTime(prev => prev+1);
            setToBackend(true);
        }
      }, [endGame]);

      useEffect(() => {
        if(toBackend){
            const data = {
                name:loggedIn,
                total_stars:totalStars,
                submit_time: submitTime,
                highest_score:highestScore
            }
            axios.post(`http://127.0.0.1:8000/upload/`,data);
        }
      }, [toBackend]);

      const handleStart = () => {
        setGameStart(true);
        setCurrentQuestion(questions[0])
      }

      const handleAnswer = (answerIndex) => {
        const currentQuestion = questions[currentQuestionIndex];
        const options = document.getElementsByClassName("option");
        if (currentQuestion.answer === answerIndex) {
          // numCorrectAnswers += 1;
          // console.log(options[answerIndex].children[0].children[1].children[0].children[0]);
          options[answerIndex].children[0].children[1].children[0].children[0].style.color = "green";
          // score +=1;
          setNumCorrectAnswers((prev) => prev + 1);
          setScore((prev) => prev + 1);
        
        } else {
          options[answerIndex].children[0].children[1].children[0].children[0].style.color = "red";
        }
        for (let i = 0; i < options.length; i++) {
          options[i].disabled = true;
        }
        setTimeout(() => {
          for (let i = 0; i < options.length; i++) {
            options[answerIndex].children[0].children[1].children[0].children[0].style.color = "black";
            options[i].disabled = false;
          }
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 2000);
      }

    return(
        <>
             <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-6 align-self-center">
                          <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                            <div className="row">
                              <div className="col-lg-4 col-sm-4 asd" >
                                <div className="info-stat">
                                  <h6>Total Times</h6>
                                  <h4>{loggedIn!=="" ? submitTime===""? "無" : submitTime : "無"}</h4>
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-4">
                                <div className="info-stat">
                                  <h6>Total Stars:</h6>
                                  <h4>{loggedIn!=="" ? totalStars===""? "無" : totalStars : "無"}</h4>
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-4">
                                <div className="info-stat">
                                  <h6>Historical Record:</h6>
                                  <h4>{loggedIn!=="" ? highestScore==="" ? "無" : highestScore : "無"}</h4>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="h2-header">環保知識小遊戲</div>
                              </div>
                              <div className="col-lg-12">
                                <div className="main-green-button scroll-to-section">
                                  <a href="#contact" onClick={handleStart} className='start-game'>Start The Game</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div id="contact" className="contact-us section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.25s">
                      <form id="contact" action="" method="post">
                        <div className="row">
                          <div className="col-lg-6 offset-lg-3">
                            <div className="section-heading">
                              <h6>Fighting</h6>
                              <h2>環保<span>知識</span><em>小遊戲</em></h2>
                              <br></br>
                              <h5>Present Score: {score}</h5>
                            </div>
                          </div>
                          {
                gameStart && !endGame ? 
                <div id="question">
        {currentQuestion.question}
      
        <div className="container-fluid">
          <div className="row">
            {currentQuestion.options.slice(0, 2).map((option, index) => (
              <div className="col-lg-6" key={index}>
                <button
                  className={`option service-item wow bounceInUp ${
                    selectedOptionIndex === index &&
                    (index === currentQuestion.correctAnswerIndex
                      ? "correct"
                      : "wrong")
                  }`}
                  data-wow-duration="1s"
                  data-wow-delay={`0.${index + 3}s`}
                  onClick={() => handleAnswer(index)}
                >
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="icon">
                        <img src={require(`../public/assets/images/World${index + 1}.png`)} alt="" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-content">
                        <p>{option}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="row">
            {currentQuestion.options.slice(2, 4).map((option, index) => (
              <div className="col-lg-6" key={index + 2}>
                <button
                  className={`option service-item wow bounceInUp ${
                    selectedOptionIndex === index + 2 &&
                    (index + 2 === currentQuestion.correctAnswerIndex
                      ? "correct"
                      : "wrong")
                  }`}
                  data-wow-duration="1s"
                  data-wow-delay={`0.${index + 5}s`}
                  onClick={() => handleAnswer(index + 2 )}
                >
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="icon">
                        <img src={require(`../public/assets/images/World${index + 3}.png`)} alt="" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-content">
                        <p>{option}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              ))}
          </div>
        </div>
      </div>
                : 
                <></>
            }
            {
                endGame ?
                <div className="service-item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.6s">
                    <h2 style={{marginBottom:'25px'}}>— Results —</h2>
                    <p>You got {numCorrectAnswers} out of {questions.length} questions correct.</p>
                    <p>Your star rating : {starRating}</p>
                    <p>{message}</p>
                </div>
                    :
                 <></>
            }
                        </div>
                      </form>
                      </div>
                    </div>
                 </div>
             </div>
            
        </>
    )
}

export default Game