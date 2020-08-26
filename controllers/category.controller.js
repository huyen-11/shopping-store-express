let Product = require("../models/model.product");

module.exports.newView = async (req, res) => {
  let products = await Product.find().sort({date: -1});
  res.render("products/index", {
    products: products,
  });
};

module.exports.bagView = async (req, res) => {
  let products = await Product.find({category: "Bags"});
  res.render("products/index", {
    products: products,
  });
};

module.exports.topView = async (req, res) => {
  let products = await Product.find({category: "Tops"});
  res.render("products/index", {
    products: products,
  });
};

module.exports.bottomView = async (req, res) => {
  let products = await Product.find({category: "Bottoms"});
  res.render("products/index", {
    products: products,
  });
};

module.exports.saleView = async (req, res) => {
  let products = await Product.find({sale: true});
  res.render("products/index", {
    products: products,
  });
};

