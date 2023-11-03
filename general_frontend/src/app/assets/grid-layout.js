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

	// always cast children to array for filtering and memorize them for better performance
	const children = React.useMemo(() => {
		return React.Children.toArray(props.children).map((val, idx) => {
			return <div key={val.props.name}>{val}</div>;
		});
	}, [props.children]);

	const updateLayout = (event) => {
		console.log(event, currentBreakpoint)
		setCurrentLayout(event)
	}

	return (
		<GridLayoutContext.Provider value={{layouts, setLayouts, currentLayout, setCurrentLayout}}>
			<ResponsiveGridLayout className="layout"
				breakpoints={{ lg: 1200, md: 996, sm: 768 }}
				cols={{ lg: 3, md: 2, sm: 1 }}
				rowHeight={600}
				isDraggable={true}
				isResizable={true}
				margin={[0,0]}
				layouts={layouts}
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