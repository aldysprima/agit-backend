const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("authorization");

  try {
    // 1. Authenticate, harus udah login
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    // 2. verify token
    const { user_id } = jwt.verify(token, process.env.JWT_PASS);
    // 3. Modify object req
    req.user_id = user_id;
    next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
