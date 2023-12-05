export type GridLayoutContextType = {
  layouts: object;
  setLayouts: Function;
  currentLayout: object;
  updateGridEditable: Function;
  isViewDraggable: Boolean;
  isViewResizable: Boolean;
  currentlyResizing: Boolean;
};

export type GridLayoutProps = {
  name: string;
  children: JSX.Element[] | JSX.Element;
};

export type GridLayoutSizes = {
  sm: any;
  md: any;
  lg: any;
};

export type LayoutElementType = {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  isBounded: boolean;
  isDraggable: boolean;
  isResizable: boolean;
  resizeHandles: [];
  moved: boolean;
  static: boolean;
};

type IndizesType = {
  x: number;
  y: number;
  w: number;
  h: number;
  visible: boolean;
};

export type CurrentStateType = {
  [key: string]: {
    [key: string]: IndizesType;
  };
};
