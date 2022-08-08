const Profile = require("../models/profile.model");

//post a profile
exports.postProfile = async (req, res) => {
  try {
    console.log(req.body);
    const profile = await new Profile(req.body).save();
    res.status(200).json({
      Message: "profile was inserted successfully!",
      profile: profile,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

//get profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.find();
    res.status(200).json({
      Message: "profile was fetched successfully!",
      profile: profile,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

//update a profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    const profiles = await Profile.find();
    res.status(200).json({
      Message: "Todos was updated successfully!",
      profiles: profiles,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};
