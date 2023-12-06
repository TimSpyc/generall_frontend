import "./checkbox.css"

import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout";
import { Checkbox, Label } from "react-aria-components";
import { validateElementLink, validateElementLinkKey } from "../helpers/validateElementLinks"

const CustomCheckbox = (props:any) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState<boolean | undefined>(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

  validateElementLink(data, props.link);

  const onChange = (event:boolean) => {
    setValue(event);
    handleFormData([props.linkKey], event);
  };

  useEffect(() => {
    if (data[props.link] === undefined) {
      throw new Error(
        `KnowledgeHub: api does not contain any link with name ${props.link}`
      );
    }

    if (data[props.link].isLoading === true) {
      setFinishedLoading(false);
    }

    if (data[props.link].isLoading === false && finishedLoading === false) {
      validateElementLinkKey(data, props.link, props.linkKey);
      setValue(data[props.link].data[props.linkKey]);
      setFinishedLoading(true);
    }
  }, [data]);

  return (
    <div
      className={`
			${props.classNameInputWrapper} 
			${isViewDraggable ? "pointer-events-none border-green-400" : ""} 
			w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton bg-white`}
    >
      {data[props.link]?.isLoading === false && data[props.link]?.data && (
        <Label className="text-black flex flex-row gap-2 items-center">
          <Checkbox
            className={'react-aria-Checkbox'}
            onChange={onChange}
            isSelected={value}
            tabIndex={props.tabIndex}
          >
            <div className="checkbox">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </div>
            {props.children}
          </Checkbox>
          {props.label}
        </Label>
      )}
      {props.label && (
        <div className="mt-[1px] pt-[1px]">
          <hr />
          <div className="flex flex-row w-full gap-2 items-center justify-between">
            <Label className="text-[8px] text-black">{props.label}</Label>
            <span className="w-3 h-3 p-0.5 text-xs inline-flex items-center justify-center text-black bg-red-200 border border-red-400 rounded-full cursor-pointer">
              i
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCheckbox;
