import React, { useState } from "react";
import "./Login.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken, username }));
      navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };
  if (isLoading) return <h1>Loading ....</h1>;
  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="login__logo">
          <SearchIcon className="login__logoImage" fontSize="large" />
          <h2 className="login__logoTitle">eSHOP</h2>
        </div>
      </Link>

      <div className="login__container">
        <h1>Log-in</h1>

        <form>
          <h5>Username</h5>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="login__signInButton" onClick={handleLogin}>
            Log In
          </button>
        </form>

        <p>By signing-in you agree to the eShop Website Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
        <Link to="/signin" style={{ textDecoration: "none" }}>
          <button className="login__registerButton">Create your shopify account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
