import axios from "axios";

const Login = () => {
  const loginHandler = async () => {
    const loginData = {
      email: "dyno@gmail.com",
      password: "123456",
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        { timeout: 10000 }
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured!");
      }
    }
  };

  return (
    <>
      Login:
      <br />
      <br />
      <form onSubmit={loginHandler}>
        Email:
        <br />
        <input type=" text" />
        <br />
        <br />
        Password:
        <br />
        <input type="text" />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default Login;
