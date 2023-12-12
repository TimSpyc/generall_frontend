export type CustomButtonProps = {
  name: string;
  action: string;
  actionProps?: any;
  autoFocus?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  tabIndex?: number;
  classNameInput?: string;
  classNameInputWrapper?: string;
  children: JSX.Element;
};