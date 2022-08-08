require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");

const connection = require("./database/MongoDB");
const post = require("./routes/posts.routes");
const profile = require("./routes/profile.routes");
const contact = require("./routes/contact.routes");
const subscription = require("./routes/subscription.routes");
const user = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
connection();

//application routes
app.use("/api/posts", post);
app.use("/api/profile", profile);
app.use("/api/contact", contact);
app.use("/api/subscription", subscription);
app.use("/api/user", user);

// --------------------------deployment------------------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// --------------------------deployment------------------------------

//Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
