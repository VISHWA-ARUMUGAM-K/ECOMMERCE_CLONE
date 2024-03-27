import "./Checkout.css";
import CheckoutProduct from "../../components/checkout/checkout product/CheckoutProduct";
import Subtotal from "../../components/checkout/subtotal/Subtotal";
import { useContext } from "react";
import DataContext from "../../StateProvider";
// import DataContext from "./data/dataContext";

const Checkout = () => {
  const { checkoutItems, setCheckoutItems } = useContext(DataContext);

  const handleCheckoutItems = (id) => {
    const newCheckoutItems = checkoutItems.filter((item) => item.id !== id);
    console.log(newCheckoutItems);
    setCheckoutItems(newCheckoutItems);
  };
  return (
    <div className="checkoutContainer kanit-regular">
      <div className="leftContainer">
        <div className="adContainer">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt="advertisement"
          ></img>
        </div>
        <hr />
        <div className="basketContainer">
          <h1>Shopping Basket</h1>
          {checkoutItems.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              img={item.img}
              handleCheckoutItems={handleCheckoutItems}
            ></CheckoutProduct>
          ))}
        </div>
      </div>
      <div className="rightContainer">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
