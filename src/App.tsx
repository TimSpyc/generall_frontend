import React from "react";
import "./App.css";
import GeneralFrontendAsset from "./base_components";
import TestElement from "./testElement";

function App() {
  return (
    <div className="App">
      <div>
        <h1>React + TypeScript</h1>
        <GeneralFrontendAsset
          name="test"
          api_data={{
            test: { text: "Found this one!!!" },
            test1: { text: "Found this second!!!" },
          }}
          size={["1x1"]}
          elements={[
            {
              view: "detail",
              jsx: <TestElement link_to_data={"test"}></TestElement>,
              element_id: "test",
            },
            {
              view: "detail",
              jsx: <TestElement link_to_data={"test1"}></TestElement>,
              element_id: "test1",
            },
          ]}
          view_config={[
            {
              element_id: "test",
              size: "1x1",
              position: 0,
              view: "detail",
            },
            {
              element_id: "test",
              size: "2x1",
              position: 0,
              view: "detail",
            },
            {
              element_id: "test1",
              size: "2x1",
              position: 0,
              view: "detail",
            },
            {
              element_id: "test1",
              size: "1x2",
              position: 0,
              view: "detail",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
