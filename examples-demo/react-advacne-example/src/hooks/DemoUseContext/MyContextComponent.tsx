import React, { useContext } from "react";

function MyComponent() {
  const valueFromContext = useContext(MyContext);

  return <div>Giá trị từ Context: {valueFromContext}</div>;
}

export default MyComponent;
