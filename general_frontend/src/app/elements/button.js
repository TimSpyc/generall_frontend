import { useViewContext } from "../layout/view";
import { useAssetContext } from "../layout/asset";
import { useGridLayoutContext } from "../layout/grid-layout"

const CustomButton = (props) => {
    const {handleActions} = useAssetContext();
    const {isViewDraggable} = useGridLayoutContext();

    return (
        <div className={`
			${props.classNameInputWrapper} 
			${isViewDraggable ? 'pointer-events-none border-green-400 unselectable' : 'border-gray-400'} 
			w-full h-full shadow-sm rounded-md border text-black skeleton`
        }>
			<button 
				/* events emittet from react aria button */
				onClick={(event) => handleActions(props.action, props.actionProps, event)} 

				/* values writable to react aria button */
				name={props.name}
				value={props.value}
				autoFocus={props.autoFocus}
				type={props.type}
				tabIndex={props.tabIndex}
				className={`${props.classNameInput} w-full h-full`}
			>
				{props.children}
			</button>
        </div>
    )
}

export default CustomButton