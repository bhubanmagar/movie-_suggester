import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewPages = () => {
  const getparams = useParams();

  const getid = getparams.id;

  useEffect(() => {
    viewmovie();
  }, []);

  const [movieData, setMovieData] = useState({});

  const viewmovie = async () => {
    try {
      const getData = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getid} `
      );
      setMovieData(getData.data.singleMovieData);
    } catch (error) {
      alert("cannot get data of movie");
    }
  };

  return (
    <>
      <h2>movie description:</h2>
      <strong>Name:</strong> {movieData.name}
      <br /> <br />
      <strong>Info :</strong>
      {movieData.info}
      <br /> <br />
      <strong>Description :</strong> {movieData.desc}
      <br /> <br />
      <img src={movieData.image} alt="movie" style={{ height: "200px" }} />
      <br /> <br />
      <strong>Rating : </strong>
      {movieData.rating}
    </>
  );
};
export default ViewPages;
