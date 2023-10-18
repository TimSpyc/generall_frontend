import React from "react";
import GeneralAssetDataProvider, {GeneralAssetDataContext} from "./context/generalAssetContext"
import { GeneralAssetDataContextType, IGeneralAssetData, TMode, TGridSize, TView, IFilter, IButton, IGeneralFrontendAssetProps } from './@types/generalAssetData';

export default function GeneralFrontendAsset({children, name}: IGeneralFrontendAssetProps): JSX.Element {
  const { dataset, updateData, saveData, updateCurrentSize, updateCurrentView, updateCurrentMode, currentSize, currentView, currentMode } = React.useContext(GeneralAssetDataContext) as GeneralAssetDataContextType;

  return (
    <div className={`element width-${currentSize.width} height-${currentSize.height}`}>
      <div>
        <button onClick={() => updateCurrentSize({
          width: 1,
          height: 1
        })}>"1x1"</button>
        <button onClick={() => updateCurrentSize({
          width: 1,
          height: 2
        })}>"1x2"</button>
        <button onClick={() => updateCurrentSize({
          width: 2,
          height: 1
        })}>"2x1"</button>
        <button onClick={() => updateCurrentSize({
          width: 2,
          height: 2
        })}>"2x2"</button>
      </div>
      <div>
        <button onClick={() => updateCurrentView("detail")}>"detail"</button>
        <button onClick={() => updateCurrentView("list")}>"list"</button>
      </div>
      <div>
        <button onClick={() => updateCurrentMode("show")}>"show"</button>
        <button onClick={() => updateCurrentMode("edit")}>"edit"</button>
      </div>
      <div>
        <p>{name}</p>

        {children}
      </div>
    </div>
  );
}
