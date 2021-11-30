var User = require("../models/model.user");

module.exports.requireAuth = async (req, res, next) => {
  try {
    var user = await User.findOne({
      _id: req.signedCookies.user_id,
    });
    if (!req.signedCookies.user_id) {
      // console.log(1);
      res.redirect("/sign/in");
      return;
    }
    if (!user) {
      // console.log(2);
      res.redirect("/sign/in");
      return;
    }
    res.locals.user = user;
    next();
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.checkUser = async (req, res, next) => {
  try {
    var user = await User.findOne({
      _id: req.signedCookies.user_id,
    });
    if (req.signedCookies.user_id && user) {
      res.locals.user = user;
    }
    next();
  } catch (error) {
    res.sendStatus(404);
  }
};
