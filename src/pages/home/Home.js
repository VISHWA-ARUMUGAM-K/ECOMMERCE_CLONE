import React, { useContext } from "react";
import "./Home.css";
import ecommImage from "../../Assets/ecomm.jpg";
import Product from "../../components/home/product/Product";
import "../../components/home/product/product.css";
import DataContext from "../../StateProvider";
// import DataContext from "./data/dataContext";

const Home = () => {
  const { data } = useContext(DataContext);

  return (
    <main className="homeContainer kanit-regular">
      <img src={ecommImage} alt="" className="ecommImage" />
      <div className="productContainer">
        {data.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            className={item.className}
            title={item.title}
            price={item.price}
            rating={item.rating}
            img={item.img}
          ></Product>
        ))}
      </div>
    </main>
  );
};

export default Home;
