const { createUser, getUserByEmail } = require("../../Db/db");
const { createToken } = require("../../utility/jwt");
const { encryptPw } = require("../../utility/crypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await getUserByEmail(email);
    console.log(userExist);

    if (userExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const hashPw = await encryptPw(password);

    const newUser = await createUser(name, email, hashPw);

    const token = createToken(email);

    res.cookie("Token", token);

    res.status(200).json({
      message: "User successfully created",
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = signup;
