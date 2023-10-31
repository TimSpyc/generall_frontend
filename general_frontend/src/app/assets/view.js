import React, { createContext, useState, useContext } from 'react';
import { AssetContext } from "./asset";
import { GridLayoutContext } from './grid-layout';
import useSWR from 'swr';
import { fetcher } from "../fetcher"
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const View = (props) => {
  const {view, setView} = useContext(AssetContext);
  const {layout, setLayout} = useContext(GridLayoutContext)

  // TODO: Get Children Size from Asset or Server
  const childrenSize = [
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 1, minHeight: 1
    },
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 2, minHeight: 1
    },
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 3, minHeight: 1
    },
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 1, minHeight: 1
    },
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 2, minHeight: 1
    },
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 3, minHeight: 1
    },
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 1, minHeight: 1
    },
    {
      sizes: [
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1},
        {x: 0, y: 0, w: 3, h: 1}
      ],
      minWidth: 1, minHeight: 1
    },
  ]

  // always cast children to array for filtering and memorize them for better performance
  const children = React.useMemo(() => {
		return React.Children.toArray(props.children).map((val, idx) => {
			return <div key={idx} data-grid={childrenSize[idx].sizes[layout ? layout[0].w : 0]}>{val}</div>;
		});
	}, [props.children]);

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

  return (
    <ViewContext.Provider value={{view, setView, data, fetchRequest}}>
      <div className="w-full h-full">
        <div className='flex flex-row justify-between w-full items-center mb-2 absolute -top-6 right-0'>
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
        <div className="outline outline-green-400 rounded-md relative bg-white/70 w-full h-full max-w-full max-h-full">
          <ResponsiveGridLayout 
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768 }}
				    cols={{
              lg: layout ? layout[0].w * 4 : 4, 
              md: layout ? layout[0].w * 2 : 2, 
              sm: layout ? layout[0].w * 1 : 1 
            }} 
            rowHeight={50}
            isDraggable={false}
            isResizable={false}
            margin={[0,0]}>
            {children.filter((child, index) => {
              return (childrenSize[index].minWidth <= (layout ? layout[0].w : 3)) && (childrenSize[index].minHeight <= (layout ? layout[0].h : 1))
            })}
          </ResponsiveGridLayout>
        </div>
      </div>
    </ViewContext.Provider>
  )
}

export default View
export const ViewContext = createContext();