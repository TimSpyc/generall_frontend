import "./date-range-picker.css"

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
import { RangeValue } from "@react-types/shared";
import { parseDate } from "@internationalized/date";
import { validateElementLink, validateElementLinkKey } from "../helpers/validateElementLinks"

type CustomDateRangePickerType = {
  link: string;
  linkKey: string;
  label: string;
  tabIndex: number;
  classNameInput: string;
  classNameInputWrapper: string;
  children: JSX.Element;
};

type ChangeEventType = RangeValue<any> | null | undefined

const CustomRangeDatePicker = ({
  link,
  linkKey,
  label,
  tabIndex,
  classNameInput,
  classNameInputWrapper,
  children,
}: CustomDateRangePickerType) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState<ChangeEventType>();
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [error, setError] = useState(false);

  validateElementLink(data, link);

  const onChange = (event:ChangeEventType) => {
    setValue(event);

    if(event) {
      handleFormData([linkKey], {
        start: event.start.toDate(),
        end: event.end.toDate(),
      });
    }
  };

  useEffect(() => {
    if (data[link].error != undefined) {
      setError(true);
    }

    if (data[link].isLoading === true) {
      setFinishedLoading(false);
      setError(false);
    }

    if (
      data[link].isLoading === false &&
      finishedLoading === false &&
      data[link].data
    ) {
      validateElementLinkKey(data, link, linkKey);

      let date = undefined;

      if (data[link].data[linkKey]) {
        date = new Date(data[link].data[linkKey]);
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
  }, [data[link]]);

  return (
    <div
      className={`
        ${classNameInputWrapper} 
        ${isViewDraggable ? "pointer-events-none border-green-400" : ""} 
        ${error ? "pointer-events-none border-red-400 unselectable" : ""}
        w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton`}
    >
      {data[link].isLoading === false && data[link].data && (
        <div className="flex flex-col gap-0.5 h-full w-full">
          <DateRangePicker
            onChange={onChange}
            value={value != undefined ? value : null}
            aria-label={label}
            className={classNameInput}
          >
            <Group>
              <div className="flex flex-row gap-1 items-center" tabIndex={tabIndex}>
                <DateInput slot="start">
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <span aria-hidden="true">–</span>
                <DateInput slot="end">
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
          {label && (
            <>
              <hr />
              <Label className="text-[8px] text-black">{label}</Label>
            </>
          )}
        </div>
      )}
      {data[link].error != undefined && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/ text-red-400 text-sm">
          Error fetching Data
        </div>
      )}
    </div>
  );
};

export default CustomRangeDatePicker;
