import "./App.css";
import {
  CallBackTutorial,
  ParentComponent,
} from "./hooks/DemoUseCallBack/DemoUseCallBack";
import MyComponent from "./hooks/DemoUseContext/MyContextComponent";
import MyContextProvider from "./hooks/DemoUseContext/MyContextProvider";

function App() {
  return (
    <div className="App">
      {/* Call back example */}
      <CallBackTutorial />
      <ParentComponent />

      {/* Context */}
      <MyContextProvider>
        <MyComponent />
      </MyContextProvider>
    </div>
  );
}

export default App;
