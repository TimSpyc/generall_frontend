import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout"
import { Checkbox } from 'react-aria-components';

const CustomCheckbox = (props) => {
    const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData, handleFormSubmit} = useViewContext();
    const {layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing} = useGridLayoutContext();

    const [value, setValue] = useState('');
    const [finishedLoading, setFinishedLoading] = useState(false)

    const onChange = (e) => {
			console.log(e)
			setValue(e.target.value)
			handleFormData([props.linkKey], e.target.value)
    }

    useEffect(() => {
        if(data[props.link] === undefined) {
			throw new Error(`KnowledgeHub: api does not contain any link with name ${props.link}`)
        }

        if(data[props.link].isLoading === true) {
			setFinishedLoading(false)
        }

        if(data[props.link].isLoading === false && finishedLoading === false) {
			setValue(data[props.link].data[props.linkKey])
			setFinishedLoading(true)
        }
    }, [data]);

    return (
        <div className={`
					${props.classNameInputWrapper} 
					${isViewDraggable ? 'pointer-events-none border-green-400' : ''} 
					w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton bg-white`
        }>
					{(data[props.link]?.isLoading === false && data[props.link]?.data) &&
						<Checkbox onChange={onChange} isSelected={value} tabIndex={props.tabIndex}>
							<div className="checkbox">
								<svg viewBox="0 0 18 18" aria-hidden="true">
									<polyline points="1 9 7 14 15 4" />
								</svg>
							</div>
							{props.children}
						</Checkbox>
					}
        </div>
    )
}

export default CustomCheckbox