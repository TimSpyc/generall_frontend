import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import { parseDate } from "@internationalized/date";

const CustomDatePicker = (props) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState("");
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    setValue(event);

    handleFormData([props.linkKey], event.toDate());
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
      let date = undefined;

      if (data[props.link].data[props.linkKey]) {
        date = new Date(data[props.link].data[props.linkKey]);
      } else {
        date = new Date();
      }

      setValue(
        parseDate(
          `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
        )
      );

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
          <DatePicker
            onChange={onChange}
            value={value != "" ? value : null}
            aria-label={props.label}
          >
            <Group>
              <DateInput tabIndex={props.tabIndex}>
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
              <Button>▼</Button>
            </Group>
            <Popover>
              <Dialog>
                <Calendar>
                  <header>
                    <Button slot="previous">◀</Button>
                    <Heading />
                    <Button slot="next">▶</Button>
                  </header>
                  <CalendarGrid>
                    {(date) => <CalendarCell date={date} />}
                  </CalendarGrid>
                </Calendar>
              </Dialog>
            </Popover>
          </DatePicker>
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

export default CustomDatePicker;
