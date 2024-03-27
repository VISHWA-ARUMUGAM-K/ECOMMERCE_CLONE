import { SiShopify } from "react-icons/si";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { useContext } from "react";
import DataContext from "../../../StateProvider";
// import DataContext from "./data/dataContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/Firebase";
const Header = () => {
  const { checkoutItemNum } = useContext(DataContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history("/login");
  };

  return (
    <header className="header kanit-regular flex">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logoSection">
          <SiShopify size={32} className="shopifyIcon" color="white" />

          <p>Shopify</p>
        </div>
      </Link>

      <div className="inputContainer">
        <input type="text" className="input" placeholder="Search" />
        <div className="searchIconContainer">
          <SearchIcon className="searchIcon" style={{ fontSize: "15px" }} />
        </div>
      </div>
      <div className="signUpProfileSection">
        <div className="navItem">
          <span className="NavItemFirstLine">
            Hello {user ? user.email.split("@")[0] : "guest"}
          </span>
          {!user ? (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <span className="NavItemSecondLine">Sign In</span>
            </Link>
          ) : (
            <span
              className="NavItemSecondLine"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Sign Out
            </span>
          )}
        </div>

        <div className="navItem">
          <span className="NavItemFirstLine">Your</span>
          <span className="NavItemSecondLine">Shop</span>
        </div>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="navItem">
            <ShoppingBasketIcon />

            <span className="NavItemSecondLine">{checkoutItemNum}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
