import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserContextProvider from "./context/UserContext/UserContextProvider.tsx";
import CommentContextProvider from "./context/CommentContext/CommentContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <CommentContextProvider>
        <App />
      </CommentContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
