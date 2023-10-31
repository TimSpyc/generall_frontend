import "./App.css";
import GeneralFrontendAsset from "./base_components";
import GeneralAssetDataProvider, {GeneralAssetDataContext} from "./context/generalAssetContext"
import TestElement from "./testElement";

function App() {
  return (
    <div className="App">
      <div>
        <GeneralAssetDataProvider>
          <GeneralFrontendAssets name="test">
            <GeneralFrontendAsset 
              min={{width: 1, height: 1}} 
              max={{width: 2, height: 3}} 
              api="https://cat-fact.herokuapp.com/facts?1"
            >
              
            </GeneralFrontendAsset>
            <GeneralFrontendAsset
              key="boms" 
              view={["edit", "detail"]}
              min={{width: 1, height: 1}} 
              max={{width: 2, height: 3}} 
              api="https://cat-fact.herokuapp.com/facts?1"
            />
            <GeneralFrontendAsset 
              key="profile_price"
              view={['list']}
              min={{width: 1, height: 1}} 
              max={{width: 2, height: 3}} 
              api="https://cat-fact.herokuapp.com/facts?1"
            />
          </GeneralFrontendAssets>
        </GeneralAssetDataProvider>

        <GeneralAssetDataProvider>
          <GeneralFrontendAsset name="test">
            <TestElement 
              min={{width: 1, height: 1}} 
              max={{width: 2, height: 3}} 
              api="https://cat-fact.herokuapp.com/facts?2"
            />
          </GeneralFrontendAsset>
        </GeneralAssetDataProvider>

        <GeneralAssetDataProvider>
          <GeneralFrontendAsset name="test">
            <TestElement 
              min={{width: 1, height: 1}} 
              max={{width: 2, height: 3}} 
              api="https://cat-fact.herokuapp.com/facts?3"
            />
          </GeneralFrontendAsset>
        </GeneralAssetDataProvider>

        <GeneralAssetDataProvider>
          <GeneralFrontendAsset name="test">
            <TestElement 
              min={{width: 1, height: 1}} 
              max={{width: 2, height: 3}} 
              api="https://cat-fact.herokuapp.com/facts?4"
            />
          </GeneralFrontendAsset>
        </GeneralAssetDataProvider>
      </div>
    </div>
  );
}

export default App;
