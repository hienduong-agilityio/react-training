import { createContext, useEffect, useState } from "react";
import { IUserData } from "../LearnReactHookUseContext/Header";

export type AppConTextType = {
  userData: IUserData;
  setUserData: (userData: IUserData) => void;
};

export const AppContext = createContext<AppConTextType | null>(null);

interface IAppProvider {
  children: JSX.Element;
}

export const AppProvider = ({ children }: IAppProvider) => {
  const [userData, setUserData] = useState<IUserData>({
    avatar: "",
    email: "",
    id: 0,
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    fetch("https://reqres.in/api/users/2")
      .then((res) => res.json())
      .then((res) => setUserData(res.data));
  }, []);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};
