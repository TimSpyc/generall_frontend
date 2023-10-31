import React, { createContext, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GeneralPage(props) {
  // always cast children to array for filtering
  let children = React.Children.toArray(props.children)

	const [draggable, setDraggable] = useState(false)

	const responsivelayouts = {
		lg: [{ i: ".0", x: 6, y: 0, w: 6, h: 6, minW: 4, maxW: 12 }],
	}

	const toggleDraggable = () => {
		setDraggable(!draggable)
	}

  return (
    <div className='min-h-screen min-w-screen'>
				<button className='rounded-md border border-gray-900 text-sm px-2 py-0.5' onClick={() => toggleDraggable()}>
					{draggable ? 'Disable Dragging' : 'Enable Dragging'}
				</button>
        <ResponsiveGridLayout className="layout min-h-screen min-w-screen" layout={responsivelayouts} 
					breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        	cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }} 
					rowHeight={400}
					isDraggable={draggable} 
					isResizable={draggable}
					margin={[0,0]}>
          {children}
        </ResponsiveGridLayout>
    </div>
  )
}