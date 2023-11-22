import { useState, useEffect } from "react";
import { useViewContext } from "../layout/view";
import { useGridLayoutContext } from "../layout/grid-layout"
import { TextField, Label, Input } from 'react-aria-components';

const CustomButton = (props) => {
    const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData, handleFormSubmit} = useViewContext();
    const {layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing} = useGridLayoutContext();

    const [value, setValue] = useState('');
    const [finishedLoading, setFinishedLoading] = useState(false)

    const onChange = (e) => {
        setValue(e.target.value)
        handleFormData([props.linkKey], e.target.value)
    }

    useEffect(() => {
        if(data[props.link].isLoading === false && finishedLoading === false) {
            setValue(data[props.link].data[props.linkKey])
            setFinishedLoading(true)
        }
    }, [data]);

    return (
        <div className={`
            ${props.classNameInputWrapper} 
            ${isViewDraggable ? 'pointer-events-none border-green-400' : 'border-gray-400'} 
            w-full h-full shadow-sm rounded-md border text-black p-0.5 px-1 skeleton bg-white`
        }>
            {(data[props.link]?.isLoading === false && data[props.link]?.data) &&
                <TextField className={`${props.classNameInput} w-full h-full flex flex-col gap-0.5`}>
                    <Input 
                        onChange={onChange} 
                        value={value} 
                        className={`w-full h-full`} 
                        tabIndex={props.tabIndex}
                    />
                    {props.label &&
                        <>
                            <hr/>
                            <Label className="text-[8px] text-gray-500">
                                {props.label}
                            </Label>
                        </>
                    }
                </TextField>
            }
        </div>
    )
}

export default CustomButton