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
  
  const {currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing} = useContext(GridLayoutContext);
  const parentLayout = currentLayout[assetName]

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [childrenSize, setChildrenSize] = useState(() => {
    return (localStorage.getItem(assetName))
      ? JSON.parse(localStorage.getItem(assetName))
      : {}
  })

  // always cast children to array for filtering and memorize them for better performance
  const children = React.Children.toArray(props.children).map((child, idx) => {
    // push empty view to childrenSize if not existent
    if(childrenSize[view] === undefined) childrenSize[view] = {}

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

    // prepare all elements to be visible in the grid
    return (
      <div 
        key={child.props.name} 
        name={child.props.name} 
        link={child.props.link} 
        placeholder={child.props.placeholder} 
        actions={child.props.actions} 
        data-grid={childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`]}
      >
      <div className='relative w-full h-full'>
        <div onClick={() => removeChild(child.props.name, child[`${parentLayout.w}x${parentLayout.h}`])} className='absolute top-1 right-1 bg-black text-white px-1 cursor-pointer'>x</div>
          {child}
        </div>
      </div>
    );
  });

  const collectActions = () => {
    children.filter((child, index) => {
      if(childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible) {
        
      }
    })
  }

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
  collectActions()

  const updateLayout = (event) => {
    // required because otherwhise the grid receives wrong sizes!
    if(currentlyResizing === false) {
      setChildrenSize((currentState) => {
        event.forEach((element, idx) => {
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

  const removeChild = (idx) => {
    setChildrenSize((currentState) => {
      currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`]['visible'] = false

      localStorage.setItem(assetName, JSON.stringify(currentState))
      return {...currentState};
    })
  }

  const addChild = (idx) => {
    setChildrenSize((currentState) => {
      currentState[view][idx][`${parentLayout.w}x${parentLayout.h}`]['visible'] = true

      localStorage.setItem(assetName, JSON.stringify(currentState))
      return {...currentState};
    })
  }

  const performAction = () => {}

  const updateCurrentBreakpoint = (event) => {
    setCurrentBreakpoint(event)
  }

  const handleActions = (action, event) => {
    // Check for Filter
    // Check for Edit etc
    // TODO: Beispiel für Route wechsel
    // TODO: Datenfluss noch abbilden

    if(action.startsWith('view.')) {
      setView(action.replace('view.', ''))
    }
    else if(action.startsWith('action.')) {
      performAction(action.replace('action.', ''))
    }
  }

  const exportLayout = () => console.debug(childrenSize)

  const handleFormData = (key, value) => {
    setFormData(currentState => {
      currentState[key] = value;
      return {...currentState};
		})
  }

  const handleFormSubmit = () => {
    console.log(formData)
  }

  return (
    <ViewContext.Provider value={{view, setView, data, fetchRequest, handleActions, handleFormData, handleFormSubmit}}>
      <div className="w-full h-full">
        
        <div className={`absolute z-40 top-0 bottom-0 right-0 rounded-md bg-white shadow-md border border-black transition-all ease-in-out ${sidebarOpen ? 'block w-[200px]' : 'hidden w-[0px]'}`}>
          <div className='p-2'>
            <p className='text-black'>
              Hidden Items {currentLayout[assetName].w}x{currentLayout[assetName].h}
            </p>
          </div>

          <div className='w-full h-full overflow-y-auto'>
            {Object.entries(childrenSize[view]).map(([idx, view]) => {
              let child = view[`${parentLayout.w}x${parentLayout.h}`]

              if(child.visible === false) {
                return ( 
                  <div onClick={() => addChild(idx, child)} className='text-black w-full p-2 first-of-type:border-t border-b border-black' key={idx}>
                    {idx}
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div className='absolute z-40 bottom-3 right-3 bg-black text-white rounded-md px-1'>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`transition-all ease-in-out flex flex-row gap-2 text-xs`}>
            {children.filter((child, index) => (childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible === false)).length} Elements hidden 
            <div className={`${sidebarOpen ? 'rotate-180' : ''} transition-all ease-in-out`}>►</div>
          </button>
        </div>
        
        <div className='flex flex-row justify-end items-center mb-2 absolute -top-10 right-0 gap-2'>
          <small className="text-gray-500">
              View: {view}
          </small>
          <div className="flex flex-row gap-2">
            <button className={`text-xs border border-yellow-400 rounded-md px-2 py-1`} onClick={exportLayout}>
              Export Layout
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
            isDraggable={isViewDraggable}
            isResizable={isViewResizable}
            margin={[0,0]}
            onBreakpointChange={updateCurrentBreakpoint}
            onLayoutChange={updateLayout}>
            {children.filter((child, index) => (childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </ViewContext.Provider>
  )
}

export default View
export const ViewContext = createContext();