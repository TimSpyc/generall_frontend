import React, {useRef, useState} from "react";
import { GeneralAssetDataContext } from "./context/generalAssetContext"
import { GeneralAssetDataContextType, IGeneralAssetData } from './@types/generalAssetData';
import useSWR from 'swr'
import _ from "lodash"

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
  min: any;
  max: any;
}

type IElementProps = (IDataProps | ILinkToProps) & IBaseElementProps;

export default function TestElement(props: IElementProps): JSX.Element {
  const [component_id] = useState(_.uniqueId('component_'));

  const { mode, api } = props;
  const { dataset, updateData, saveData, updateCurrentSize } = React.useContext(GeneralAssetDataContext) as GeneralAssetDataContextType;

  const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(api, fetcher)
  
  if (error) return (
    <>
      <div>failed to load</div>
    </>
  )

  if (isLoading) return (
    <>
      <div>loading...</div>
    </>
  )

  return (
    <div className="element">
      <h1>
        {component_id}
      </h1>
      <button onClick={() => saveData({title:"test", description: "test", id: 1, status: true})}>
        Add new
      </button>
      <br/>
      <button onClick={() => updateCurrentSize({
        width: 1,
        height: 1
      })}>
        "1x1"
      </button>
      <button onClick={() => updateCurrentSize({
        width: 1,
        height: 2
      })}>
        "1x2"
      </button>
      <button onClick={() => updateCurrentSize({
        width: 2,
        height: 1
      })}>
        "2x1"
      </button>
      <button onClick={() => updateCurrentSize({
        width: 2,
        height: 2
      })}>
        "2x2"
      </button>
    </div>
  );
}