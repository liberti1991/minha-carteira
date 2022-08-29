import React, { createContext, useContext, useState } from "react";

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [logged, loggedSet] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@MinhaCarteira:logged");

    return !!isLogged;
  });

  const signIn = (email: string, password: string) => {
    if (email === "aaa@gmail.com" && password === "aaa") {
      localStorage.setItem("@MinhaCarteira:logged", "true");
      loggedSet(true);
    } else {
      alert("Senha ou Usuário inválidos!");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@MinhaCarteira:logged");
    loggedSet(false);
  };

  return <AuthContext.Provider value={{ logged, signIn, signOut }}>{children}</AuthContext.Provider>;
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
