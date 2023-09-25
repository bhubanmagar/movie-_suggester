import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Addmovie = () => {
  const history = useHistory();
  const Movie_name_ref = useRef();
  const rating_ref = useRef();
  const description_ref = useRef();

  const addMoviedata = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: Movie_name_ref.current.value,
      rating: rating_ref.current.value,
      description: description_ref.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        { timeout: 10000 }
      );
      console.log(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured ?try again...");
      }
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <br />
      <form onSubmit={addMoviedata}>
        Movie name:
        <br />
        <input type="text" placeholder="Movie_name" ref={Movie_name_ref} />
        <br />
        <br />
        Rating:
        <br />
        <input type="text" placeholder="rating" ref={rating_ref} />
        <br />
        <br />
        Description:
        <br />
        <textarea placeholder="description" ref={description_ref}></textarea>
        <br />
        <br />
        <button type="submit">add movie..</button>
      </form>
    </>
  );
};
export default Addmovie;
