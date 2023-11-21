import { useContext } from "react";
import { ViewContext } from "../assets/view";

const SubmitButton = (props) => {
    const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData, handleFormSubmit} = useContext(ViewContext);

    return (
        <button onClick={handleFormSubmit} className="w-full h-full shadow-sm rounded-md border border-gray-400" tabIndex={props.tabIndex}>
            Submit
        </button>
    )
}

export default SubmitButton