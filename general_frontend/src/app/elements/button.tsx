import { useAssetContext } from "../layout/asset";
import { useGridLayoutContext } from "../layout/grid-layout";

type CustomButtonProps = {
  action: string;
  actionProps: any;
  name: string;
  value: string;
  autoFocus: boolean;
  type: "button" | "submit" | "reset" | undefined;
  tabIndex: number;
  classNameInput: string;
  classNameInputWrapper: string;
  children: JSX.Element;
};

const CustomButton = ({
  action,
  actionProps,
  name,
  value,
  autoFocus,
  type,
  tabIndex,
  classNameInput,
  classNameInputWrapper,
  children,
}: CustomButtonProps) => {
  const { handleActions } = useAssetContext();
  const { isViewDraggable } = useGridLayoutContext();

  return (
    <div
      className={`
				${classNameInputWrapper} 
				${
          isViewDraggable
            ? "pointer-events-none border-green-400 unselectable"
            : "border-gray-400"
        } 
				w-full h-full shadow-sm rounded-md border text-black skeleton`}
    >
      <button
        onClick={(event) => handleActions(action, actionProps, event)}
        name={name}
        value={value}
        autoFocus={autoFocus}
        type={type}
        tabIndex={tabIndex}
        className={`${classNameInput} w-full h-full`}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
