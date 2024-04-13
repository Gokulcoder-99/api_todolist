const { getUserByEmail, updateTodo, getTodosByUserId } = require('../../Db/db')

async function update (req, res) {
  const email = req.userVerified.data
  const { id, task, completed } = req.body
  try {
    const userExist = await getUserByEmail(email)
    if (!userExist) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    const todoArr1 = await getTodosByUserId(userExist.id)
    const upObj = todoArr1.find((item) => {
      if (item.id === id) {
        item.task = task || item.task
        item.completed = completed !== undefined ? completed : item.completed
        return item
      }
      return null
    })

    // updating the todos array from userExist object
    const updatedTodo = await updateTodo(id, upObj.task, upObj.completed)

    // updated value of arr

    const unSortedtodoArr = await getTodosByUserId(userExist.id)
    const todoArr = unSortedtodoArr.sort((a, b) => a.id - b.id)

    res.status(200).json({
      status: 'success',
      message: 'Task updated successfully',
      updatedTodo,
      todoArr
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    })
  }
}
module.exports = update
