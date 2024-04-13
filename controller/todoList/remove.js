const { getUserByEmail, deleteTodo} = require("../../Db/db");

async function remove(req, res) {
  const email = req.userVerified.data;
  const {id} = req.body;
  try {
    const userExist = await getUserByEmail(email);

    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    //deleting the todos array from userExist object
    await deleteTodo(id)

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}
  module.exports = remove