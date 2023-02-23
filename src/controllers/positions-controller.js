const database = require("../config").promise();

// Get All Joblist
module.exports.getPositions = async (req, res) => {
  try {
    //Execute Query in DB
    const GET_POSITIONS = `select * from positions`;
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
