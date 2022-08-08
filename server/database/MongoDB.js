const moongoose = require("mongoose");

//MongoBD connection
module.exports = async () => {
  try {
    moongoose.connect(process.env.MongoDB_Connection_String, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB is connected Successfully`);
  } catch (err) {
    console.log(err);
  }
};
