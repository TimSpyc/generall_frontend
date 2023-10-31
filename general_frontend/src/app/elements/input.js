import { useContext, useState, forwardRef, useImperativeHandle } from "react";
import { ViewContext } from "../assets/view";

const Input = (props) => {
  const {setView, resetToDefault, data, fetchRequest} = useContext(ViewContext);

  const navigate = (direction) => {
    let next = props?.actions?.hasOwnProperty(direction)
      ? direction =! true
        ? props.actions[direction]
        : direction
      : direction
    
    setView(next)
  }

  return (
    <div className="w-full h-full">
        {data[props.link].isLoading === true &&
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        }

        {data[props.link].isLoading === false &&
          <input type="text" className="border border-black px-2 py-1 w-full h-full" placeholder="example"/>
        }
    </div>
  )
}

export default Input