const { getUserByEmail, updateTodo } = require("../../Db/db");

async function update(req, res) {
  const email = req.userVerified.data;
  const {id,task,completed} = req.body;
  try {
    const userExist = await getUserByEmail(email);
    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    //updating the todos array from userExist object
   const updatedTodo = await updateTodo(id,task,completed)

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}
  module.exports = update