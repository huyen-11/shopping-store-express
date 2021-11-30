var Product = require("../../models/model.product");

module.exports.postFilterRefinement = async (req, res) => {
  try {
    var products = await Product.find(req.body);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports.postSortedRefinement = async (req, res) => {
  try {
    var products = await Product.find(req.body).sort({ date: -1 });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports.postSearchRefinement = async (req, res) => {
  try {
    let matchedList = await Product.find(req.body, {
      score: { $meta: "textScore" },
    }).sort({ score: { $meta: "textScore" } });
    res.json(matchedList);
  } catch (error) {
    console.log(error);
  }
};
