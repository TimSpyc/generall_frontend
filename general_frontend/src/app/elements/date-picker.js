import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout"
import { Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover } from 'react-aria-components';
import { parseDate } from '@internationalized/date';

const CustomDatePicker = (props) => {
    const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData, handleFormSubmit} = useViewContext();
    const {layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing} = useGridLayoutContext();

    const [value, setValue] = useState('');
    const [finishedLoading, setFinishedLoading] = useState(false)

    const onChange = (e) => {
        setValue(
          parseDate(`${e.year}-${e.month}-${e.day}`)
        )

        handleFormData([props.linkKey], {
          day: e.day,
          era: e.era,
          month: e.month,
          year: e.year,
        })
    }

    useEffect(() => {
        if(data[props.link].isLoading === false && finishedLoading === false) {
          let date = new Date(data[props.link].data[props.linkKey])

          setValue(
            parseDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
          )
          
          setFinishedLoading(true)
        }
    }, [data]);

    return (
        <div className={`
            ${props.classNameInputWrapper} 
            ${isViewDraggable ? 'pointer-events-none border-green-400' : 'border-gray-400'} 
            w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton`
        }>
          {(data[props.link]?.isLoading === false && data[props.link]?.data) &&
            <div className="flex flex-col gap-0.5 h-full w-full">
              <DatePicker onChange={onChange} value={value != '' ? value : null} aria-label={props.label}>
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
              <hr/>
              <Label className="text-[8px] text-gray-500">
                {props.label}
              </Label>
            </div>
          }
        </div>
    )
}

export default CustomDatePicker