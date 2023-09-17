import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Index = () => {
  let [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const GetMovie = async () => {
    console.log("API calling...");

    try {
      const respone = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/movies"
      );
      setMovies(respone.data.moviesData);
      setIsError(false);
      console.log(respone);
    } catch (error) {
      setIsError(true);
      setErrorText("cannot get movie info!");
    }
  };

  return (
    <div className="App">
      <button onClick={GetMovie} style={{ background: "#e7e7e7" }}>
        get movies
      </button>
      <br />
      <br />
      {isError ? (
        <>
          <div style={{ background: "red", padding: "10px", margin: "20px" }}>
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
          >
            {movies.map((el) => (
              <div key={el.id}>
                <Link to={`/view_movie/${el.id}`}>
                  <strong style={{ fontWeight: "bold" }}>{el.name}</strong>
                </Link>
                <br />
                <img src={el.image} alt="movie" style={{ height: "100px" }} />
                <br />
                <br />
                <div>
                  <strong>Info:</strong> {el.info}
                </div>
                <br />
                <div>
                  <strong>Rating:</strong> {el.rating}
                </div>
                <br />
                <br />
              </div>
            ))}
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default Index;
