import React, { createContext, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props) => {
	const [layouts, setLayouts] = useState(() => {
		if(localStorage.getItem(props.name)) {
			return JSON.parse(localStorage.getItem(props.name))
		} 
		else {
			let sizes = {sm: {}, md: {}, lg: {}}
			React.Children.toArray(props.children).map((val, idx) => {
				sizes.sm[val.props.name] = {i: val.props.name, x: 0, y: 0, w: 3, h: 1}
				sizes.md[val.props.name] = {i: val.props.name, x: 0, y: 0, w: 2, h: 1}
				sizes.lg[val.props.name] = {i: val.props.name, x: 0, y: 0, w: 1, h: 1}
			})
			return sizes
		}
	})

	const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
	const [currentLayout, setCurrentLayout] = useState(layouts[currentBreakpoint])
	const [isDraggable, setIsDraggable] = useState(true)
	const [isResizable, setIsResizable] = useState(true)
	const [isViewDraggable, setIsViewDraggable] = useState(false)
	const [isViewResizable, setIsViewResizeable] = useState(false)
	const [currentlyResizing, setCurrentlyResizing] = useState(false)

	const children = React.useMemo(() => {
		if(layouts[currentBreakpoint] === undefined) layouts[currentBreakpoint] = {}
		return React.Children.toArray(props.children).map((element, idx) => {
			if(layouts[currentBreakpoint].hasOwnProperty(element.props.name) === false) {
				layouts[currentBreakpoint][element.props.name] = {i: element.props.name, x: 0, y: 0, w: 3, h: 1}
			}

			return (<div key={element.props.name} data-grid={layouts[currentBreakpoint][element.props.name]}>{element}</div>);
		})
	}, [props.children]);

	const updateLayout = (event) => {
		setLayouts(currentState => {
			event.forEach((element, idx) => {
				currentState[currentBreakpoint][element.i] = {
					i: element.i, x: element.x, y: element.y, w: element.w, h: element.h
				}
			})
			localStorage.setItem(props.name, JSON.stringify(currentState))
      		return {...currentState};
		})
	}

	const updateGridEditable = (event) => {
		setIsDraggable(event ? true : false)
	}

	const toggleEdit = () => {
		// resize should always be possible
		setIsViewDraggable(isDraggable)
		setIsViewResizeable(isDraggable)
		setIsDraggable(!isDraggable)
	}

	return (
		<>
			<button className='py-2 px-3 bg-yellow-400 text-white rounded-md mb-2' onClick={() => toggleEdit()}>Toggle Edit</button>
			<GridLayoutContext.Provider value={{layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing}}>
				<ResponsiveGridLayout className="layout"
					key={[isDraggable, isResizable]}
					breakpoints={{ lg: 1200, md: 996, sm: 768 }}
					cols={{ lg: 3, md: 2, sm: 1 }}
					rowHeight={600}
					isDraggable={isDraggable}
					isResizable={isResizable}
					onResizeStart={() => setCurrentlyResizing(true)}
					onResizeStop={() => setCurrentlyResizing(false)}
					margin={[0,0]}
					measureBeforeMount={false}
					onBreakpointChange={setCurrentBreakpoint}
					onLayoutChange={updateLayout}>
					{children}
				</ResponsiveGridLayout>
			</GridLayoutContext.Provider>
		</>
	)
}

export default GridLayout
export const GridLayoutContext = createContext();