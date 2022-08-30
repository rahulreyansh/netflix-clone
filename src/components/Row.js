import React, { useEffect, useState } from "react";
import classes from "./Row.module.css";
import axios from "../dataModel/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  console.log(props);
  const [movies, setMovies] = useState([]);
 const [trailerUrl,setTrailerUrl] =useState();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(props.fetchUrl);
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [props.fetchUrl]);

  const opts={
    height:'390',
    width:'100%',
    playerVars:{
      autoplay:1
    }
  }

  const handleClick=(movie)=>{
    if(trailerUrl){
      setTrailerUrl('')
    }else{
      movieTrailer(movie?.name || "").then(url=>{
          const urlParams = new URLSearchParams (new URL(url).search);
          setTrailerUrl(urlParams.get("v"))
      }).catch(error=>console.log(error))
    }
  }

  console.table(movies); 
  return (
    <div className={classes.row}>
      <h2>{props.title}</h2>
      <div className={classes.row__posters}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={()=>handleClick(movie)}
            className={`${classes.row__poster} ${
              props.isLargeRow && classes.row__posterLarge
            }`}
            src={`${base_url}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>
     {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  );
}

export default Row;
