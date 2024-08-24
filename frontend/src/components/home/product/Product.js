import DataContext from "../../../data/dataContext";
import { useContext } from "react";

const Product = ({ className, title, price, rating, img, id }) => {
  const { checkoutItems, setCheckoutItems } = useContext(DataContext);

  const handleCheckoutItems = () => {
    setCheckoutItems([...checkoutItems, { title: title, price: price, rating: rating, img: img, id: id }]);
  };
  return (
    <div className={className}>
      <p className="productTitle">{title.length > 40 ? `${title.slice(0, 70)}. . .` : title}</p>
      <p className="productPrice">{`${price} Rs`}</p>
      <p className="productRating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <span key={i} style={{ display: "inline" }}>
              ⭐
            </span>
          ))}
      </p>
      <div className="imageAndButton">
        <img className="productImage" src={img} alt="productImage" />
        <button className="productButton" onClick={handleCheckoutItems}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
