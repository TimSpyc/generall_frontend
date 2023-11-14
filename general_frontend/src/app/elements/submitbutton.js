import { useContext, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ViewContext } from "../assets/view";

const SubmitButton = () => {
    const {setView, resetToDefault, data, fetchRequest, handleActions, handleFormData, handleFormSubmit} = useContext(ViewContext);

    return (
        <button onClick={handleFormSubmit} className="bg-blue-400 text-white w-full h-full text-center">
            Submit
        </button>
    )
}

export default SubmitButton