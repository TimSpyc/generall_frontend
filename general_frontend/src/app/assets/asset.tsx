import React, { createContext, useContext, useState } from 'react';

type AssetChildrenType = {
  props: {
    type: string
  },
  type: string,
  key: string,
  children: JSX.Element[]
}

type AssetProps = {
  children: AssetChildrenType[]
  name: string
}

type AssetContextType = {
  view: string,
  setView: Function,
  assetName: string,
  setAssetName: Function
}

const Asset= (props: AssetProps) => {
  const [view, setView] = useState<string>('default');
  const [assetName, setAssetName] = useState<string>(props.name)

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

// Best practice for unassigned Contexts: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value
export const AssetContext = createContext<AssetContextType | any>({});
export const useAssetContext = () => useContext(AssetContext);