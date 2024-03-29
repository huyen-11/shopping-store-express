var User = require("../models/model.user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.signup = (req, res) => {
  res.render("sign/signup");
};

module.exports.postSignup = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    try {
      // Store hash in your password DB.
      req.body.password = hash;
      var user = await User.create(req.body);
      console.log(user);
      res.cookie("user_id", user._id, {
        signed: true,
      });
      res.redirect("/");
    } catch (error) {
      res.sendStatus(404);
    }
  });
};

module.exports.signin = (req, res) => {
  res.render("sign/signin");
};

module.exports.postSignin = (req, res) => {
  User.findOne({
    email: req.body.signinEmail,
  }).exec((err, user) => {
    if (!user) {
      res.render("sign/signin", {
        errors: "Either email or password is wrong",
      });
      return;
    } else {
      bcrypt.compare(
        req.body.signinPassword,
        user.password,
        function (err, result) {
          // result = false
          if (result === false) {
            console.log(user, 2);
            res.render("sign/signin", {
              errors: "Either email or password is wrong",
            });
          } else {
            console.log(user, 3);
            res.cookie("user_id", user._id, {
              signed: true,
            });
            res.redirect("/");
          }
        }
      );
    }
  });
};

module.exports.signout = (req, res) => {
  res.clearCookie("user_id", {
    signed: true,
  });
  res.redirect("/");
};

module.exports.errorSign = (req, res) => {
  res.render("error");
};
