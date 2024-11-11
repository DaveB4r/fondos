import React, {createContext, useState, ReactNode, useContext, FC, useEffect} from "react";

type AppContextType = {
  balance: number;
  updateBalance: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider:FC<{children: ReactNode}> = ({children}) => {
  const [balance, setBalance] = useState<number>(500000);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/balance/672fba602470e35bd7ee25b4')
    .then(response => response.json())
    .then(json => setBalance(Number(json.saldo)))
  }, [balance])

  const updateBalance = (amount: number) => {
    setBalance(amount)
  };

  return (
    <AppContext.Provider value={{balance, updateBalance}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error('UseAppContext muy be used within an AppProvider')
  }
  return context;
}

export default AppProvider;