import React, { useState, useEffect } from "react";
import "../../style/profilescreen.css";
import MovieCard from "../MovieCard";
import Navbar from "../Navbar";
import UserInformation from "../UserInformation";
import { useAuth } from "../../contexts/AuthContext";

function ProfileScreen() {
  const { currentUser } = useAuth();
  console.log(currentUser.favorites);
  const [listMovieId, setListMovieId] = useState(currentUser.favorites);
  const [rawData, setRawData] = useState(localStorage.getItem("favorite"));

  useEffect(() => {
    async function getFavorite() {
      const data = JSON.parse(rawData)[currentUser.uid];
      setListMovieId(data);
    }
    getFavorite();
  }, [rawData]);

  console.log(listMovieId);
  return (
    <div className="profileScreen">
      <Navbar />
      <UserInformation />
      {listMovieId.map((favoriteMovie) => (
        <MovieCard
          key={favoriteMovie}
          favoriteMovie={favoriteMovie}
          setRawData={setRawData}
        />
      ))}
    </div>
  );
}

export default ProfileScreen;
