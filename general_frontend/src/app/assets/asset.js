import React, { createContext, useState, useContext } from 'react';
import { GridLayoutContext } from './grid-layout';

const Asset = (props) => {
  // contexts of Asset
  const [view, setView] = useState('default');
  const [assetName, setAssetName] = useState(props.name)

  return (
    <div className='w-full h-full'>
      <AssetContext.Provider value={{view, setView, assetName, setAssetName}}>
        <div className="w-full h-full">
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