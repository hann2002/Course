import "./Choosemoney.css"


const Choosemoney = ({sponsors, activeSponsorIndex, handleSponsorClick, GO_Click}) => {
    return (
      <div style={{display: "flex", flexDirection: "column", width:"100%", height:"500px"}}>
          <div style = {{height:"480px"}}>
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className={`sponsor-box ${activeSponsorIndex === index ? "selected" : ""}`}
              onClick={() => handleSponsorClick(index)}
            >
              <div className="sponsor-box-left">
                <h1>{sponsor.title}</h1>
              </div>
              <div className="sponsor-box-right">
                <h2>{sponsor.price}</h2>
                <h3>每月</h3>
              </div>
            </div>
          ))}
          </div>
          <div>
        <button type="submit" onClick={GO_Click}>Submit</button >
        </div>
        </div>
    );
  };  
export default Choosemoney;