import React from "react";
import produce from "immer";
import GeneralAssetDataProvider from "./context/generalAssetContext"

interface IApiData {
  [key: string]: IApiData | string;
}

type TMode = "show" | "edit";

type TGridSize =
  | "1x1"
  | "1x2"
  | "1x3"
  | "2x1"
  | "2x2"
  | "2x3"
  | "3x1"
  | "3x2"
  | "3x3";

interface IFilter {
  view: string;
  jsx: JSX.Element;
}

interface IButton {
  [key: string]: {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    description: string;
    disabled: boolean;
    view_list: string[];
  };
}

interface IChecker {
  valueCheck: () => boolean;
  check_time: "on_save" | "on_change";
  error_description: string;
}

interface IViewConfig {
  element_id: string;
  size: TGridSize;
  position: number;
  view: string;
}

interface IGeneralFrontendAssetProps {
  name: string;
  api_data: IApiData;
  views?: string[];
  size: TGridSize[];
  filter?: IFilter[];
  buttons?: IButton[];
  checks?: IChecker[];
  view_config: IViewConfig[];
  children: JSX.Element | JSX.Element[]
}

export default function GeneralFrontendAsset({
  name,
  api_data,
  views,
  size,
  filter,
  buttons,
  checks,
  view_config,
  children
}: IGeneralFrontendAssetProps): JSX.Element {
  const [current_size, setCurrentSize] = React.useState<TGridSize>("1x1");
  const [current_view, setCurrentView] = React.useState<string>("detail");
  const [current_mode, setCurrentMode] = React.useState<TMode>("show");
  const [downloaded_data, setDownloadData] = React.useState<IApiData>();
  const view_list = ["detail", "list", ...(views ? views : [])];

  React.useEffect(() => {
    const data = api_data;
    setDownloadData(data);
  }, [api_data]);

  return (
    <>
      <GeneralAssetDataProvider>
        <div>
          <button onClick={() => setCurrentSize("1x1")}>"1x1"</button>
          <button onClick={() => setCurrentSize("1x2")}>"1x2"</button>
          <button onClick={() => setCurrentSize("2x1")}>"2x1"</button>
          <button onClick={() => setCurrentSize("2x2")}>"2x2"</button>
        </div>
        <div>
          <button onClick={() => setCurrentView("detail")}>"detail"</button>
          <button onClick={() => setCurrentView("list")}>"list"</button>
        </div>
        <div>
          <button onClick={() => setCurrentMode("show")}>"show"</button>
          <button onClick={() => setCurrentMode("edit")}>"edit"</button>
        </div>
        <div>
          <p>{name}</p>
          {children}
        </div>
      </GeneralAssetDataProvider>
    </>
  );
}
