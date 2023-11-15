import React, { createContext, useState } from 'react';

const Asset = ({children, name}) => {
  const [view, setView] = useState('default');
  const [assetName, setAssetName] = useState(name)

  return (
    <div className='w-full h-full'>
      <AssetContext.Provider value={{view, setView, assetName, setAssetName}}>
        <div className="w-full h-full">
            <div className="outline outline-red-400 rounded-md w-full bg-white/50 h-full">
                {children.filter((child) => child.props.hasOwnProperty('type') === false || child.props.type.includes(view))}
            </div>
        </div>
      </AssetContext.Provider>
    </div>
  )
}

export default Asset
export const AssetContext = createContext();