import React, { useState } from "react";
import Row from "../Row";
import Banner from "../Banner";
import Navbar from "../Navbar";
import requests from "../../requests";

function HomeScreen() {
  const [genres, setGenres] = useState({});

  return (
    <div className="homeScreen">
      <Banner />
      <Navbar genres={genres} setGenres={setGenres} />
      {genres.hasOwnProperty("id") ? (
        <Row
          title={genres.name}
          fetchUrl={requests({ movieId: genres.id }).fetchMovieByGenres}
          isLargeRow
        />
      ) : (
        <Row
          title="NETFLIX Popular"
          fetchUrl={requests().fetchNetflixPopular}
          isLargeRow
        />
      )}
      <Row title="Trending Now" fetchUrl={requests().fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests().fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests().fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests().fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests().fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests().fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests().fetchDocumentaries} />
    </div>
  );
}

export default HomeScreen;
