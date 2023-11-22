import React, { cloneElement, createContext, useContext, useState } from 'react';
import {merge} from 'lodash'

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

const Asset= (props: AssetProps): JSX.Element => {
  const [view, setView] = useState<string>('default');
  const [externalProps, setExternalProps] = useState({});
  const [assetName, setAssetName] = useState<string>(props.name)

  const setViewWithProps = (view:string, props:any) => {
    setView(view)
    setExternalProps(props)
  }

  const prepareProps = (childProps) => {
    return merge(childProps, externalProps)
  }

  return (
    <>
      <div className="absolute -top-10 right-0">
        <button className='ml-2 py-1 px-2 bg-yellow-400 text-white mb-2 rounded-md' onClick={() => setViewWithProps("default", {})}>
          Default View
        </button>
        <button className='ml-2 py-1 px-2 bg-yellow-400 text-white mb-2 rounded-md' onClick={() => setViewWithProps("edit", {user: 123})}>
          Edit View
        </button>
      </div>
      <AssetContext.Provider value={{view, setView, assetName, setAssetName, setViewWithProps}}>
        {props.children.map((child:JSX.Element, index: number) => {
          if(child.props.hasOwnProperty('type') === false || child.props.type === view) {
            return(
              <div className='h-full w-full' key={index}>
                {cloneElement(child, prepareProps({index: props.index}))}
              </div>
            )
          }
        })}
      </AssetContext.Provider>
    </>
  )
}

export default Asset

// Best practice for unassigned Contexts: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value
export const AssetContext = createContext<AssetContextType | any>({});
export const useAssetContext = () => useContext(AssetContext);