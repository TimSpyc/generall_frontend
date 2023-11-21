import { useState, useEffect } from "react";
import { useViewContext } from "../assets/view";

const Input = (props) => {
  const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData} = useViewContext();
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
    <div className="w-full h-full shadow-sm">
        {data[props.link].isLoading === true &&
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        }

        {(data[props.link].isLoading === false && data[props.link].data) &&
          <input
            tabIndex={props.tabIndex}
            onInput={changeHandler}
            value={value}
            type="text"
            className="px-2 py-1 w-full h-full rounded-md border border-gray-400"
            placeholder={props.placeholder}
            name={props.linkKey}/>
        }
    </div>
  )
}

export default Input