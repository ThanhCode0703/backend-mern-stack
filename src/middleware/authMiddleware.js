const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
    if (err) {
      return res.status(200).json({
        message: err,
        status: "ERR",
      });
    }

    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Xác thực thất bại",
        status: "ERR",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }

    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERR",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleWare,
};
