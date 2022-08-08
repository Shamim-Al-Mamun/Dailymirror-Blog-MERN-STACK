const Subscription = require("../models/subscription.model");

//post a email
exports.postSubscription = async (req, res) => {
  try {
    console.log(req.body);
    const subscription = await new Subscription(req.body).save();
    const subscribtions = await Subscription.find();
    res.status(200).json({
      Message: "email was inserted successfully!",
      subscribtion: subscription,
      subscribtions: subscribtions,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

//get all emails
exports.getSubscriptions = async (req, res) => {
  try {
    const subscription = await Subscription.find();
    res.status(200).json({
      Message: "emails were fetched successfully!",
      subscriptions: subscription,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};
