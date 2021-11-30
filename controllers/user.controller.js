var User = require("../models/model.user");

module.exports.profile = async (req, res) => {
  try {
    res.render("user/profile");
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.postProfile = async (req, res) => {
  if (req.file) {
    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: "huyendxnkgd",
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `kattie/avatar/${uniqueFilename}` },
      async function (err, result) {
        if (err) return res.send(err);
        // console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        req.body.avatar = result.url;
        try {
          let user = await User.updateOne({ _id: req.params.id }, req.body);
        } catch (error) {
          res.render("error");
        }
        res.redirect("/user/profile");
      }
    );
  } else {
    try {
      let user = await User.updateOne(
        { _id: req.params.id },
        req.body,
        (err, result) => console.log("updated else")
      );
      res.redirect("/user/profile");
    } catch (error) {
      res.sendStatus(404);
    }
  }
};

module.exports.myCart = async (req, res) => {
  try {
    res.render("user/cart");
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.myOrder = async (req, res) => {
  try {
    res.render("user/order");
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.myError = async (req, res) => {
  try {
    res.render("error");
  } catch (error) {
    res.sendStatus(404);
  }
};
