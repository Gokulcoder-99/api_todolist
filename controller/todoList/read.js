const { getUserByEmail, getTodosByUserId } = require('../../Db/db')

async function read (req, res) {
  const email = req.userVerified.data
  try {
    const userExist = await getUserByEmail(email)

    if (!userExist) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    // Accessing the todos array from userExist object
    const unSortedtodoArr = await getTodosByUserId(userExist.id)
    const todoArr = unSortedtodoArr.sort((a, b) => a.id - b.id)

    res.status(200).json({
      status: 'success',
      message: 'successfull',
      todoArr
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    })
  }
}
module.exports = read
