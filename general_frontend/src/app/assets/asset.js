import React, { createContext, useState, useContext } from 'react';
import { GridLayoutContext } from './grid-layout';

const Asset = (props) => {
  // contexts of Asset
  const [view, setView] = useState('default');
  const {layout, setLayout} = useContext(GridLayoutContext);
  const [assetLayout, setAssetLayout] = useState(layout.find((layout) => layout.i === props.name));

  console.log(assetLayout)

  return (
    <div className='w-full h-full'>
      <AssetContext.Provider value={{view, setView}}>
        <div className="w-full h-full">
            <small className="text-gray-500">
                Asset
            </small>
            <div className="outline outline-red-400 rounded-md w-full bg-white/50 h-full">
                {props.children.filter((child) => child.props.hasOwnProperty('type') === false || child.props.type.includes(view))}
            </div>
        </div>
      </AssetContext.Provider>
    </div>
  )
}

export default Asset
export const AssetContext = createContext();