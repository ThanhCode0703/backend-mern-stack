const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const PaymentRouter = require("./PaymentRouter");
const OrderRouter = require("./OrderRouter");
const routes = (app) => {
  app.use("/api/payment", PaymentRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/Order", OrderRouter);
};

module.exports = routes;
