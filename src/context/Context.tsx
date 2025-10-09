"use client";
import { createContext, useState } from "react";
import { ITaskRepository } from "../repositories/types/ITaskRepository";
import { postgreRepository } from "../repositories/PostgreRepository/postgreRepository";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { localStorageRepository } from "../repositories/localStorageRepository/localStorageRepository";

interface IContextValues {
  repo: ITaskRepository;
}

export const RepositoryContext = createContext<IContextValues>({} as IContextValues);

export function RepositoryContextWrapper({ children }: { children: React.ReactNode }) {
  const { authState } = useSelector((state: RootState) => state.auth);
  const [repo, setRepo] = useState(authState == "on" ? postgreRepository : localStorageRepository); // set this value checking if user is signed in

  const contextValues: IContextValues = {
    repo,
  };
  return <RepositoryContext.Provider value={contextValues}>{children}</RepositoryContext.Provider>;
}
