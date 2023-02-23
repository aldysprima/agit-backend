const routers = require("express").Router();
const authMiddleware = require("../helpers/userAuthMiddleware");

const { positions } = require("../controllers");

routers.get("/positions", authMiddleware, positions.getPositions);
routers.get("/position/:id", authMiddleware, positions.getPositionById);

module.exports = routers;
