let Product = require("../models/model.product");

module.exports.newView = async (req, res) => {
  try {
    let products = await Product.find().sort({ date: -1 });
    res.render("products/newA", {
      products: products,
    });
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.bagView = async (req, res) => {
  try {
    let products = await Product.find({ category: "Bags" });
    res.render("products/bag", {
      products: products,
    });
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.topView = async (req, res) => {
  try {
    let products = await Product.find({ category: "Tops" });
    res.render("products/top", {
      products: products,
    });
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.bottomView = async (req, res) => {
  try {
    let products = await Product.find({ category: "Bottoms" });
    res.render("products/bottom", {
      products: products,
    });
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.saleView = async (req, res) => {
  try {
    let products = await Product.find({ sale: true });
    res.render("products/sale", {
      products: products,
    });
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.contactView = (req, res) => {
  res.render("aboutUs");
};

module.exports.errorView = (req, res) => {
  res.render("error");
};
