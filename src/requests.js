const API_KEY = process.env.REACT_APP_API_KEY;

const requests = (movie = null) => {
  let movieId;
  if (movie) {
    movieId = movie.movieId;
  }
  return {
    base_url: "https://image.tmdb.org/t/p/original/",

    genresList: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,

    fetchMovieByGenres: `/discover/movie?api_key=${API_KEY}&with_genres=${movieId}`,
    fetchMovieDetail: `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixPopular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchYoutubeVideo: `movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
  };
};

export default requests;
