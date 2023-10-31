import { useContext, useState, forwardRef, useImperativeHandle } from "react";
import { ViewContext } from "./view";
import { AssetContext } from "./general-asset";

const AssetExample = forwardRef(({style, className, onMouseDown, onMouseUp, onTouchEnd, ...props}, ref) => {
  const {setView, resetToDefault, data, fetchRequest} = useContext(ViewContext);

  const navigate = (direction) => {
    let next = props?.actions?.hasOwnProperty(direction)
      ? direction =! true
        ? props.actions[direction]
        : direction
      : direction
    
    setView(next)
  }

  fetchRequest(props.link, {url: 'https://dummyjson.com/users'})

  return (
    <div style={{...style}} className={className} ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchEnd={onTouchEnd}>
        {data[props.link].isLoading === true &&
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        }

        {data[props.link].isLoading === false &&
          <div className="border border-blue-400 rounded-md w-full h-full relative bg-white">
              <div className="p-2">
                  This is an example Asset (like a Chart, Diagram etc.) to show the functionality of the Upper Asset Group and Assets Wrapper

                  <div className="w-full mt-4 flex flex-row gap-2">
                    <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => navigate("default")}>
                      Default
                    </button>
                    <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => navigate("detail")}>
                      Detail
                    </button>
                    <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => navigate("edit")}>
                      Edit
                    </button>
                    <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => navigate("filters")}>
                      Filter
                    </button>
                  </div>
              </div>
          </div>
        }
    </div>
  )
})

export default AssetExample