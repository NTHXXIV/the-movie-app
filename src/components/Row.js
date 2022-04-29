import movieTrailer from "movie-trailer";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import apiService from "../app/apiService";
import "../style/Row.css";
import requests from "../requests";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { set } from "lodash";
import { addToFavorite } from "../app/localData";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useAuth } from "../contexts/AuthContext";
import LoadingScreen from "./LoadingScreen";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#141414",
  // border: "2px solid #000",
  boxShadow: 24,

  width: "80%",
  color: "white",
};

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [movie, setMovie] = useState();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState();

  const { currentUser } = useAuth();

  const handleClose = () => setOpen(false);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await apiService(fetchUrl);

      setMovies(response?.data.results);
      setLoading(false);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  const handleOpen = async (movie) => {
    console.log("movie", movie);
    setMovie(movie);
    setOpen(true);
    setLoadingModal(true);
    setError("");
    try {
      const response = await apiService(
        requests({ movieId: movie.id }).fetchYoutubeVideo
      );
      const data = response.data;
      console.log("data", data);

      if (data?.results?.length > 0) {
        setTrailerUrl(data.results[0].key);
      } else {
        movieTrailer(movie?.name).then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        });
      }
      setLoadingModal(false);
    } catch (error) {
      movieTrailer(movie?.name).then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setLoadingModal(false);
      });

      setError(error.response.data.status_message);
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            onClick={() => handleOpen(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={
              movie.backdrop_path
                ? `${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`
                : `https://i1.sndcdn.com/avatars-000302603395-fvngrz-t500x500.jpg`
            }
            alt="movie.name"
          />
        ))}
      </div>
      {trailerUrl && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {loadingModal ? (
              <LoadingScreen />
            ) : (
              <>
                <YouTube videoId={trailerUrl} opts={opts} />

                <div className="row__modal-title">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    ml={4}
                  >
                    {movie.title}
                  </Typography>
                  <div className="row__modal-btn-cover">
                    <PlayCircleFilledOutlinedIcon sx={{ cursor: "pointer" }} />
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`${movie.id}`}
                    >
                      <InfoOutlinedIcon />
                    </Link>
                    <Typography
                      sx={{ color: "white", cursor: "pointer" }}
                      onClick={() => addToFavorite(movie.id, currentUser.uid)}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Typography>
                  </div>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 0, p: 4 }}>
                  {movie.overview}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Row;
