import Checkout from "./pages/checkout/Checkout";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Login from "./pages/login page/Login";
import Signin from "./pages/signin page/Signin";

function App() {
  return (
    <Routes>
      <Route path="login">
        <Route index element={<Login />}></Route>
      </Route>
      <Route path="signin">
        <Route index element={<Signin />}></Route>
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="checkout">
          <Route index element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
