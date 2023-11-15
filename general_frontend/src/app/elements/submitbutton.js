import { useContext } from "react";
import { ViewContext } from "../assets/view";

const SubmitButton = (props) => {
    const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData, handleFormSubmit} = useContext(ViewContext);

    return (
        <button onClick={handleFormSubmit} className="bg-blue-400 text-white w-full h-full text-center" tabIndex={props.tabIndex}>
            Submit
        </button>
    )
}

export default SubmitButton