"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RepositoryContextWrapper } from "../context/Context";
import Navbar from "../components/Navbar/Navbar";
import App from "../components/App/App";
import LandingPage from "../views/LandingPage/LandingPage";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Home() {
  const { authState } = useSelector((state: RootState) => state.auth);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RepositoryContextWrapper>
        <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-4 relative">
          <Navbar />

          {authState == "unknown" ? (
            <div className="w-full h-screen flex items-center justify-center ">
              <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 50 50" role="img" aria-label="loading">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#000" stroke-opacity="0.15" stroke-width="5" />
                <g transform="translate(25,25)">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#3b82f6" stroke-width="5" stroke-linecap="round" stroke-dasharray="62.8" stroke-dashoffset="47">
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.7s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>
          ) : authState == "on" ? (
            <App />
          ) : (
            <LandingPage />
          )}
        </main>
      </RepositoryContextWrapper>
    </QueryClientProvider>
  );
}
