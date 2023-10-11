import * as React from 'react';
import { PropsWithChildren } from 'react';
import { GeneralAssetDataContextType, IGeneralAssetData, TMode, TGridSize, TView } from '../@types/generalAssetData';

export const GeneralAssetDataContext = React.createContext<GeneralAssetDataContextType | null>(null);

const GeneralAssetDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [dataset, setData] = React.useState<IGeneralAssetData[]>([]);
    const [currentMode, setCurrentMode] = React.useState<TMode[]>([]);
    const [currentSize, setCurrentSize] = React.useState<TGridSize[]>([]);
    const [currentView, setCurrentView] = React.useState<TView[]>([]);

    const saveData = (data: IGeneralAssetData) => {
        const newData: IGeneralAssetData = {
            id: Math.random(),
            title: data.title,
            description: data.description,
            status: false,
        };

        setData([...dataset, newData]);
    };

    const updateData = (id: number) => {
        dataset.filter((data: IGeneralAssetData) => {
            if (data.id === id) {
                data.status = true;
                setData([...dataset]);
            }
        });
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