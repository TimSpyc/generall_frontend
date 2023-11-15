import React, { createContext, useState, useContext, cloneElement } from 'react';
import { AssetContext, useAssetContext } from "./asset";
import { GridLayoutContext, useGridLayoutContext } from './grid-layout';
import useSWR from 'swr';
import { fetcher } from "../fetcher"
import { Responsive, WidthProvider } from "react-grid-layout";
import {sortBy} from "lodash"

const ResponsiveGridLayout = WidthProvider(Responsive);

type ViewChildren = {
  key: string,
  children: JSX.Element[],
  props: any
  type: any
}

type ViewProps = {
  children: ViewChildren[],
  api: object
}

type AssetContextType = {
  view: string,
  setView: Function,
  assetName: string,
  setAssetName: Function
}

const View = (props: ViewProps) => {
  const {view, setView, assetName} = useAssetContext();
  const {currentLayout, isViewDraggable, isViewResizable, currentlyResizing} = useGridLayoutContext();

  const parentLayout = currentLayout[assetName]

  const [currentBreakpoint, setCurrentBreakpoint] = useState()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [childrenSize, setChildrenSize] = useState(() => {
    return (localStorage.getItem(assetName))
      ? JSON.parse(localStorage.getItem(assetName)!)
      : {}
  })

  // always cast children to array for filtering and memorize them for better performance
  const processedChildren = () => {
    // push empty view to childrenSize if not existent
    if(childrenSize[view] === undefined) childrenSize[view] = {}

    // prepare the children Sizes for parsing afterwards
    React.Children.toArray(props.children).map((child:any) => {
      // push all sizes to view if not existent
      if(childrenSize[view].hasOwnProperty(child.props.name) === false) {
        childrenSize[view][child.props.name] = {
          "1x1": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "1x2": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "1x3": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "2x1": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "2x2": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "2x3": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "3x1": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "3x2": {x: 0, y: 0, w: 1, h: 1, visible: false},
          "3x3": {x: 0, y: 0, w: 1, h: 1, visible: false},
        }
      }
    })

    let indizes:any = []
    
    React.Children.toArray(props.children).map((child:any) => {
      let element = childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`]
      element["i"] = child.props.name
      indizes.push(childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`])
    })

    let sortedIndizes:any = sortBy(indizes, ['x', 'y'])

    return React.Children.toArray(props.children).map((child:any) => {
      // prepare all elements to be visible in the grid
      return (
        <div key={child.props.name} data-grid={childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`]}>
        <div className='relative w-full h-full'>
          <div onClick={() => removeChild(child.props.name)} className='absolute top-1 right-1 bg-black text-white px-0.5 leading-[initial] cursor-pointer border border-white'>x</div>
            {cloneElement(child, {
              tabIndex: sortedIndizes.findIndex((element:any) => element.i === child.props.name) + 1,
              gridSize: childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`]
            })}
          </div>
        </div>
      );
    });
  }

  const collectActions = () => {
    processedChildren().filter((child:any) => {
      if(childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible) {
        
      }
    })
  }

  const data:any = {}

  const fetchRequests = () => {
    for (const [key, value] of Object.entries(props.api)) {
      fetchRequest(key, value)
    }
  }

  const fetchRequest = (key:string, value:any, params?:any) => {
    // TODO: If filter is set use a custom key in object to store the data. Also check if this Object is destroyed when the Component umnounts
    // also possible to use data_filtered and make it available in the Content, clear it when Filter is unset
    return data[key] = useSWR(value.url, fetcher)
  }

  const updateLayout = (event:any) => {
    // required because otherwhise the grid receives wrong sizes!
    if(currentlyResizing === false) {
      setChildrenSize((currentState:any) => {
        event.forEach((element:any) => {
          currentState[view][element.i][`${parentLayout.w}x${parentLayout.h}`].w = element.w
          currentState[view][element.i][`${parentLayout.w}x${parentLayout.h}`].h = element.h
          currentState[view][element.i][`${parentLayout.w}x${parentLayout.h}`].x = element.x
          currentState[view][element.i][`${parentLayout.w}x${parentLayout.h}`].y = element.y
        })

        localStorage.setItem(assetName, JSON.stringify(currentState))
        return {...currentState};
      })
    }
  }

  const removeChild = (idx:string) => {
    setChildrenSize((currentState:any) => {
      currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`]['visible'] = false

      localStorage.setItem(assetName, JSON.stringify(currentState))
      return {...currentState};
    })
  }

  const addChild = (idx:string) => {
    setChildrenSize((currentState:any) => {
      currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`]['visible'] = true

      localStorage.setItem(assetName, JSON.stringify(currentState))
      return {...currentState};
    })
  }

  const performAction = (action:string) => {}

  const updateCurrentBreakpoint = (event:any) => {
    setCurrentBreakpoint(event)
  }

  const handleActions = (action:string, event:any) => {
    if(action.startsWith('view.')) {
      setView(action.replace('view.', ''))
    }
    else if(action.startsWith('action.')) {
      performAction(action.replace('action.', ''))
    }
  }

  const exportLayout = () => console.debug(childrenSize)

  const handleFormData = (key:string, value:any) => {
    setFormData((currentState:any) => {
      currentState[key] = value;
      return {...currentState};
		})
  }

  const handleFormSubmit = () => {
    console.log(formData)
  }

  fetchRequests()
  collectActions()

  return (
    <ViewContext.Provider value={{view, setView, data, fetchRequest, handleActions, handleFormData, handleFormSubmit}}>
      <div className="w-full h-full">
        
        <div className={`absolute z-40 top-0 bottom-0 right-0 bg-white shadow-md border border-black transition-all ease-in-out ${sidebarOpen ? 'block w-[200px]' : 'hidden w-[0px]'}`}>
          <div className='p-2'>
            <p className='text-black'>
              Hidden Items {currentLayout[assetName].w}x{currentLayout[assetName].h}
            </p>
          </div>

          <div className='w-full h-full overflow-y-auto'>
            {Object.entries(childrenSize[view]).map(([idx, view]:any) => {
              let child = view[`${parentLayout.w}x${parentLayout.h}`]

              if(child.visible === false) {
                return ( 
                  <div onClick={() => addChild(idx)} className='text-black w-full p-2 first-of-type:border-t border-b border-black' key={idx}>
                    {idx}
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div className='absolute z-40 bottom-3 right-3 bg-black text-white px-1'>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`transition-all ease-in-out flex flex-row gap-2 text-xs`}>
            {processedChildren().filter((child:any) => (childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible === false)).length} Elements hidden 
            <div className={`${sidebarOpen ? 'rotate-180' : ''} transition-all ease-in-out`}>
              ►
            </div>
          </button>
        </div>

        <div className="outline outline-green-400 relative bg-white/70 w-full h-full max-w-full max-h-full">
          <ResponsiveGridLayout 
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768 }}
				    cols={{lg: 36, md: 24, sm: 12}}
            rowHeight={50}
            isDraggable={isViewDraggable}
            isResizable={isViewResizable}
            margin={[0,0]}
            onBreakpointChange={updateCurrentBreakpoint}
            onLayoutChange={updateLayout}>
            {processedChildren().filter((child:any) => (childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </ViewContext.Provider>
  )
}

export default View
export const ViewContext = createContext({});