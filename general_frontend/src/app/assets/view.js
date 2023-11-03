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
  const {currentLayout} = useContext(GridLayoutContext);

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')

  // TODO: Get Children Size from Asset or Server
  // Make 3 Variations for specific sizes
  const childrenSize = {
    default: [
      {
        "1x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
        "1x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
        "1x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
        "2x1": {x: 0, y: 0, w: 3, h: 1, visible: true},
        "2x2": {x: 0, y: 0, w: 3, h: 1, visible: true},
        "2x3": {x: 0, y: 0, w: 3, h: 1, visible: true},
        "3x1": {x: 0, y: 0, w: 3, h: 1, visible: false},
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
    ]
  }

  // always cast children to array for filtering and memorize them for better performance
  const children = React.Children.toArray(props.children).map((val, idx) => {
    return <div key={idx} data-grid={childrenSize[view][idx][
      `${currentLayout.find((layout) => layout.i === assetName).w}x${currentLayout.find((layout) => layout.i === assetName).h}`
    ]}>{val}</div>;
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
    // TODO: send new Data to Server
    console.log(event, view)
  }

  return (
    <ViewContext.Provider value={{view, setView, data, fetchRequest}}>
      <div className="w-full h-full">
        <div className='flex flex-row justify-between w-full items-center mb-2 absolute -top-10 right-0'>
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
				    cols={{lg: 12, md: 6, sm: 3}}
            rowHeight={50}
            isDraggable={true}
            isResizable={true}
            margin={[0,0]}
            onBreakpointChange={setCurrentBreakpoint}
            onLayoutChange={updateLayout}>
            {children.filter((child, index) => {
              return (
                childrenSize[view][index][
                  `${currentLayout.find((layout) => layout.i === assetName).w}x${currentLayout.find((layout) => layout.i === assetName).h}`
                ].visible
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