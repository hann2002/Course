import "./Layer2.css"
import donationTeamImg from "../../../picture/donation_team.png";
import donationThankImg from "../../../picture/doantion_thank.png";


import React, { useState, useEffect } from "react";
import Choose_money from './Choosemoney';
import Form_profile from './Form_profile';



const sentences = [
    "台灣也有許多優秀的環保團體，例如：「自然保育聯盟」、「綠色公民行動聯盟」、「綠色和平基金會」、「綠盟」等，這些團體不僅在推廣環保理念和環保法制方面發揮了積極的作用，也在現場組織各種環保活動，讓更多人參與到環保行動中來，共同保護我們的地球家園。",
    "如果您也關心環境保護事業，可以考慮捐款支持這些環保團體的工作。您的捐款將被用於推動更多環保活動和倡議，幫助我們更好地保護自然環境和生態系統，保障人類和地球的健康和未來。讓我們一起行動起來，為環保事業出一份力！"
];

const steps = [
    {label:'選擇金額', active:true},
    {label:'填寫資料', active:false},
    {label:'完成捐款', active:false}
];



const sponsors = [
    {
        title: '贊助一項環保計畫，一起守護地球家園！您的力量，我們的未來！',
        price: '$500',
        active: false
    },
    {
        title: '支持綠色環保，推動環保事業發展！讓我們攜手為地球盡一份心力！',
        price: '$1000',
        active: false
    },
    {
        title: '成為綠色行動的支持者！讓我們攜手保護地球，創造更美好的明天！我們可以一起改變世界！',
        price: '$2000',
        active: false
    }
];


const Layer2 = () => {
    
    /* step */

    const [currentStep, setCurrentStep] = useState(0);
    const [isSponsorContainer1Visible, setIsSponsorContainer1Visible] = useState(true);
    const [isSponsorContainer2Visible, setIsSponsorContainer2Visible] = useState(false);
    const [isSponsorContainer3Visible, setIsSponsorContainer3Visible] = useState(false);
    if (currentStep === 0){
        steps[0].active = true;
        steps[1].active = false;
        steps[2].active = false;

    };
    const handleClick = () => {
        const newSteps = [...steps];
        newSteps[currentStep].active = false;
        newSteps[currentStep + 1].active = true;
        setCurrentStep(currentStep + 1);
      
        if (currentStep === 0) {
          setIsHovered(false);
          setIsClicked(true);
          setIsSponsorContainer1Visible(false);
          setIsSponsorContainer2Visible(true);
        } else if (currentStep === 1) {
          setIsHovered(true);
          setIsSponsorContainer2Visible(false);
          setIsSponsorContainer3Visible(true);
        } else if (currentStep === 2) {
          setIsHovered(false);
          setIsClicked(false);
          setActiveSponsorIndex(-1);
          setIsSponsorContainer2Visible(false);
          setIsSponsorContainer3Visible(true);

        } else if (currentStep === 3) {
          setIsSponsorContainer2Visible(false);
          setIsSponsorContainer3Visible(true);
          // 完成捐款，可以在這裡添加相應的代碼
        }
      };
      
      
      
    const lastStepIndex = steps.length - 1;

    const [activeSponsorIndex, setActiveSponsorIndex] = useState(-1);
    const handleSponsorClick = (index) => {
        setActiveSponsorIndex(index);
    };

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);



    useEffect(() => {
        if (isClicked) {
        // 如果按下後，將isClicked設置為true
        // 這裡可以添加更改div A的樣式的代碼
        }
    }, [isClicked]);
    return (
        <div className="layer2">
            <div className="left">
                {sentences.map((sentence, index) => (
                    <p key={index}>{sentence}</p>
                ))}
                <img className="donation_team" src={donationTeamImg} alt="donation_team" />
            </div>
            <div className="right">
                <div className="stage-container">
                    {steps.map((step, index) => (
                        <div key={index} className={step.active ? "stage-box active2" : "stage-box"}>
                            {step.label}
                        </div>
                ))}
                </div>
                {isSponsorContainer1Visible && (
                    <div className="sponsor-container">
                       <Choose_money sponsors={sponsors} activeSponsorIndex={activeSponsorIndex} handleSponsorClick={handleSponsorClick} GO_Click={handleClick}/>   
                    </div>  
                )
                }
                {isSponsorContainer2Visible && (
                    <div className="sponsor-container">
                        <Form_profile GO_Click={handleClick} money_index = {activeSponsorIndex}/>
                    </div>  
                )}
                {isSponsorContainer3Visible && (
                    <div>
                        <h2>感謝您的捐款</h2>
                       <img className="donation_thank" src={donationThankImg} alt="donation_thank" />
                    </div>  
                )}                
            </div>  
        </div>
    );
};
export default Layer2;