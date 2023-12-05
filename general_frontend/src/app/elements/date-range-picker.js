import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import { parseDate } from "@internationalized/date";

const CustomRangeDatePicker = (props) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState("");
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    setValue(event);

    handleFormData([props.linkKey], {
      start: event.start.toDate(),
      end: event.end.toDate(),
    });
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

    if (data[props.link].isLoading === true) {
      setFinishedLoading(false);
      setError(false);
    }

    if (
      data[props.link].isLoading === false &&
      finishedLoading === false &&
      data[props.link].data
    ) {
      let date = undefined;

      if (data[props.link].data[props.linkKey]) {
        date = new Date(data[props.link].data[props.linkKey]);
      } else {
        date = new Date();
      }

      setValue({
        start: parseDate(
          `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
        ),
        end: parseDate(
          `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
        ),
      });

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
          <DateRangePicker
            onChange={onChange}
            value={value != "" ? value : null}
            aria-label={props.label}
          >
            <Group>
              <div className="flex flex-row gap-1 items-center">
                <DateInput slot="start" tabIndex={props.tabIndex}>
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <span aria-hidden="true">–</span>
                <DateInput slot="end" tabIndex={props.tabIndex}>
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
              </div>
              <Button>▼</Button>
            </Group>
            <Popover>
              <Dialog>
                <RangeCalendar>
                  <header>
                    <Button slot="previous">◀</Button>
                    <Heading />
                    <Button slot="next">▶</Button>
                  </header>
                  <CalendarGrid>
                    {(date) => <CalendarCell date={date} />}
                  </CalendarGrid>
                </RangeCalendar>
              </Dialog>
            </Popover>
          </DateRangePicker>
          {props.label && (
            <>
              <hr />
              <Label className="text-[8px] text-black">{props.label}</Label>
            </>
          )}
        </div>
      )}
      {data[props.link]?.error != undefined && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/ text-red-400 text-sm">
          Error fetching Data
        </div>
      )}
    </div>
  );
};

export default CustomRangeDatePicker;
