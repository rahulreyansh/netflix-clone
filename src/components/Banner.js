import React, { useEffect, useState } from "react";
import classes from "./Banner.module.css";
import axios from "../dataModel/axios";
import requests from "../dataModel/request";

function Banner() {
  const [movie, setMovie] = useState();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  function truncate(str,n) {
    return str?.length > n ? str.substr(0,n-1)+"...":str;
  }
  return (
    <header
      className={classes.banner}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className={classes.banner__contents}>
        <h1 className={classes.banner__title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={classes.banner__buttons}>
          <button className={classes.banner__button}>Play</button>
          <button className={classes.banner__button}>My List</button>
        </div>
        <h1 className={classes.banner__description}>
          {truncate(movie?.overview,150)}
        </h1>
      </div>
      <div className={classes.banner__fadeButton}/>
    </header>
  );
}

export default Banner;