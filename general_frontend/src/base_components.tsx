import React from "react";
import produce from "immer";

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

interface IBaseElementProps {
  [key: string]: string | object;
}

interface IDataProps {
  data: object | string;
  setData: (data: object) => void;
  link_to_data?: never;
}

interface ILinkToProps {
  link_to_data: string;
  data?: never;
  setData?: never;
}

interface IElement {
  view: string;
  jsx: React.ReactElement<(IDataProps | ILinkToProps) & IBaseElementProps>;
  element_id: string;
  help_text?: string;
  help_url?: string;
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
  elements: IElement[];
  buttons?: IButton[];
  checks?: IChecker[];
  view_config: IViewConfig[];
}

export default function GeneralFrontendAsset({
  name,
  api_data,
  views,
  size,
  filter,
  elements,
  buttons,
  checks,
  view_config,
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

  const current_layout = view_config.filter((view_config) => {
    return (
      view_config.size === current_size && view_config.view === current_view
    );
  });

  const current_elements = current_layout.map((layout) => {
    const found_elements = elements.filter((element) => {
      return element.element_id === layout.element_id;
    });
    if (found_elements.length === 0) {
      throw new Error("key does not exist");
    } else if (found_elements.length > 1) {
      throw new Error("key is not unique");
    } else {
      return found_elements[0];
    }
  });

  const setDataAtPath = (path: string[], value: any) => {
    setDownloadData((currentData) =>
      produce(currentData, (draft) => {
        let currentLevel = draft;
        if (currentLevel === undefined) {
          throw new Error("draft is undefined");
        }
        for (let i = 0; i < path.length - 1; i++) {
          if (!(path[i] in currentLevel)) {
            currentLevel[path[i]] = {};
          }
          currentLevel = currentLevel[path[i]] as IApiData;
        }
        currentLevel[path[path.length - 1]] = value;
      })
    );
  };

  return (
    <>
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
        <p>{JSON.stringify(api_data)}</p>
        <p>{JSON.stringify(views)}</p>
        <p>{JSON.stringify(size)}</p>
        <p>{JSON.stringify(filter)}</p>
        {current_elements.map((element) => {
          const { link_to_data } = element.jsx.props;
          if (link_to_data === undefined) {
            throw new Error("link_to_data is undefined");
          }
          const data_path = link_to_data.split(".");
          let data: IApiData | string = downloaded_data || "loading";
          if (downloaded_data !== undefined) {
            for (const path of data_path) {
              if (!data || typeof data !== "object" || !(path in data)) {
                throw new Error("link_to_data does not exist");
              }
              data = data[path];
            }
          }

          return React.cloneElement(element.jsx, {
            ...element.jsx,
            key: element.element_id,
            element_id: element.element_id,
            data: data,
            mode: current_mode,
            setData: (value: any) => setDataAtPath(data_path, value),
          });
        })}
        <p>{JSON.stringify(buttons)}</p>
        <p>{JSON.stringify(checks)}</p>
        <p>{JSON.stringify(view_config)}</p>
      </div>
    </>
  );
}
