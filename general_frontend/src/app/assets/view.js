import React, { createContext, useState, useContext } from 'react';
import { AssetContext } from "./asset";
import { GridLayoutContext } from './grid-layout';
import useSWR from 'swr';
import { fetcher } from "../fetcher"
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const View = (props) => {
  const {view, setView} = useContext(AssetContext);
  const {assetName} = useContext(AssetContext);
  const {currentLayout, updateGridEditable} = useContext(GridLayoutContext);

  const [isDraggable, setIsDraggable] = useState(false)
  const [isResizable, setIsResizable] = useState(false)

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const parentLayout = currentLayout.find((layout) => layout.i === assetName)

  const [childrenSize, setChildrenSize] = useState(() => {
    if(localStorage.getItem(assetName)) {
      return JSON.parse(localStorage.getItem(assetName))
    }
    else {
      return {
        default: [
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
        ],
        detail: [
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
        ],
        edit: [
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
        ],
        filters: [
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
          {
            "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
            "3x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
          },
        ],
      }
    }
  })

  // always cast children to array for filtering and memorize them for better performance
  const children = React.Children.toArray(props.children).map((val, idx) => {
    return <div key={idx} data-grid={childrenSize[view][idx][`${parentLayout.w}x${parentLayout.h}`]}>
      <div className='relative w-full h-full'>
        <div onClick={() => removeChild(idx, val[`${parentLayout.w}x${parentLayout.h}`])} className='absolute top-1 right-1 bg-black text-white px-1'>x</div>
          {val}
        </div>
      </div>;
  });

  const data = {}

  const fetchRequests = () => {
    for (const [key, value] of Object.entries(props.api)) {
      fetchRequest(key, value)
    }
  }

  const fetchRequest = (key, value, params) => {
    // TODO: If filter is set use a custom key in object to store the data. Also check if this Object is destroyed when the Component umnounts
    // also possible to use data_filtered and make it available in the Content, clear it when Filter is unset
    return data[key] = useSWR(value.url, fetcher)
  }

  fetchRequests()

  const updateLayout = (event) => {
    setChildrenSize((currentState) => {
      event.forEach((element, idx) => {
        currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`].w = element.w
        currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`].h = element.h
        currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`].x = element.x
        currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`].y = element.y
      })

      localStorage.setItem(assetName, JSON.stringify(currentState))
      return {...currentState};
    })
  }

  const removeChild = (idx, child) => {
    setChildrenSize((currentState) => {
      currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`]['visible'] = false

      localStorage.setItem(assetName, JSON.stringify(currentState))
      return {...currentState};
    })
  }

  const addChild = (idx, child) => {
    setChildrenSize((currentState) => {
      currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`]['visible'] = true

      localStorage.setItem(assetName, JSON.stringify(currentState))
      return {...currentState};
    })
  }

  const exportLayout = () => {
    console.debug(childrenSize)
  }

  const updateIsDraggable = () => {
    updateGridEditable(!isDraggable)
    setIsDraggable(!isDraggable)
  }

  const updateIsResizeable = () => {
    setIsResizable(!isResizable)
  }

  return (
    <ViewContext.Provider value={{view, setView, data, fetchRequest}}>
      <div className="w-full h-full">
        <div className="absolute z-40 top-0 bottom-0 right-0 w-[200px] border border-white rounded-md bg-white">
          <div className='p-2'>
            <p className='text-black'>
              Hidden Items {currentLayout.find((layout) => layout.i === assetName).w}x{currentLayout.find((layout) => layout.i === assetName).h}
            </p>
          </div>

          <div className='w-full h-full overflow-y-auto'>
            {childrenSize[view].map((val, idx) => {
              let child = val[`${parentLayout.w}x${parentLayout.h}`]
              if(child.visible === false) {
                return ( 
                  <div onClick={() => addChild(idx, child)} className='text-black w-full p-2 border border-black' key={idx}>
                  item {idx + 1}
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div className='flex flex-row justify-between w-full items-center mb-2 absolute -top-10 right-0'>
          <small className="text-gray-500">
              View: {view}
          </small>
          <div className="flex flex-row gap-2">
            <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => exportLayout()}>
              Export Layout
            </button>
            <button className={`text-xs border border-yellow-400 rounded-md px-2 py-1 ${(isDraggable ? 'bg-yellow-400' : '')}`} onClick={() => updateIsDraggable()}>
              Draggable
            </button>
            <button className={`text-xs border border-yellow-400 rounded-md px-2 py-1" ${(isResizable ? 'bg-yellow-400' : '')}`} onClick={() => updateIsResizeable()}>
              Resizable
            </button>
            <button className={`text-xs border border-yellow-400 rounded-md px-2 py-1`} onClick={() => setView("default")}>
              Default
            </button>
            <button className={`text-xs border border-yellow-400 rounded-md px-2 py-1`} onClick={() => setView("detail")}>
              Detail
            </button>
            <button className={`text-xs border border-yellow-400 rounded-md px-2 py-1`} onClick={() => setView("edit")}>
              Edit
            </button>
            <button className={`text-xs border border-yellow-400 rounded-md px-2 py-1`} onClick={() => setView("filters")}>
              Filter
            </button>
          </div>
        </div>
        <div className="outline outline-green-400 rounded-md relative bg-white/70 w-full h-full max-w-full max-h-full">
          <ResponsiveGridLayout 
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768 }}
				    cols={{lg: 36, md: 24, sm: 12}}
            rowHeight={50}
            isDraggable={isDraggable}
            isResizable={isResizable}
            margin={[0,0]}
            onBreakpointChange={setCurrentBreakpoint}
            onLayoutChange={updateLayout}>
            {children.filter((child, index) => {
              return (
                childrenSize[view][index][`${parentLayout.w}x${parentLayout.h}`].visible
              )
            })}
          </ResponsiveGridLayout>
        </div>
      </div>
    </ViewContext.Provider>
  )
}

export default View
export const ViewContext = createContext();