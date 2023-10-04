export interface IGeneralAssetData {
    id: number;
    title: string;
    description: string;
    status: boolean;
}
export type GeneralAssetDataContextType = {
    dataset: IGeneralAssetData[];
    saveData: (data: IGeneralAssetData) => void;
    updateData: (id: number) => void;
};