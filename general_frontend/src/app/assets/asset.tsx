import React, { cloneElement, createContext, useContext, useState } from 'react';

type AssetProps = {
  children: JSX.Element[],
  name: string,
  index?: number
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
    <AssetContext.Provider value={{view, setView, assetName, setAssetName}}>
      {props.children.map((child:JSX.Element, index: number) => {
        if(child.props.hasOwnProperty('type') === false || child.props.type.includes(view)) {
          return(
            <div className='h-full w-full' key={index}>
              {cloneElement(child, {index: props.index})}
            </div>
          )
        }
      })}
    </AssetContext.Provider>
  )
}

export default Asset

// Best practice for unassigned Contexts: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value
export const AssetContext = createContext<AssetContextType | any>({});
export const useAssetContext = () => useContext(AssetContext);