import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRequire from "./AuthRequire";
import LoginScreen from "../components/screens/LoginScreen";
import HomeScreen from "../components/screens/HomeScreen";
import ProfileScreen from "../components/screens/ProfileScreen";
import MovieDetails from "../components/MovieDetails";
import "../style/index.css";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <HomeScreen />
          </AuthRequire>
        }
      />
      <Route
        path="profile"
        element={
          <AuthRequire>
            <ProfileScreen />
          </AuthRequire>
        }
      />
      <Route
        path=":movieId"
        element={
          <AuthRequire>
            <MovieDetails />
          </AuthRequire>
        }
      />

      <Route path="login" element={<LoginScreen />} />
    </Routes>
  );
}

export default Router;
