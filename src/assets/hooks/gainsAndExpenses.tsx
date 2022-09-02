import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../repositories/api";
import { useAuth } from "./auth";

interface IProps {
  children: React.ReactNode;
}

const GainsAndExpensesContext = createContext({} as any);

const GainsAndExpensesProvider: React.FC<IProps> = ({ children }) => {
  const { idUser } = useAuth();

  const [gains, gainsSet] = useState([]);
  const [expenses, expensesSet] = useState([]);

  useEffect(() => {
    api
      .get("gains", {
        params: {
          idUser: idUser,
        },
      })
      .then((response) => gainsSet(response.data))
      .catch((error) => console.log("erro:", error));

    api
      .get("expenses", {
        params: {
          idUser: idUser,
        },
      })
      .then((response) => expensesSet(response.data))
      .catch((error) => console.log("erro:", error));
  }, [idUser]);

  return <GainsAndExpensesContext.Provider value={{ gains, expenses }}>{children}</GainsAndExpensesContext.Provider>;
};

function useGainsAndExpenses() {
  const context = useContext(GainsAndExpensesContext);
  return context;
}

export { GainsAndExpensesProvider, useGainsAndExpenses };
