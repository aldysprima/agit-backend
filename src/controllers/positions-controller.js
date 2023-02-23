const database = require("../config").promise();

// Get All Joblist
module.exports.getPositions = async (req, res) => {
  // Capture Query Params
  const isFullTime = req.query.full_time || false;
  const description = req.query.description || "";
  const location = req.query.location || "";
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  let type;
  if (isFullTime === "true") {
    type = "Full Time";
  }
  try {
    if (type === "Full Time") {
      const GET_POSITIONS = `select * from positions where location LIKE '%${location}%' and description LIKE '%${description}%' and type LIKE '%${type}%' `;
      const [POSITIONS] = await database.execute(GET_POSITIONS);
      return res.status(200).send(POSITIONS);
    }
    const GET_POSITIONS = `select * from positions where location LIKE '%${location}%' and description LIKE '%${description}%' LIMIT ${offset}, ${limit} ;`;
    const [POSITIONS] = await database.execute(GET_POSITIONS);
    //Send Response
    return res.status(200).send(POSITIONS);
  } catch (error) {
    return res.status(500).send("Invalid Token");
  }
};

// Get Job By id
module.exports.getPositionById = async (req, res) => {
  //capture job id
  const id = req.params.id;
  try {
    // GET Job By Id
    const GET_POSITION_BY_ID = `select * from positions where id = ?`;
    const [POSITION] = await database.execute(GET_POSITION_BY_ID, [id]);
    return res.status(200).send(POSITION);
  } catch (error) {
    return res.status(500).send("Invalid Token");
  }
};
