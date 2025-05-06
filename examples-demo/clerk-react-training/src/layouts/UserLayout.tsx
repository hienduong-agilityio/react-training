import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className=" w-full h-screen">
      <Outlet />
    </div>
  );
}
