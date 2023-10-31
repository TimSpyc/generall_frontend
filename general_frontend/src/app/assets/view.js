import React, { createContext, useState, useContext } from 'react';
import { GeneralAssetContext } from "./general-asset";
import useSWR from 'swr';
import {fetcher} from "../fetcher"
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const ViewContext = createContext();

export default function View(props) {
  const [draggable, setDraggable] = useState(false)
  const {view, setView} = useContext(GeneralAssetContext);
  const [filters, setFilters] = useState(null)

  const data = {}

  // always cast children to array for filtering
  let children = React.Children.toArray(props.children)

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

  const responsivelayouts = {
		lg: [{ i: ".0", x: 6, y: 0, w: 6, h: 6, minW: 4, maxW: 12 }],
	}

  const toggleDraggable = () => {
		setDraggable(!draggable)
	}

  fetchRequests()

  return (
    <ViewContext.Provider value={{view, setView, data, fetchRequest}}>
      <div className="w-full">
        <button className='rounded-md border border-gray-900 text-sm px-2 py-0.5' onClick={() => toggleDraggable()}>
          {draggable ? 'Disable Dragging' : 'Enable Dragging'}
        </button>
        <div className='flex flex-row justify-between w-full items-center mb-2'>
          <small className="text-gray-500">
              View: {view}
          </small>
          <div className="flex flex-row gap-2">
            <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => setView("default")}>
              Default
            </button>
            <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => setView("detail")}>
              Detail
            </button>
            <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => setView("edit")}>
              Edit
            </button>
            <button className="text-xs border border-yellow-400 rounded-md px-2 py-1" onClick={() => setView("filters")}>
              Filter
            </button>
          </div>
        </div>
        <div className="border border-green-400 rounded-md w-full relative bg-white/70">
          <ResponsiveGridLayout className="layout min-h-screen min-w-screen" layout={responsivelayouts} 
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }} 
            rowHeight={400}
            isDraggable={draggable} 
            isResizable={draggable}
            margin={[0,0]}>
            {children}
          </ResponsiveGridLayout>
        </div>
      </div>
    </ViewContext.Provider>
  )
}