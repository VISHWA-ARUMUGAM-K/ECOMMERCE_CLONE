import "./CheckoutProduct.css";

const CheckoutProduct = ({
  title,
  price,
  rating,
  img,
  id,
  handleCheckoutItems,
}) => {
  // const { setCheckoutItems } = useContext(DataContext);

  return (
    <div className="checkoutProductContainer">
      <div className="checkoutImage">
        <img src={img} alt="product"></img>
      </div>
      <div className="checkoutDetails">
        <p className="checkoutTitle">{title}</p>
        <p className="checkoutPrice">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <p className="checkoutRating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i} style={{ display: "inline" }}>
                ⭐
              </span>
            ))}
        </p>
        <button
          className="removeButton"
          onClick={() => handleCheckoutItems(id)}
        >
          Remove from basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
