import React, { createContext, useState, useContext, cloneElement } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";

type GridLayoutContextType = {
	layouts: object,
	setLayouts: Function,
	currentLayout: object
	updateGridEditable: Function,
	isViewDraggable: Boolean,
	isViewResizable: Boolean,
	currentlyResizing: Boolean
}

type GridLayoutProps = {
	name: string,
	children: JSX.Element[],
}

type GridLayoutSizes = {
	sm: any,
	md: any,
	lg: any,
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props: GridLayoutProps) => {
	const [layouts, setLayouts] = useState(() => {
		if(localStorage.getItem(props.name)) {
			return JSON.parse(localStorage.getItem(props.name)!)
		} 
		else {
			let sizes:GridLayoutSizes = {sm: {}, md: {}, lg: {}}

			React.Children.map(props.children, (element:JSX.Element, index: number) => {
				sizes.sm[element.props.name] = {i: element.props.name, x: 0, y: 0, w: 3, h: 1}
				sizes.md[element.props.name] = {i: element.props.name, x: 0, y: 0, w: 2, h: 1}
				sizes.lg[element.props.name] = {i: element.props.name, x: 0, y: 0, w: 1, h: 1}
			})

			return sizes
		}
	})

	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [currentLayout, setCurrentLayout] = useState(layouts[currentBreakpoint])
	const [isDraggable, setIsDraggable] = useState<boolean>(true)
	const [isResizable, setIsResizable] = useState<boolean>(true)
	const [isViewDraggable, setIsViewDraggable] = useState<boolean>(false)
	const [isViewResizable, setIsViewResizeable] = useState<boolean>(false)
	const [currentlyResizing, setCurrentlyResizing] = useState<boolean>(false)

	const children = React.Children.map(props.children, (child:JSX.Element, index: number) => {
		if(layouts[currentBreakpoint] === undefined) layouts[currentBreakpoint] = {}

		if(layouts[currentBreakpoint].hasOwnProperty(child.props.name) === false) {
			layouts[currentBreakpoint][child.props.name] = {i: child.props.name, x: 0, y: 0, w: 3, h: 1}
		}

		return (
			<div key={child.props.name} data-grid={layouts[currentBreakpoint][child.props.name]}>
				{cloneElement(child, {index:index})}
			</div>
		);
	});

	const updateLayout = (layouts:any) => {
		setLayouts((currentState:any) => {
			layouts.forEach((elementDimension:any) => {
				currentState[currentBreakpoint][elementDimension.i] = {
					i: elementDimension.i, x: elementDimension.x, y: elementDimension.y, w: elementDimension.w, h: elementDimension.h
				}
			})
			localStorage.setItem(props.name, JSON.stringify(currentState))
      		return {...currentState};
		})
	}

	const updateGridEditable = (event:boolean) => {
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
			<button className='py-2 px-3 bg-yellow-400 text-white mb-2' onClick={() => toggleEdit()}>Toggle Edit</button>
			<GridLayoutContext.Provider value={{layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing}}>
				<ResponsiveGridLayout className="layout"
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

// Best practice for unassigned Contexts: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value
export const GridLayoutContext = createContext<GridLayoutContextType | any>({});
export const useGridLayoutContext = () => useContext(GridLayoutContext);