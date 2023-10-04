import React from "react";
import { GeneralAssetDataContext } from "./context/generalAssetContext"
import { GeneralAssetDataContextType, IGeneralAssetData } from './@types/generalAssetData';

interface IBaseElementProps {
  mode?: "show" | "edit";
}

interface IDataProps {
  api?: never;
  data: any;
}

interface ILinkToProps {
  api: string;
  data?: never;
}

type IElementProps = (IDataProps | ILinkToProps) & IBaseElementProps;

export default function TestElement(props: IElementProps): JSX.Element {
  const { mode, api } = props;
  const { dataset, updateData, saveData } = React.useContext(GeneralAssetDataContext) as GeneralAssetDataContextType;

  console.log(dataset)
  console.log(api)

  return (
    <>
      <button onClick={() => saveData({title:"test", description: "test", id: 1, status: true})}>
        Add new
      </button>
    </>
  );
}
