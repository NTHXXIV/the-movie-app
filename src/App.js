import React from "react";
import "./style/App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
