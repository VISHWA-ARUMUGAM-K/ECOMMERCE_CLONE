import React, { useState } from "react";
import "../login page/Login.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signin() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem("ecomm_token", user.accessToken);
      localStorage.setItem("ecomm_user", JSON.stringify(user));
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="login__logo">
          <SearchIcon className="login__logoImage" fontSize="large" />
          <h2 className="login__logoTitle">eSHOP</h2>
        </div>
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login__signInButton"
            onClick={handleSignin}
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the eShop Website Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="login__registerButton">Login your account</button>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
