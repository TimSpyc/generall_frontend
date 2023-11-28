import React, { ReactElement, cloneElement, createContext, useContext, useState } from 'react';
import { merge } from 'lodash'
import { AssetProps, AssetContextType } from '../types/asset-types';

const Asset= (props: AssetProps): JSX.Element => {
  // Throw an Error if not View with the default type is present
  if(props.children.filter((child:ReactElement) => child.props.type === (props.defaultView ? props.defaultView : 'default')).length <= 0) {
    throw new Error(`KnowledgeHub: Specify exact one default page or change the defaultView Property on your asset to have an existing default page assigned`)
  }
  
  const [view, setView] = useState<string>(props.defaultView ? props.defaultView : 'default');
  const [externalProps, setExternalProps] = useState<any>({});
  const [assetName, setAssetName] = useState<string>(props.name)

  // TODO: remove, temporary
  const [nextID, setNextID] = useState<number>(0)

  const setViewWithProps = (view:string, props:any) => {
    setView(view)
    setExternalProps(props)
  }

  const prepareProps = (child:ReactElement, index:number) => {
    // merge the api endpoints and overwrite them accordingly
    externalProps['index'] = index
    return merge(externalProps, child.props)
  }

  return (
    <>
      <div className="absolute -top-10 right-0 flex flex-row gap-2">
        <button className='ml-2 py-1 px-2 bg-yellow-400 text-white mb-2 rounded-md' onClick={() => setViewWithProps("default", {api: {post: { id:2 }, user: { id:2 }}})}>
          Default View
        </button>
        <button className='ml-2 py-1 px-2 bg-yellow-400 text-white mb-2 rounded-md' onClick={() => setViewWithProps("edit", {api: {post: { id:nextID }, user: { id:nextID }}})}>
          Edit View
        </button>
        <input className='ml-2 py-1 px-2 bg-white shadow-md text-black mb-2 rounded-md max-w-32' placeholder='next id' onChange={(event:any) => setNextID(event.target.value)}/>
      </div>
      <AssetContext.Provider value={{view, setView, assetName, setAssetName, setViewWithProps, externalProps, setExternalProps}}>
        {props.children.map((child:JSX.Element, index: number) => {
          if(child.props.hasOwnProperty('type') === false || child.props.type === view) {
            return(
              <div className='h-full w-full' key={index}>
                {cloneElement(child, prepareProps(child, index))}
              </div>
            )
          }
        })}
      </AssetContext.Provider>
    </>
  )
}

export default Asset

export const AssetContext = createContext<AssetContextType | any>({});
export const useAssetContext = () => useContext(AssetContext);