import React, {
  createContext,
  useState,
  useContext,
  cloneElement,
} from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  GridLayoutContextType,
  GridLayoutProps,
  GridLayoutSizes,
  LayoutElementType,
} from "../types/grid-layout-types";
import { each } from "lodash";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props: GridLayoutProps): JSX.Element => {
  let sizes: GridLayoutSizes = { sm: {}, md: {}, lg: {} };

  const removeUnusedChildren = (children: any) => {
    let existingChildren: any = [];

    React.Children.map(
      props.children,
      (element: JSX.Element, index: number) => {
        existingChildren.push(element.props.name);
      }
    );

    each(children, (size, sizeKey) => {
      each(size, (element, elementKey: number) => {
        if (
          existingChildren.indexOf(elementKey) === -1 &&
          children[sizeKey][elementKey]
        ) {
          delete children[sizeKey][elementKey];
        }
      });
    });

    return children;
  };

  const [layouts, setLayouts] = useState(() => {
    if (typeof window !== "undefined" && localStorage.getItem(props.name)) {
      return removeUnusedChildren(
        JSON.parse(localStorage.getItem(props.name)!)
      );
    } else {
      React.Children.map(
        props.children,
        (element: JSX.Element, index: number) => {
          sizes.sm[element.props.name] = {
            i: element.props.name,
            x: 0,
            y: 0,
            w: 3,
            h: 1,
          };
          sizes.md[element.props.name] = {
            i: element.props.name,
            x: 0,
            y: 0,
            w: 2,
            h: 1,
          };
          sizes.lg[element.props.name] = {
            i: element.props.name,
            x: 0,
            y: 0,
            w: 1,
            h: 1,
          };
        }
      );

      return removeUnusedChildren(sizes);
    }
  });

  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [currentLayout, setCurrentLayout] = useState(
    layouts[currentBreakpoint]
  );
  const [isDraggable, setIsDraggable] = useState<boolean>(true);
  const [isResizable, setIsResizable] = useState<boolean>(true);
  const [isViewDraggable, setIsViewDraggable] = useState<boolean>(false);
  const [isViewResizable, setIsViewResizeable] = useState<boolean>(false);
  const [currentlyResizing, setCurrentlyResizing] = useState<boolean>(false);
  const [windowCurrentlyResizing, setWindowCurrentlyResizing] =
    useState<boolean>(false);

  // recognize window resize for disabling setting the layout
  let timeout: NodeJS.Timeout;

  if (typeof window !== "undefined") {
    window.onresize = function () {
      setWindowCurrentlyResizing(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setWindowCurrentlyResizing(false), 100);
    };
  }

  const children = React.Children.toArray(props.children).map(
    (child: any, index: number) => {
      if (layouts[currentBreakpoint] === undefined)
        layouts[currentBreakpoint] = {};

      if (
        layouts[currentBreakpoint].hasOwnProperty(child.props.name) === false
      ) {
        layouts[currentBreakpoint][child.props.name] = {
          i: child.props.name,
          x: 0,
          y: 0,
          w: 3,
          h: 1,
        };
      }

      return (
        <div
          key={child.props.name}
          data-grid={layouts[currentBreakpoint][child.props.name]}
        >
          {cloneElement(child, { index: index })}
        </div>
      );
    }
  );

  console.log(children)

  const updateLayout = (currentLayout: LayoutElementType[]) => {
    if (windowCurrentlyResizing === false) {
      setLayouts((currentState: any) => {
        currentLayout.forEach((layoutElement: LayoutElementType) => {
          currentState[currentBreakpoint][layoutElement.i] = {
            i: layoutElement.i,
            x: layoutElement.x,
            y: layoutElement.y,
            w: layoutElement.w,
            h: layoutElement.h,
          };
        });

        localStorage.setItem(props.name, JSON.stringify(currentState));
        return { ...currentState };
      });
    }
  };

  const updateGridEditable = (event: boolean) => {
    setIsDraggable(event ? true : false);
  };

  const toggleEdit = () => {
    // resize should always be possible
    setIsViewDraggable(isDraggable);
    setIsViewResizeable(isDraggable);
    setIsDraggable(!isDraggable);
  };

  return (
    <div className="mt-16 max-w-[1300px] mx-auto">
      <div className="absolute top-4">
        <button
          className={`ml-2 py-1 px-2 text-white mb-2 rounded-md ${
            isDraggable ? "bg-green-400" : "bg-red-400"
          }`}
          onClick={() => setIsDraggable(!isDraggable)}
        >
          Toggle Grid Edit
        </button>
        <button
          className={`ml-2 py-1 px-2 text-white mb-2 rounded-md ${
            isViewDraggable ? "bg-green-400" : "bg-red-400"
          }`}
          onClick={() => toggleEdit()}
        >
          Toggle Edit
        </button>
      </div>
      <GridLayoutContext.Provider
        value={{
          layouts,
          setLayouts,
          currentLayout,
          setCurrentLayout,
          isResizable,
          setIsResizable,
          updateGridEditable,
          isViewDraggable,
          isViewResizable,
          currentlyResizing,
        }}
      >
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 800, sm: 600 }}
          cols={{ lg: 3, md: 2, sm: 1 }}
          rowHeight={615}
          isDraggable={isDraggable}
          isResizable={isResizable}
          onResizeStart={() => setCurrentlyResizing(true)}
          onResizeStop={() => setCurrentlyResizing(false)}
          margin={[0, 0]}
          measureBeforeMount={false}
          onBreakpointChange={setCurrentBreakpoint}
          onLayoutChange={updateLayout}
        >
          {children}
        </ResponsiveGridLayout>
      </GridLayoutContext.Provider>
    </div>
  );
};

export default GridLayout;

// Best practice for unassigned Contexts: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value
export const GridLayoutContext = createContext<GridLayoutContextType | any>({});
export const useGridLayoutContext = () => useContext(GridLayoutContext);
