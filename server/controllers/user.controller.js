const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      console.log(user);
      res.status(200).json({
        message: "Email already exists!",
        users: false,
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      if (!req.body.username) {
        req.body.username = "User";
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword,
      });
      await user.save();
      const users = await User.find();
      const newuser = await User.find({ email: req.body.email });
      res.status(200).json({
        message: "Signup was successful!",
        newuser: newuser,
        users: users,
      });
    }
  } catch {
    res.status(500).json({
      message: "Signup failed!",
    });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.find({ email: req.email });
  if (user) {
    res.status(200).json({
      message: "user fetched succsessfully!",
      user: user,
    });
  } else {
    res.status(200).json({
      message: "fetched unsuccsessfull!",
      user: [],
    });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json({
      message: "user fetched succsessfully!",
      users: users,
    });
  } else {
    res.status(200).json({
      message: "fetched unsuccsessfull!",
      users: [],
    });
  }
};

exports.Authentication = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, result) {
          if (result) {
            //Generate token
            var token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY
            );
            async function setToken() {
              await User.findOneAndUpdate(
                { email: req.body.email },
                {
                  token: token,
                }
              );
            }
            setToken();
            res.status(200).json({
              message: "Login succsessfully!",
              access_token: token,
            });
          } else {
            res.status(202).json({
              message: "Incorrect password!",
              access_token: false,
            });
          }
        }
      );
    } else {
      res.status(202).json({
        message: "Email not found!",
        access_token: false,
      });
    }
  } catch {
    res.status(500).json({
      message: "Login failed!",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.password && !req.body.username) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.findOneAndUpdate(
        { email: req.email },
        { password: hashedPassword }
      );
      res.status(202).json({
        message: "Password changed successfully!",
        reset: true,
      });
    } else if (req.body.username) {
      await User.findOneAndUpdate({ email: req.email }, req.body);
      const user = await User.find({ email: req.email });
      res.status(202).json({
        message: "Username updated successfully!",
        user: user,
      });
    } else {
      res.status(202).json({
        message: "Email found successfully!",
        reset: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id }, req.body);
    const users = await User.find();
    res.status(200).json({
      Message: "User was deleted successfully!",
      users: users,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.resetUserPassword = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    await User.findOneAndUpdate(
      { email: req.email },
      { password: hashedPassword }
    );
    res.status(200).json({
      message: "Password has changed successfully!",
      match: true,
    });
  } catch {
    res.status(500).json({
      Message: "There was a server side error!",
    });
  }
};

exports.Logout = async (req, res) => {
  console.log("log " + req.email);
  try {
    const token = "";
    await User.findOneAndUpdate(
      { email: req.email },
      {
        token: token,
      }
    );
    return res.status(202).json({
      message: "Logout succsessfully!",
      token: token,
    });
  } catch (er) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};
