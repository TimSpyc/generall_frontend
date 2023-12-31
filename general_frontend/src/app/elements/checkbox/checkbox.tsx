import "./checkbox.css";

import { useState, useEffect } from "react";
import { useViewContext } from "../../layout/view";
import { useGridLayoutContext } from "../../layout/grid-layout";
import { Checkbox, Label } from "react-aria-components";
import Tooltip from "../tooltip/tooltip";
import {
  validateElementLink,
  validateElementLinkKey,
} from "../../helpers/validateElementLinks";
import { CustomCheckboxProps } from "./checkbox-types";

const CustomCheckbox = ({
  link,
  linkKey,
  label,
  tabIndex,
  classNameInput,
  classNameInputWrapper,
  children,
}: CustomCheckboxProps) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState<boolean | undefined>(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

  validateElementLink(data, link);

  const onChange = (event: boolean) => {
    setValue(event);
    handleFormData([linkKey], event);
  };

  useEffect(() => {
    if (data[link].isLoading === true) {
      setFinishedLoading(false);
    }

    if (data[link].isLoading === false && finishedLoading === false) {
      validateElementLinkKey(data, link, linkKey);
      setValue(data[link].data[linkKey]);
      setFinishedLoading(true);
    }
  }, [data[link]]);

  return (
    <div
      className={`
			${classNameInputWrapper} 
			${isViewDraggable ? "pointer-events-none border-green-400" : ""} 
			w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton bg-white overflow-hidden`}
    >
      {data[link].isLoading === false && data[link].data && (
        <Label className="text-black flex flex-row gap-2 items-center">
          <Checkbox
            className={`${classNameInput} react-aria-Checkbox`}
            onChange={onChange}
            isSelected={value}
          >
            <div className="checkbox" tabIndex={tabIndex}>
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </div>
            {children}
          </Checkbox>
          {label}
        </Label>
      )}
      {label && (
        <>
          <hr />
          <div className="flex flex-row w-full gap-2 items-center justify-between">
            <Label className="text-[8px] text-black">{label}</Label>
            <Tooltip status="positive" message="test" />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCheckbox;
