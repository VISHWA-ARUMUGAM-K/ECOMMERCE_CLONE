import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  //change to state if any breaking bugs
  const data = [
    {
      id: 1,
      className: "product one",
      title:
        "Bennett Mystic 15.6 inch Laptop Shoulder Messenger Sling Office Bag, Water Repellent Fabric for Men and Women (Blue)",
      price: 400,
      rating: 4,
      img: "https://images-na.ssl-images-amazon.com/images/I/71mEsHyzSCL._SL1000_.jpg",
    },
    {
      id: 2,
      className: "product two",
      title:
        "Intel Core i9-12900K Gaming Desktop Processor with Integrated Graphics and 16 (8P+8E) Cores up to 5.2 GHz Unlocked LGA1700 600 Series Chipset 125W",

      price: 60000,
      rating: 3,
      img: "https://m.media-amazon.com/images/I/51klBAsxGHL._AC_SX466_.jpg",
    },
    {
      id: 3,
      className: "product three",
      title:
        "LG 2023 Gram 17 Ultra Lightweight Business Laptop,13th Intel Evo Platform 12-Core i7-1360P,17.3'' IPS WQXGA (2560x1600) 16:10 Display,80Wh Battery,Backlit KB,WiFi 6E,Win11 PRO(16GB|512GB SSD) Black",
      price: 100000,
      rating: 4,
      img: "https://m.media-amazon.com/images/I/61t31ugnoLL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    },
    {
      id: 4,
      className: "product four",
      title: "Nintendo Switch™ with Neon Blue and Neon Red Joy‑Con™",
      price: 20000,
      rating: 4,
      img: "https://m.media-amazon.com/images/I/71wpE+ZIehL._SX522_.jpg",
    },
    {
      id: 5,
      className: "product five",
      title:
        "Bruno Marc Men's Mesh Oxfords Sneakers Casual Dress Lace-Up Lightweight Walking Shoes 2.0",
      price: 5000,
      rating: 4,
      img: "https://m.media-amazon.com/images/I/71cpmuMfkYL._AC_SY695_.jpg",
    },
    {
      id: 6,
      className: "product six",
      title:
        "12U Open Frame Server Rack, 23''-40'' Adjustable Depth, Free Standing or Wall Mount Network Server Rack, 4 Post AV Rack with Casters, Holds All Your Networking IT Equipment AV Gear Router Modem",

      price: 10000,
      rating: 1,
      img: "https://m.media-amazon.com/images/I/71ddZ3-qkWL._AC_SX466_.jpg",
    },
  ];
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutItemNum, setCheckoutItemNum] = useState(0);
  const [total, setTotal] = useState(0);

  console.log(checkoutItems);
  useEffect(() => {
    setCheckoutItemNum(checkoutItems.length);
    const total = checkoutItems.reduce((total, obj) => {
      return total + obj.price;
    }, 0);
    setTotal(total);
  }, [checkoutItems]);
  return (
    <DataContext.Provider
      value={{
        data,
        checkoutItemNum,
        setCheckoutItemNum,
        checkoutItems,
        setCheckoutItems,
        total,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
