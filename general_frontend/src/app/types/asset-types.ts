type AssetButton = {
  view: string[];
  action: string;
  actionProps: {};
  label: string;
  icon: string;
};

export type AssetProps = {
  children: JSX.Element[];
  name: string;
  index?: number;
  buttons?: AssetButton[];
  defaultView?: string;
};

export type AssetContextType = {
  view: string;
  setView: Function;
  assetName: string;
  setAssetName: Function;
  handleActions: Function;
};
