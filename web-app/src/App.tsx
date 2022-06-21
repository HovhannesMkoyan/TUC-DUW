import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SingleFile from "./components/SingleFile/SingleFile";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import OverPageLoader from "./components/Helpers/over-page-loader/OverPageLoader";
import Context from "./Context";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(): JSX.Element {
  return (
    <React.StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Context>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route element={<NotFoundPage />} />
                <Route path="/file/:uuid" element={<SingleFile />} />
              </Routes>
              <OverPageLoader />
            </div>
          </Context>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </React.StrictMode>
  );
}
