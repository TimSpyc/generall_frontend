import React, { createContext, useState, useContext, cloneElement } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
import { GridLayoutContextType, GridLayoutProps, GridLayoutSizes, LayoutElementType } from '../types/grid-layout-types';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props: GridLayoutProps): JSX.Element => {
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

	const children = React.Children.toArray(props.children).map((child:any, index: number) => {
		if(layouts[currentBreakpoint] === undefined) layouts[currentBreakpoint] = {}

		if(layouts[currentBreakpoint].hasOwnProperty(child.props.name) === false) {
			layouts[currentBreakpoint][child.props.name] = {i: child.props.name, x: 0, y: 0, w: 3, h: 1}
		}
		
		return (
			<div key={child.props.name} data-grid={layouts[currentBreakpoint][child.props.name]}>
				{cloneElement(child, {index:index})}
			</div>
		)
	});

	const updateLayout = (gridLayouts:any) => {
		setLayouts((currentState:any) => {
			gridLayouts.forEach((layoutElement:LayoutElementType) => {
				currentState[currentBreakpoint][layoutElement.i] = {
					i: layoutElement.i, x: layoutElement.x, y: layoutElement.y, w: layoutElement.w, h: layoutElement.h
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
		<div className="mt-16 max-w-[1300px] mx-auto">
			<div className="absolute top-4">
				<button className={`ml-2 py-1 px-2 text-white mb-2 rounded-md ${isDraggable ? 'bg-green-400' : 'bg-red-400'}`} onClick={() => setIsDraggable(!isDraggable)}>Toggle Grid Edit</button>
				<button className={`ml-2 py-1 px-2 text-white mb-2 rounded-md ${isViewDraggable ? 'bg-green-400' : 'bg-red-400'}`} onClick={() => toggleEdit()}>Toggle Edit</button>
			</div>
			<GridLayoutContext.Provider value={{layouts, setLayouts, currentLayout, setCurrentLayout, isResizable, setIsResizable, updateGridEditable, isViewDraggable, isViewResizable, currentlyResizing}}>
				<ResponsiveGridLayout className="layout"
					breakpoints={{ lg: 1200, md: 800, sm: 600 }}
					cols={{ lg: 3, md: 2, sm: 1 }}
					rowHeight={615}
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
		</div>
	)
}

export default GridLayout

// Best practice for unassigned Contexts: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value
export const GridLayoutContext = createContext<GridLayoutContextType | any>({});
export const useGridLayoutContext = () => useContext(GridLayoutContext);