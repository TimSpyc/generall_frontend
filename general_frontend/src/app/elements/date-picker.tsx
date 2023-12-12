import "./date-picker.css";

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
  DateValue
} from "react-aria-components";
import { parseDate, CalendarDate } from "@internationalized/date";
import {
  validateElementLink,
  validateElementLinkKey,
} from "../helpers/validateElementLinks";

type CustomDatePickerProps = {
  name: string;
  link: string;
  linkKey: string;
  label: string;
  tabIndex?: number;
  classNameInput?: string;
  classNameInputWrapper?: string;
  children?: JSX.Element;
};

const CustomDatePicker = ({
  link,
  linkKey,
  label,
  tabIndex,
  classNameInput,
  classNameInputWrapper,
  children,
}: CustomDatePickerProps) => {
  const { data, handleFormData } = useViewContext();
  const { isViewDraggable } = useGridLayoutContext();

  const [value, setValue] = useState<DateValue | null | undefined>(null);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [error, setError] = useState(false);

  validateElementLink(data, link);

  const onChange = (event: any) => {
    setValue(event);

    handleFormData([linkKey], event.toDate());
  };

  useEffect(() => {
    if (data[link].error != undefined) {
      setError(true);
    }

    if (data[link].isLoading === true && data[link].error === undefined) {
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

      let date = undefined;

      if (data[link].data[linkKey]) {
        date = new Date(data[link].data[linkKey]);
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
        <div
          className="flex flex-col gap-0.5 h-full w-full"
          tabIndex={tabIndex}
        >
          <DatePicker
            onChange={onChange}
            value={value != null ? value : null}
            aria-label={label}
            className={classNameInput}
          >
            <Group>
              <DateInput>
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
          <Label className="text-[8px] text-black">{label}</Label>
        </div>
      )}
      {data[link].error != undefined && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-red-400 text-sm">
          Error fetching Data
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
