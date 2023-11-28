import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout"
import {Button, CalendarCell, CalendarGrid, DateInput, DateRangePicker, DateSegment, Dialog, Group, Heading, Label, Popover, RangeCalendar} from 'react-aria-components';
import { parseDate } from '@internationalized/date';

const CustomRangeDatePicker = (props) => {
    const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData, handleFormSubmit} = useViewContext();
    const {layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing} = useGridLayoutContext();

    const [value, setValue] = useState('');
    const [finishedLoading, setFinishedLoading] = useState(false)

    const onChange = (e) => {
			setValue(
				{
					start: parseDate(`${e.start.year}-${e.start.month}-${e.start.day}`),
					end: parseDate(`${e.start.year}-${e.start.month}-${e.start.day}`),
				}
			)

			handleFormData([props.linkKey], {
				start: {
					day: e.start.day,
					era: e.start.era,
					month: e.start.month,
					year: e.start.year,
				},
				end: {
					day: e.end.day,
					era: e.end.era,
					month: e.end.month,
					year: e.end.year,
				}
			})
    }

    useEffect(() => {
        if(data[props.link] === undefined) {
          throw new Error(`api does not contain any link with name ${props.link}`)
        }

        if(data[props.link].isLoading === true) {
          setFinishedLoading(false)
        }

        if(data[props.link].isLoading === false && finishedLoading === false) {
          let date = new Date(data[props.link].data[props.linkKey])

					setValue({
						start: parseDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`),
						end: parseDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`),
					})
          
          setFinishedLoading(true)
        }
    }, [data]);

    return (
        <div className={`
            ${props.classNameInputWrapper} 
            ${isViewDraggable ? 'pointer-events-none border-green-400' : ''} 
            w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton`
        }>
          {(data[props.link]?.isLoading === false && data[props.link]?.data) &&
            <div className="flex flex-col gap-0.5 h-full w-full">
							<DateRangePicker onChange={onChange} value={value != '' ? value : null} aria-label={props.label}>
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
							{props.label &&
								<>
									<hr/>
									<Label className="text-[8px] text-black">
										{props.label}
									</Label>
								</>
							}
					</div>
        }
        </div>
    )
}

export default CustomRangeDatePicker