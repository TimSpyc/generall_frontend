import React, { createContext, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props) => {
	const [layouts, setLayouts] = useState(() => {
		let sizes = {sm: [], md: [], lg: []}

		React.Children.toArray(props.children).map((val, idx) => {
			sizes.sm.push({i: val.props.name, x: 0, y: 0, w: 3, h: 1})
			sizes.md.push({i: val.props.name, x: 0, y: 0, w: 2, h: 1})
			sizes.lg.push({i: val.props.name, x: 0, y: 0, w: 1, h: 1})
		})

		return sizes
	})

	const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
	const [currentLayout, setCurrentLayout] = useState(layouts[currentBreakpoint])

	const [isDraggable, setIsDraggable] = useState(true)
	const [isResizable, setIsResizable] = useState(true)
	const [isViewDraggable, setIsViewDraggable] = useState(false)
	const [isViewResizable, setIsViewResizeable] = useState(false)

	const children = React.useMemo(() => {
		return React.Children.toArray(props.children).map((val, idx) => {
			return (<div key={val.props.name} data-grid={layouts[currentBreakpoint][idx]}>{val}</div>);
		})
	}, [props.children]);

	const updateLayout = (event) => {
		setCurrentLayout(event)
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
			<GridLayoutContext.Provider value={{layouts, setLayouts, currentLayout, updateGridEditable, isViewDraggable, isViewResizable}}>
				<ResponsiveGridLayout className="layout"
					key={[isDraggable, isResizable]}
					breakpoints={{ lg: 1200, md: 996, sm: 768 }}
					cols={{ lg: 3, md: 2, sm: 1 }}
					rowHeight={600}
					isDraggable={isDraggable}
					isResizable={isResizable}
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