const Product = require("../model/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) {
    return res.status(404).json({ message: "no data found" });
  }
  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  if (!req?.body?.className || !req?.body?.title || !req?.body?.price || !req?.body?.rating || !req?.body?.img) {
    return res.status(400).json({ message: "product data missing" });
  }
  try {
    const result = await Product.create({
      className: req.body.className,
      title: req.body.title,
      price: req.body.price,
      rating: req.body.rating,
      img: req.body.img,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("this is the error", error);
  }
};

module.exports = { getProducts, createProduct };
