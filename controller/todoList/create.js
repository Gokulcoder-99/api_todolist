const { getUserByEmail, createTodo } = require("../../Db/db");

async function create(req, res) {
  const email = req.userVerified.data;
  const taskObj = req.body;
  try {
    const userExist = await getUserByEmail(email);

    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const newTodo = await createTodo(userExist.id, taskObj.task);

    res.status(200).json({
      status: "success",
      message: "Task added successfully",
      obj: newTodo,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

module.exports = create;
