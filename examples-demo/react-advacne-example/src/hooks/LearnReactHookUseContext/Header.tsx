import { useContext } from "react";
import { AppConTextType, AppContext } from "../Context/AppContext";

interface IHeaderContextExample {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  //   userData: IUserData;
}

export interface IUserData {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export default function Header({ isOpen, setIsOpen }: IHeaderContextExample) {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { userData } = useContext(AppContext) as AppConTextType;

  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "right",
        backgroundColor: "rgb(228, 228, 228)",
        padding: "10px",
        gridColumn: isOpen ? "2 / 4" : "1 / 4",
        gridRow: "1 / 2",
      }}
    >
      <div>Hello! {userData.first_name} </div>
      <p style={{ cursor: "pointer" }} onClick={toggleSidebar}>
        My profile
      </p>
    </div>
  );
}
