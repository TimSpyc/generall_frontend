import React, { createContext, useState, useContext, cloneElement, ReactElement } from 'react';
import useSWR from 'swr';
import { useAssetContext } from "./asset";
import { useGridLayoutContext } from './grid-layout';
import { fetcher, swrConfig } from "../api"
import { Responsive, WidthProvider } from "react-grid-layout";
import { sortBy } from "lodash"

const ResponsiveGridLayout = WidthProvider(Responsive);

type ViewProps = {
  children: JSX.Element[] | JSX.Element,
  api: object
  type: string,
  index?: number
}

type ViewContextType = {
  view: string,
  setView: Function,
  data: object,
  FetchRequest: Function,
  handleFormData: Function,
  handleFormSubmit: Function,
}

type IndizesType = {
  x: number,
  y: number,
  w: number,
  h: number,
  visible: boolean
}

type CurrentStateType = {
  [key:string]: {
    [key:string]: IndizesType
  }
}

type LayoutElementType = {
  w: number,
  h: number,
  x: number,
  y: number,
  i: string,
  isBounded: boolean,
  isDraggable: boolean,
  isResizable: boolean,
  resizeHandles: [],
  moved: boolean,
  static: boolean,
}

const View = (props: ViewProps): JSX.Element => {
  const {view, setView, assetName, setAssetName, setViewWithProps, handleActions} = useAssetContext();
  const {currentLayout, isViewDraggable, isViewResizable, currentlyResizing} = useGridLayoutContext();

  const parentLayout = currentLayout[assetName]

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [childrenSize, setChildrenSize] = useState(() => {
    return (localStorage.getItem(assetName))
      ? JSON.parse(localStorage.getItem(assetName)!)
      : {}
  })

  let data:any = {}

  // always cast children to array for filtering and memorize them for better performance
  const processedChildren = () => {
    // push empty view to childrenSize if not existent
    if(childrenSize[view] === undefined) childrenSize[view] = {}

    // prepare the children Sizes for parsing afterwards
    React.Children.map(props.children, (child:JSX.Element, index: number) => {
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

    // prepare the indizes for all child elements
    let indizes:IndizesType[] = []
    
    React.Children.map(props.children, (child:JSX.Element, index: number) => {
      let element = childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`]
      element["i"] = child.props.name
      indizes.push(childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`])
    })

    let sortedIndizes:IndizesType[] = sortBy(indizes, ['y','x'])

    return React.Children.toArray(props.children).map((child:any) => {
      // prepare all elements to be visible in the grid
      return (
        <div key={child.props.name} data-grid={childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`]}>
            <div className='relative w-full h-full p-1'>
              {isViewDraggable &&
                <div onClick={() => removeChild(child.props.name)} className='absolute top-1.5 right-1.5 w-4 h-4 bg-gray-600 rounded-full text-xs shadow-md text-white leading-[initial] cursor-pointer border border-white flex items-center justify-center'>
                  <span>x</span>
                </div>
              }
              {cloneElement(child, {
                key: child.props.name,
                tabIndex: `${props.index}000${sortedIndizes.findIndex((element:any) => element.i === child.props.name) + 1}`,
                gridSize: childrenSize[view][child.props.name][`${parentLayout.w}x${parentLayout.h}`]
              })}
            </div>
        </div>
      )
    });
  }

  const useFetchRequests = async() => {
    for (const [key, value] of Object.entries(props.api)) {
      useFetchRequest(key, value)
    }
  }

  const useFetchRequest = async (key:string, value:any) => {
    let url = value.url.endsWith('/') ? value.url : `${value.url}/`
    let params = value.params ? `?${new URLSearchParams(value.params).toString()}` : ''

    console.log(value)

    return data[key] = useSWR(`${url}${value.id ? value.id : ''}${params}`, fetcher, swrConfig)
  }

  const updateLayout = (currentLayout: LayoutElementType[]) => {
    // required because otherwhise the grid receives wrong sizes!
    if(currentlyResizing === false) {
      setChildrenSize((currentState:CurrentStateType[]) => {
        currentLayout.forEach((layoutElement:LayoutElementType) => {
          currentState[view][layoutElement.i][`${parentLayout.w}x${parentLayout.h}`].w = layoutElement.w
          currentState[view][layoutElement.i][`${parentLayout.w}x${parentLayout.h}`].h = layoutElement.h
          currentState[view][layoutElement.i][`${parentLayout.w}x${parentLayout.h}`].x = layoutElement.x
          currentState[view][layoutElement.i][`${parentLayout.w}x${parentLayout.h}`].y = layoutElement.y
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

  const handleFormData = (key:string, value:any) => {
    setFormData((currentState:any) => {
      currentState[key] = value;
      return {...currentState};
		})

    console.log(formData)
  }

  const handleFormSubmit = (event:Event) => {
    console.log(event)
  }

  useFetchRequests()

  return (
    <ViewContext.Provider value={{view, setView, data, useFetchRequest, handleFormData, handleFormSubmit}}>
        {isViewDraggable &&
        <>
          <div className={` 
            ${sidebarOpen ? 'block w-[200px]' : 'hidden w-[0px]'} 
            absolute z-40 top-2 bottom-2 left-0 -translate-x-full bg-white shadow-md rounded-md transition-all ease-in-out
          `}>
            <div className='p-2 py-3 w-full shadow-md'>
              <p className='text-black'>
                Hidden Items {currentLayout[assetName].w}x{currentLayout[assetName].h}
              </p>
            </div>

            {childrenSize[view] &&
              <div className='w-full h-full overflow-y-auto'>
                {Object.entries(childrenSize[view]).map(([idx, view]:any) => {
                  if(view[`${parentLayout.w}x${parentLayout.h}`].visible === false) {
                    return ( 
                      <div onClick={() => addChild(idx)} className='text-black w-full p-2 px-3 first-of-type:border-t border-b border-black cursor-crosshair' key={idx}>
                        {idx}
                      </div>
                    )
                  }
                })}
              </div>
            }
          </div>

          <div className={`absolute z-40 bottom-4 left-4 bg-gray-800 text-white px-1 py-0.5 rounded-md shadow-md`}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`transition-all ease-in-out flex flex-row gap-2 text-xs`}>
              <div className={`${sidebarOpen ? 'rotate-180' : ''} transition-all ease-in-out`}>
                ►
              </div>
              {processedChildren().filter((child:any) => (childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible === false)).length} Elements hidden 
            </button>
          </div>
        </>
        }

        <div className="p-2 w-full h-full max-w-full max-h-full">
          <div className="relative bg-white shadow-md rounded-md w-full h-full max-w-full max-h-full">
            <ResponsiveGridLayout 
              className="layout"
              breakpoints={{ lg: 1301, md: 868, sm: 434 }}
              cols={{lg: 36, md: 24, sm: 12}}
              rowHeight={50}
              isDraggable={isViewDraggable}
              isResizable={isViewResizable}
              margin={[0,0]}
              onLayoutChange={(event) => updateLayout(event)}>
              {processedChildren().filter((child:any) => (childrenSize[view][child.key][`${parentLayout.w}x${parentLayout.h}`].visible))}
            </ResponsiveGridLayout>
          </div>
        </div>
    </ViewContext.Provider>
  )
}

export default View

export const ViewContext = createContext<ViewContextType | any>({});
export const useViewContext = () => useContext(ViewContext);