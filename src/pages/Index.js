import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Index = () => {
  let [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  //yeha chai suru mai useeffect bata movie ko api call gareko
  useEffect(() => {
    GetMovie();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          GetMovie();
        } else if (searchMovieText.length < 1) {
          GetMovie();
        } else {
          setSearchErrorText("please enter at least 3 character..");
        }
      }, 1000);
      //clean up function
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovieText]);

  const GetMovie = async () => {
    console.log("API calling...");
    setLoading(true);
    setSearchErrorText(""); //yo suru ma khali rakheko natra error msg display bhai rakxa
    try {
      const respone = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(respone.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Cannot get movie info!");
      setLoading(false);
      setFirstRun(false);
    }
  };

  return (
    <div className="App">
      <Link to="/add">Add movie:</Link> |<Link to="/login">Login</Link>
      <br />
      <br />
      <div>
        <input
          type="search"
          value={searchMovieText}
          placeholder="enter the movie tittle"
          onChange={(e) => setSearchMovieText(e.target.value)}
        />
        <br />
        <strong>sugested movie:</strong>
        <br />
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
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
            <div>{loading ? <>Loading..!</> : <></>}</div>
            {!loading && movies.length < 1 ? (
              <>No movies found!</>
            ) : (
              <>
                {movies.map((el) => (
                  <div key={el.id}>
                    <Link to={`/view_movie/${el.id}`}>
                      <strong style={{ fontWeight: "bold" }}>{el.name}</strong>
                    </Link>
                    <br />
                    <img
                      src={el.image}
                      alt="movie"
                      style={{ height: "100px" }}
                    />
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
              </>
            )}
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default Index;
