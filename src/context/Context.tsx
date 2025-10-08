"use client";
import { createContext, useState } from "react";
import { ITaskRepository } from "../repositories/types/ITaskRepository";
import { postgreRepository } from "../repositories/PostgreRepository/postgreRepository";

interface IContextValues {
  repo: ITaskRepository;
}

export const RepositoryContext = createContext<IContextValues>({} as IContextValues);

export function RepositoryContextWrapper({ children }: { children: React.ReactNode }) {
  const [repo, setRepo] = useState(postgreRepository); // set this value checking if user is signed in

  const contextValues: IContextValues = {
    repo,
  };
  return <RepositoryContext.Provider value={contextValues}>{children}</RepositoryContext.Provider>;
}
