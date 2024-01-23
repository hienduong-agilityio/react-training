import "./App.css";
import {
  CallBackTutorial,
  ParentComponent,
} from "./hooks/DemoUseCallBack/DemoUseCallBack";
import LearnCallBack from "./hooks/LearnReactHookUseCallBack";
// import MyComponent from "./hooks/DemoUseContext/MyContextComponent";
// import MyContextProvider from "./hooks/DemoUseContext/MyContextProvider";

function App() {
  return (
    <div className="App">
      {/* Call back example */}
      <CallBackTutorial />
      <ParentComponent />

      {/* Context
      <MyContextProvider>
        <MyComponent />
      </MyContextProvider> */}
      <LearnCallBack />
    </div>
  );
}

export default App;
