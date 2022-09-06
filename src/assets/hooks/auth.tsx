import React, { createContext, useContext, useState } from "react";
import { api } from "../repositories/api";

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
  name: string;
  idUser: number;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IProps> = ({ children }) => {
  // const isLogged = localStorage.getItem("@MinhaCarteira:logged");

  const [user, userSet] = useState<any>("");
  const [name, nameSet] = useState<any>("");
  const [idUser, idUserSet] = useState<any>("");

  api
    .get("users")
    .then((response) => userSet(response.data))
    .catch((error) => console.log("erro:", error));

  const signIn = (email: string, password: string) => {
    user.forEach((item: { email: string; password: string; idUser: number; name: string }) => {
      if (email === item.email && password === item.password) {
        // localStorage.setItem("@MinhaCarteira:logged", "true");
        loggedSet(true);
        nameSet(item.name);
        idUserSet(item.idUser);
      }
    });
  };

  // const [logged, loggedSet] = useState<boolean>(() => {
  //   return !!isLogged;
  // });
  const [logged, loggedSet] = useState<boolean>(false);

  const signOut = () => {
    // localStorage.removeItem("@MinhaCarteira:logged");
    loggedSet(false);
  };

  return <AuthContext.Provider value={{ logged, name, idUser, signIn, signOut }}>{children}</AuthContext.Provider>;
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
