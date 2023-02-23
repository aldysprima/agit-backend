const routers = require("express").Router();

const { positions } = require("../controllers");

routers.get("/positions", positions.getPositions);
routers.get("/position/:id", positions.getPositionById);

module.exports = routers;
