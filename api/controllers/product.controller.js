var Product = require("../../models/model.product");

module.exports.productIndex = (req, res) => {
  res.render("dist/index");
};

module.exports.productDatabase = async (req, res) => {
  try {
    var products = await Product.find();
    res.json(products);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.productCreate = async (req, res) => {
  try {
    var product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.productFind = async (req, res) => {
  try {
    var product = await Product.find(req.body);
    res.json(product);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.productViewSingle = async (req, res) => {
  try {
    var product = await Product.findOne({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.productUpdate = async (req, res) => {
  try {
    var product = await Product.update(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(product);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.productDelete = async (req, res) => {
  try {
    var product = await Product.findByIdAndRemove(
      req.params.id,
      (err, result) => {
        if (err) {
          res.send("remove not successfully");
        }
        res.send("remove successfully");
      }
    );
  } catch (error) {
    res.sendStatus(404);
  }
};
