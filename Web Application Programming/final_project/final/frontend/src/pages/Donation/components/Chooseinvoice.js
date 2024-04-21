import "./Chooseinvoice.css"
const Chooseinvoice = ({Option, accepted, Text, API}) => {
    return (
      <div className="radio-group">
          <input
              type="radio"
              id={Option}
              name="receipt"
              value={accepted}
              onChange={API}
          />
          <label htmlFor={Option}>{Text}</label>
      </div>
      
    );
    
  };  
export default Chooseinvoice;