import React from "react";
import { GeneralAssetDataContextType, IGeneralAssetData, TMode, TGridSize, TView, IFilter, IButton, IGeneralFrontendAssetProps } from './@types/generalAssetData';
import { PropsWithChildren } from 'react';

export const GeneralAssetDataContext = React.createContext<GeneralAssetDataContextType | null>(null);

const GeneralAssetDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [dataset, setData] = React.useState<IGeneralAssetData[]>([]);
  const [currentMode, setCurrentMode] = React.useState<TMode[]>([]);
  const [currentSize, setCurrentSize] = React.useState<TGridSize[]>([]);
  const [currentView, setCurrentView] = React.useState<TView[]>([]);

  const saveData = (form: IGeneralAssetData) => {
      const formData: IGeneralAssetData = {
          id: Math.random(),
          title: form.title,
          description: form.description,
          status: false,
      };

      setData([...dataset, formData]);
  };

  const updateData = (id: number) => {
      //
  };

  const updateCurrentMode = (data:any) => {
      setCurrentMode(data)
      console.log(data)
  }

  const updateCurrentSize = (data:any) => {
      setCurrentSize(data)
      console.log(data)
  }

  const updateCurrentView = (data:any) => {
      setCurrentView(data)
      console.log(data)
  }

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
        <GeneralAssetDataContext.Provider value={{ dataset, saveData, updateData, updateCurrentMode, updateCurrentSize, updateCurrentView, currentMode, currentSize, currentView }}>
            {children}
        </GeneralAssetDataContext.Provider>
      </div>
    </div>
  );
}

export default GeneralAssetDataProvider;