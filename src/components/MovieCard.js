import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import requests from "../requests";
import apiService from "../app/apiService";
import DividerStack from "./DividerStack";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { removeFromFavorite } from "../app/localData";
import { useAuth } from "../contexts/AuthContext";

function MovieDetails({ favoriteMovie, setRawData }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    if (favoriteMovie) {
      const getMovie = async () => {
        setLoading(true);
        try {
          const res = await apiService(
            requests({ movieId: favoriteMovie }).fetchMovieDetail
          );
          setMovie(res.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getMovie();
    }
  }, [favoriteMovie]);
  return (
    <Container sx={{ my: 1 }}>
      <Box sx={{ position: "relative", height: 1, marginTop: 10 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {movie && (
                  <Card>
                    <Grid container>
                      <Grid
                        item
                        xs={4}
                        md={2}

                        // sx={{ background: "#141414" }}
                      >
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                position: "absolute",
                                top: "80%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                            >
                              <PlayCircleFilledOutlinedIcon
                                sx={{
                                  fontSize: 24,
                                  color: "red",
                                  marginRight: 0.5,
                                  "&:hover": {
                                    color: "gray",
                                  },
                                }}
                              />

                              <Typography
                                sx={{ color: "red", cursor: "pointer" }}
                                onClick={() => {
                                  removeFromFavorite(movie.id, currentUser.uid);
                                  setRawData(localStorage.getItem("favorite"));
                                }}
                              >
                                <RemoveCircleOutlineOutlinedIcon
                                  sx={{
                                    fontSize: 24,
                                    color: "red",
                                    marginRight: 0.5,
                                    "&:hover": {
                                      color: "gray",
                                    },
                                  }}
                                />
                              </Typography>
                              <ThumbUpOutlinedIcon
                                sx={{
                                  fontSize: 24,
                                  color: "red",
                                  marginRight: 0.5,
                                  "&:hover": {
                                    color: "gray",
                                  },
                                }}
                              />
                            </Box>
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={`${requests().base_url}${movie.poster_path}`}
                              alt="movie"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={7} md={7} ml={2} mt={2}>
                        <Typography variant="h5">
                          {movie.original_title}
                          <Stack
                            sx={{
                              border: 1,
                              display: "inline-block",
                              marginLeft: "2px",
                              padding: "2px",
                            }}
                          >
                            {movie.adult ? (
                              <Typography>18+</Typography>
                            ) : (
                              <Typography>11+</Typography>
                            )}
                          </Stack>
                        </Typography>

                        <Typography paragraph>{movie.overview}</Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={movie.vote_average}
                            max={10}
                            precision={0.1}
                            readOnly={false}
                            size={`small`}
                          />
                        </Stack>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          ({movie.vote_count} reviews)
                        </Typography>
                        <Divider sx={{ borderStyle: "dashed", marginY: 2 }} />
                        <Box sx={{ display: "flex", margin: "5px" }}>
                          {movie.genres.map((e) => (
                            <DividerStack key={e.id} name={e.name} />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!movie && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default MovieDetails;
