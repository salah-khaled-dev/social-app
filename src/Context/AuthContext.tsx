
import { createContext, useState, useEffect, ReactNode } from "react";

export interface AuthContextType {
  userLogin: any;
  setUserLogin: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType>({
  userLogin: null,
  setUserLogin: () => {},
});

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userLogin, setUserLogin] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
}