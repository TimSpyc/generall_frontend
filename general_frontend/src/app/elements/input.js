import { useContext, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ViewContext } from "../assets/view";

const Input = (props) => {
  const {setView, resetToDefault, data, fetchRequest, handleActions, handleFormData} = useContext(ViewContext);
  const [value, setValue] = useState('');
  const [finishedLoading, setFinishedLoading] = useState(false)

  const changeHandler = (e) => {
    setValue(e.target.value)
    handleFormData([props.linkKey], e.target.value)
  }

  useEffect(() => {
    if(data[props.link].isLoading === false && finishedLoading === false) {
      setValue(data[props.link].data[props.linkKey])
      setFinishedLoading(true)
    }
  }, [data]);

  return (
    <div className="w-full h-full">
        {data[props.link].isLoading === true &&
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        }

        {(data[props.link].isLoading === false && data[props.link].data) &&
          <input
            onInput={changeHandler}
            value={value}
            type="text"
            className="border border-black px-2 py-1 w-full h-full"
            placeholder={props.placeholder}
            name={props.linkKey}/>
        }
    </div>
  )
}

export default Input