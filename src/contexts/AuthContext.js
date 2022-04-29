import { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../firebse";
import { createFavoriteList } from "../app/localData";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      window.localStorage.setItem("user", JSON.stringify(user));
      const favoriteList = createFavoriteList(user?.uid);
      setCurrentUser({ ...user, favorites: favoriteList });

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
