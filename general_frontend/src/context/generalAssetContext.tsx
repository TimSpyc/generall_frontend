import * as React from 'react';
import { PropsWithChildren } from 'react';
import { GeneralAssetDataContextType, IGeneralAssetData } from '../@types/generalAssetData';

export const GeneralAssetDataContext = React.createContext<GeneralAssetDataContextType | null>(null);

const GeneralAssetDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [dataset, setData] = React.useState<IGeneralAssetData[]>([]);

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

    return (
        <GeneralAssetDataContext.Provider value={{ dataset, saveData, updateData }}>
            {children}
        </GeneralAssetDataContext.Provider>
    );
};

export default GeneralAssetDataProvider;