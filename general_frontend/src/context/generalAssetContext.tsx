import * as React from 'react';
import { PropsWithChildren } from 'react';
import { GeneralAssetDataContextType, IGeneralAssetData, TMode, TGridSize, TView } from '../@types/generalAssetData';

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
        <GeneralAssetDataContext.Provider value={{ dataset, saveData, updateData, updateCurrentMode, updateCurrentSize, updateCurrentView, currentMode, currentSize, currentView }}>
            {children}
        </GeneralAssetDataContext.Provider>
    );
};

export default GeneralAssetDataProvider;