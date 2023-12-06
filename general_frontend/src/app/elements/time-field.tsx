import "./date-picker.css"

import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout";
import { TimeField, Label, DateInput, DateSegment } from 'react-aria-components';
import { Time, parseTime } from "@internationalized/date";
import { validateElementLink, validateElementLinkKey } from "../helpers/validateElementLinks"

const CustomTimeField = (props: any) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState<Time | string>("");
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [error, setError] = useState(false);

  validateElementLink(data, props.link);

  // TODO: Update onChange
  const onChange = (event: any) => {
    setValue(event);
    handleFormData([props.linkKey], event);
  };

  useEffect(() => {
    if (data[props.link] === undefined) {
      throw new Error(
        `KnowledgeHub: api does not contain any link with name ${props.link}`
      );
    }

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

      let time = undefined;

      if (data[props.link].data[props.linkKey]) {
        time = new Time(data[props.link].data[props.linkKey]);
      } else {
        time = new Time();
      }

      setValue(parseTime(`${time.toString()}`));

      setFinishedLoading(true);
      setError(false);
    }
  }, [data]);

  return (
    <div
      className={`
      ${props.classNameInputWrapper} 
      ${isViewDraggable ? "pointer-events-none border-green-400" : ""} 
      ${error ? "pointer-events-none border-red-400 unselectable" : ""}
      w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton`}
    >
      {data[props.link]?.isLoading === false && data[props.link]?.data && (
        <div className="flex flex-col gap-0.5 h-full w-full">
          <TimeField
            onChange={onChange}
            value={value != "" ? value : null}
            aria-label={props.label}
          >
            <DateInput>
              {segment => <DateSegment segment={segment} />}
            </DateInput>
          </TimeField>
          <hr />
          <Label className="text-[8px] text-black">{props.label}</Label>
        </div>
      )}
      {data[props.link]?.error != undefined && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-red-400 text-sm">
          Error fetching Data
        </div>
      )}
    </div>
  );
};

export default CustomTimeField;
