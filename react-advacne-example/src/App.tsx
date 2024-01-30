// import { useState } from "react";
import "./App.css";
import "./styles/index.css";
// import {
//   CallBackTutorial,
//   ParentComponent,
// } from "./hooks/DemoUseCallBack/DemoUseCallBack";
// import LearnCallBack from "./hooks/LearnReactHookUseCallBack";
// import { Content, Header, Sidebar } from "./hooks/LearnReactHookUseContext";

// import MyComponent from "./hooks/DemoUseContext/MyContextComponent";
// import MyContextProvider from "./hooks/DemoUseContext/MyContextProvider";
// import { AppProvider } from "./hooks/Context/AppContext";
// import ReducerTutorial from "./hooks/DemoUseReduces/ReducerTutorial ";
// import MemoTutorial from "./hooks/DemoUseMemo/MemoTutorial";
// import RefTutorial from "./hooks/DemoUseRef/RefTutorial";
// import DemoSuspenseCard from "./hooks/DemoSuspense/DemoSuspenseCard";
import { Suspense, lazy } from "react";
import DemoSuspenseCardSkeleton from "./hooks/DemoSuspense/DemoSuspenseSkeleton";
import Button from "./components/Button/Button";

function App() {
  // const [isOpen, setIsOpen] = useState(false);
  const Card = lazy(() => import("./hooks/DemoSuspense/DemoSuspenseCard"));

  return (
    <div className="App">
      {/* Call back example */}
      {/* <CallBackTutorial />
      <ParentComponent /> */}

      {/* Context
      <MyContextProvider>
        <MyComponent />
      </MyContextProvider> */}
      {/* <LearnCallBack /> */}
      {/* Any children in AppProvider can use state  */}
      {/* <AppProvider>
        <> */}
      {/* <Header isOpen={isOpen} setIsOpen={setIsOpen} userData={userData} />
          <Content isOpen={isOpen} />
          {isOpen && <Sidebar userData={userData} />} */}
      {/* <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Content isOpen={isOpen} />
          {isOpen && <Sidebar />} */}
      {/* </>
      </AppProvider> */}
      {/* 
      <ReducerTutorial />
      <MemoTutorial />
      <RefTutorial /> */}
      <Suspense fallback={<DemoSuspenseCardSkeleton />}>
        <Card />
      </Suspense>
      <Button color="icon"> hello</Button>
    </div>
  );
}

export default App;
