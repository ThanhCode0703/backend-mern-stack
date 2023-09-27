const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes/index.js");
const bodyParser = require("body-parser");
const Cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json({ limit: "50mb", extended: true }));
app.use(Cors());

// app.use(cookieParser());

routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("connect Db success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
