import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  userToken: string;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoading: false,
  userToken: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState("");
  const login = async (token: string) => {
    setIsLoading(true);
    setUserToken(token);
    await AsyncStorage.setItem("userToken", token);
    
    setIsLoading(false);
    console.log(userToken);
  };

  const logout = () => {
    // perform logout logic here
    setIsLoading(true);
    setUserToken("");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken || ""); // set empty string if userToken is null
      setIsLoading(false);
      console.log("entro")
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  )

};