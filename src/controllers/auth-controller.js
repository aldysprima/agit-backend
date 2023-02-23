const database = require("../config").promise();
const jwt = require("jsonwebtoken");
const {
  userUsernameLoginSchema,
  userEmailLoginSchema,
} = require("../helpers/validation-schema");

//Login
module.exports.loginUser = async (req, res) => {
  const { user, password } = req.body;

  try {
    // 1. Validate Req Body
    if (user.includes("@")) {
      const { error } = userEmailLoginSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
    } else {
      const { error } = userUsernameLoginSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
    }
    // 2. Check if user is exist

    const CHECK_USER = `select * from users where username = ? or email = ?`;

    const [USER] = await database.execute(CHECK_USER, [user, user]);
    if (!USER.length) {
      return res.status(400).send("Username or Email Not Found");
    }
    // 3. if user exist, compare password
    // const valid = await bcrypt.compare(password, ADMIN[0].password);
    let valid = false;
    if (password === USER[0].password) {
      valid = true;
    }

    if (!valid) {
      return res.status(400).send("Wrong Password!");
    }

    // 4. create login token
    const token = jwt.sign(
      {
        user_id: USER[0].id,
        username: USER[0].username,
        email: USER[0].email,
      },
      process.env.JWT_PASS
    );
    delete USER[0].password;

    res.header("authorization", `Bearer ${token}`).status(200).send(USER[0]);
  } catch (error) {
    return res.status(500).send("Internal service Error");
  }
};
