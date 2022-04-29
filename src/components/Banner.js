import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";
import requests from "../requests";
import "../style/Banner.css";
import { Link } from "react-router-dom";
const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiService.get(requests().fetchTrending);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
      return response;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner--title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <Link style={{ textDecoration: "none" }} to={`${movie.id}`}>
            <button className="banner__button">Play</button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/profile">
            <button className="banner__button">My List</button>
          </Link>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
