import React, { createContext } from "react";

const MyContext = createContext("x");

function MyContextProvider(props) {
  const myValue = "Miss u again, it so heart, i need u";
  return (
    <MyContext.Provider value={myValue}>{props.children}</MyContext.Provider>
  );
}

export default MyContextProvider;
