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

  const setViewWithProps = (view:string, props:any) => {
    setView(view)
    setExternalProps(props)
  }

  const handleActions = (action:string, actionProps:any, event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let actionPath = action.split('.')
    let actionTrigger = actionPath[0]
    let actionDestination = actionPath[1]

    switch (actionTrigger) {
      case 'view':
        setViewWithProps(actionDestination, actionProps)
        break;
      case 'paginate':
        console.log('paginate')
        break;
      case 'store':
        console.log("store")
        break;
      case 'reload':
        console.log("reload")
        break;
      default:
        setViewWithProps('default', {})
    }
  }

  const prepareProps = (child:ReactElement, index:number) => {
    // merge the api endpoints and overwrite them accordingly
    externalProps['index'] = index
    return merge(child.props, externalProps)
  }

  return (
    <>
      <AssetContext.Provider value={{view, setView, assetName, setAssetName, setViewWithProps, externalProps, setExternalProps, handleActions}}>
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

      {props.buttons &&
        <div className="absolute -bottom-2 z-50 right-6 flex flex-row gap-1">
          {props.buttons.map((data:any, index:number) => {
            return(
              <button key={index} className='py-0.5 px-1 bg-black text-white text-xs mb-2 rounded-md' onClick={(event) => handleActions(data.action, data.actionProps, event)}>
                {data.label}
              </button>
            )
          })}
        </div>
      }
    </>
  )
}

export default Asset

export const AssetContext = createContext<AssetContextType | any>({});
export const useAssetContext = () => useContext(AssetContext);