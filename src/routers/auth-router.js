const routers = require("express").Router();

const { userAuth } = require("../controllers");

routers.post("/auth/login", userAuth.loginUser);

module.exports = routers;
