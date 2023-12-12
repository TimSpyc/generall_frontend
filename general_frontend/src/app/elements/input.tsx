import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout";
import { TextField, Label, Input } from "react-aria-components";
import { validateElementLink, validateElementLinkKey } from "../helpers/validateElementLinks"

type CustomInputProps = {
  link: string;
  linkKey: string;
  label: string;
  tabIndex: number;
  classNameInput: string;
  classNameInputWrapper: string;
  children: JSX.Element;
};

const CustomInput = ({
  link,
  linkKey,
  label,
  tabIndex,
  classNameInput,
  classNameInputWrapper,
  children,
}: CustomInputProps) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState("");
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [error, setError] = useState(false);

  validateElementLink(data, link);

  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    handleFormData([linkKey], event.currentTarget.value);
  };

  useEffect(() => {
    if (data[link].error != undefined) {
      console.log(data[link].error.info);
      setError(true);
    }

    if (
      data[link].isLoading === true &&
      data[link].error === undefined
    ) {
      setFinishedLoading(false);
      setError(false);
    }

    if (
      data[link].isLoading === false &&
      finishedLoading === false &&
      data[link].error === undefined &&
      data[link].data
    ) {
      validateElementLinkKey(data, link, linkKey);
      setValue(data[link].data[linkKey]);
      setFinishedLoading(true);
      setError(false);
    }
  }, [data[link]]);

  return (
    <div
      className={`
					${classNameInputWrapper} 
					${isViewDraggable ? "pointer-events-none border-green-400 unselectable" : ""}
					${error ? "pointer-events-none border-red-400 unselectable" : ""}
					w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton bg-white`}
    >
      {data[link].isLoading === false && data[link].data && (
        <TextField
          className={`${classNameInput} w-full h-full flex flex-col`}
        >
          <Input
            onChange={onChange}
            value={value}
            className={`w-full h-full`}
            tabIndex={tabIndex}
          />
          {label && (
            <div className="mt-[4px] pt-[1px]">
              <hr />
              <div className="flex flex-row w-full gap-2 items-center justify-between">
                <Label className="text-[8px] text-black">{label}</Label>
                <span className="w-3 h-3 p-0.5 text-xs inline-flex items-center justify-center text-black bg-red-200 border border-red-400 rounded-full cursor-pointer">
                  i
                </span>
              </div>
            </div>
          )}
        </TextField>
      )}
      {data[link].error != undefined && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-red-400 text-sm">
          Error fetching Data
        </div>
      )}
    </div>
  );
};

export default CustomInput;
