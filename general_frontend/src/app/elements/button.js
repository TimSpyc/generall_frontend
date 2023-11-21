import { useViewContext } from "../assets/view";
import { useGridLayoutContext } from "../assets/grid-layout"
import { Button } from 'react-aria-components';

const CustomButton = (props) => {
    const {setView, resetToDefault, data, FetchRequest, handleActions, handleFormData, handleFormSubmit} = useViewContext();
    const {layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing} = useGridLayoutContext();

    return (
        <div className={`
            ${props.classNameInputWrapper} 
            ${isViewDraggable ? 'pointer-events-none border-green-400' : 'border-gray-400'} 
            w-full h-full shadow-sm rounded-md border text-black skeleton`
        }>
        {props.link &&
            <Button 
                /* events emittet from react aria button */
                onPress={(event) => handleFormSubmit(event)} 
                onPressStart={(event) => console.log(event)}
                onPressEnd={(event) => console.log(event)}
                onPressChange={(event) => console.log(event)}
                onPressUp={(event) => console.log(event)}
                onFocus={(event) => console.log(event)}
                onBlur={(event) => console.log(event)}
                onFocusChange={(event) => console.log(event)}
                onKeyDown={(event) => console.log(event)}
                onKeyUp={(event) => console.log(event)}
                onHoverStart={(event) => console.log(event)}
                onHoverEnd={(event) => console.log(event)}
                onHoverChange={(event) => console.log(event)}

                /* values writable to react aria button */
                name={props.name}
                value={props.value}
                isDisabled={props.isDisabled}
                autoFocus={props.autoFocus}
                type={props.type}
                tabIndex={props.tabIndex}
                className={`${props.classNameInput} w-full h-full`}
            >
                {props.children}
            </Button>
        }
        </div>
    )
}

export default CustomButton