const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const sequelize = require("./utils/db");
const bodyParser = require("body-parser");
// const { notFound, errHandler } = require("./middlewares/errorMiddleware");
const { notFound, errHandler } = require("./middlewares/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/users/signUp", authRoute);

app.use(notFound);
app.use(errHandler);

sequelize
  .sync({ force: false })
  .then((result) => {
    console.log(`Connected to DB 💿`);
    app.listen(PORT, () => {
      console.log(`🚀Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
