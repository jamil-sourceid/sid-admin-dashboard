/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// const EnvContext = createContext(null);

interface EnvContextType {
  envVariables: any;
  setEnvVariables: (data: any) => void;
}

const EnvContext = createContext<EnvContextType | null>(null);

interface EnvProviderProps {
  children: ReactNode; // ✅ Explicitly define the type for children
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ children }) => {
  const [envVariables, setEnvVariables] = useState(null);

  return (
    <EnvContext.Provider value={{ envVariables, setEnvVariables }}>
      {children}
    </EnvContext.Provider>
  );
};

// export const useEnv = () => useContext(EnvContext);

export const useEnv = () => {
  const context = useContext(EnvContext);
  if (!context) {
    throw new Error("useEnv must be used within a EnvProvider");
  }
  return context;
};
