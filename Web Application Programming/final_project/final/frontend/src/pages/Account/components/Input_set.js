import "./Input_set.css"
const Input_set = ({Text, Icon, accepted, API, Type}) => {
    return(
        <div className="Input_set">
                <input
                    type={Type}
                    id={Text}
                    value={accepted}
                    placeholder={Text}
                    onChange={(e) => API(e.target.value)}
                    required
                />
        </div>
    )
};
export default Input_set;