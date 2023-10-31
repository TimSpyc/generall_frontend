import React, { createContext, useState, forwardRef } from 'react';

export const GeneralAssetContext = createContext();

const GeneralAsset = forwardRef(({style, className, onMouseDown, onMouseUp, onTouchEnd, ...props}, ref) => {
  // always cast children to array for filtering
  let children = React.Children.toArray(props.children)

  // contexts of GeneralAsset
  const [view, setView] = useState('default');

  return (
    <div style={{...style}} className={className} ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchEnd={onTouchEnd}>
      <GeneralAssetContext.Provider value={{view, setView}}>
        <div className="w-full h-full">
            <small className="text-gray-500">
                General Asset
            </small>
            <div className="border border-red-400 rounded-md w-full p-2 bg-white/50 h-full">
                {children.filter((child) => child.props.hasOwnProperty('type') === false || child.props.type.includes(view))}
            </div>
        </div>
      </GeneralAssetContext.Provider>
    </div>
  )
})

export default GeneralAsset