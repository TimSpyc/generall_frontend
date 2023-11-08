import React, { createContext, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props) => {
	const [layouts, setLayouts] = useState({
		sm: [
			{i: "custom-asset-test", x: 0, y: 0, w: 3, h: 1}
		],
		md: [
			{i: "custom-asset-test", x: 0, y: 0, w: 3, h: 1}
		],
		lg: [
			{i: "custom-asset-test", x: 0, y: 0, w: 3, h: 1}
		],
	})

	const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
	const [currentLayout, setCurrentLayout] = useState(layouts[currentBreakpoint])

	const [isDraggable, setIsDraggable] = useState(true)
	const [isResizeable, setIsResizeable] = useState(true)

	const children = React.useMemo(() => {
		return React.Children.toArray(props.children).map((val, idx) => (
			<div key={val.props.name} data-grid={layouts[currentBreakpoint][idx]}>{val}</div>
		))
	}, [props.children]);

	const updateLayout = (event) => {
		setCurrentLayout(event)
	}

	const updateGridEditable = (event) => {
		setIsDraggable(event ? true : false)
	}

	return (
		<GridLayoutContext.Provider value={{layouts, setLayouts, currentLayout, updateGridEditable}}>
			<ResponsiveGridLayout className="layout"
				key={JSON.stringify({isDraggable: isDraggable, isResizeable: isResizeable})}
				breakpoints={{ lg: 1200, md: 996, sm: 768 }}
				cols={{ lg: 3, md: 2, sm: 1 }}
				rowHeight={600}
				isDraggable={isDraggable}
				isResizable={isResizeable}
				margin={[0,0]}
				measureBeforeMount={false}
				onBreakpointChange={setCurrentBreakpoint}
				onLayoutChange={updateLayout}>
				{children}
			</ResponsiveGridLayout>
		</GridLayoutContext.Provider>
	)
}

export default GridLayout
export const GridLayoutContext = createContext();