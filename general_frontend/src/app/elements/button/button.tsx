import { useAssetContext } from "../../layout/asset";
import { useGridLayoutContext } from "../../layout/grid-layout";
import { CustomButtonProps } from "./button-types";

const CustomButton = ({
  action,
  actionProps,
  name,
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
				w-full h-full shadow-sm rounded-md border text-black skeleton overflow-hidden`}
    >
      <button
        onClick={(event) => handleActions(action, actionProps, event)}
        name={name}
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
