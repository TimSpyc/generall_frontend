import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout";
import { TextField, Label, TextArea } from "react-aria-components";

import { validateElementLink, validateElementLinkKey } from "../helpers/validateElementLinks"

const CustomTextArea = (props:any) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState("");
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [error, setError] = useState(false);

  validateElementLink(data, props.link);

  const onChange = (event:any) => {
    setValue(event.currentTarget.value);
    handleFormData([props.linkKey], event.currentTarget.value);
  };

  useEffect(() => {
    if (data[props.link].error != undefined) {
      setError(true);
    }

    if (
      data[props.link].isLoading === true &&
      data[props.link].error === undefined
    ) {
      setFinishedLoading(false);
      setError(false);
    }

    if (
      data[props.link].isLoading === false &&
      finishedLoading === false &&
      data[props.link].error === undefined &&
      data[props.link].data
    ) {
      validateElementLinkKey(data, props.link, props.linkKey);
      setValue(data[props.link].data[props.linkKey]);
      setFinishedLoading(true);
      setError(false);
    }
  }, [data]);

  return (
    <div
      className={`
					${props.classNameInputWrapper} 
					${isViewDraggable ? "pointer-events-none border-green-400 unselectable" : ""}
					${error ? "pointer-events-none border-red-400 unselectable" : ""}
					w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton bg-white`}
    >
      {data[props.link].isLoading === false && data[props.link].data && (
        <TextField
          className={`${props.classNameInput} w-full h-full flex flex-col`}
        >
          <TextArea
            className={'h-full'}
            value={value}
            onChange={onChange}
          />
          {props.label && (
            <div className="mt-[4px] pt-[1px]">
              <hr />
              <div className="flex flex-row w-full gap-2 items-center justify-between">
                <Label className="text-[8px] text-black">{props.label}</Label>
                <span className="w-3 h-3 p-0.5 text-xs inline-flex items-center justify-center text-black bg-red-200 border border-red-400 rounded-full cursor-pointer">
                  i
                </span>
              </div>
            </div>
          )}
        </TextField>
      )}
      {data[props.link]?.error != undefined && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-red-400 text-sm">
          Error fetching Data
        </div>
      )}
    </div>
  );
};

export default CustomTextArea;
