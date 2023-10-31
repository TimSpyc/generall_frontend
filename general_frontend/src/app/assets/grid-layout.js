import React, { createContext, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props) => {
	const [layout, setLayout] = useState()

	// always cast children to array for filtering and memorize them for better performance
	const children = React.useMemo(() => {
		return React.Children.toArray(props.children).map((val, idx) => {
			return <div key={val.props.name} data-grid={{ x: 0, y: 0, w: 3, h: 3 }}>{val}</div>;
		});
	}, [props.children]);

	const onLayoutChange = (layout) => {
		// TODO: save layout to server
		setLayout(layout)
	}

	return (
		<GridLayoutContext.Provider value={{layout, setLayout}}>
			<ResponsiveGridLayout className="layout"
				breakpoints={{ lg: 1200, md: 996, sm: 768 }}
				cols={{ lg: 3, md: 2, sm: 1 }}
				rowHeight={600}
				isDraggable={true} 
				isResizable={true}
				margin={[0,0]}
				onLayoutChange={onLayoutChange}>
				{children}
			</ResponsiveGridLayout>
		</GridLayoutContext.Provider>
	)
}

export default GridLayout
export const GridLayoutContext = createContext();