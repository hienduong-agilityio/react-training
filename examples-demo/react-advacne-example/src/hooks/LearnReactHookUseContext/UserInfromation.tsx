import { useContext } from "react";
import { AppConTextType, AppContext } from "../Context/AppContext";
// const UserInfromation = ({ userData }: ISidebarContextExample) => {
const UserInfromation = () => {
  const { userData } = useContext(AppContext) as AppConTextType;

  console.log(userData);

  return (
    <div>
      <h5>User Information</h5>

      <p>{userData.avatar}</p>
      <p>{userData.last_name}</p>
    </div>
  );
};

export default UserInfromation;
