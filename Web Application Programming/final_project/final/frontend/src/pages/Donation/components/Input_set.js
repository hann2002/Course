
import "./Input_set.css"
const Input_set = ({Text, Icon, accepted, API}) => {
    return(
        <div className="Input_set">
            <label htmlFor="name">{Text}</label>
            <div className="input-container">
                <img src= {Icon} alt="Your image description" />
                <input
                    type="text"
                    id={Text}
                    value={accepted}
                    onChange={(e) => API(e.target.value)}
                    required
                  />
            </div>
        </div>
    )
};
export default Input_set;