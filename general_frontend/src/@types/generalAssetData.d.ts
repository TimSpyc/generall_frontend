export interface IGeneralAssetData {
    id: number;
    title: string;
    description: string;
    status: boolean;
}

export interface IFilter {
    view: string;
    jsx: JSX.Element;
}


export interface IButton {
    [key: string]: {
        handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
        description: string;
        disabled: boolean;
        view_list: string[];
    };
}

export type GeneralAssetDataContextType = {
    dataset: IGeneralAssetData[];
    saveData: (data: IGeneralAssetData) => void;
    updateData: (id: number) => void;

    updateCurrentMode: (data: any) => void;
    updateCurrentView: (data: any) => void;
    updateCurrentSize: (data: any) => void;
    
    currentMode: TMode[];
    currentView: TView[];
    currentSize: TGridSize;
};

export type TMode = "show" | "edit";

export type TView = "detail" | "list";

export type TGridSize = any;

export interface IGeneralFrontendAssetProps {
    name: string,
    children: JSX.Element | JSX.Element[]
}