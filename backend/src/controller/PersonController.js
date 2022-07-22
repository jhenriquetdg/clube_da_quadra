const PersonModel = require("../model/PersonModel.js");

// Create a new User
async function createUser(req, res) {
  console.log("New user");
  console.log(req.body);
  const newUser = await PersonModel.insertPessoa(req.body);
  res.json({
    statusCode: 200,
    user: newUser,
  });
}

// Return all Users on Database
async function getAllUsers(req, res) {
  const users = await PersonModel.selectPessoas();
  return res.json({
    statusCode: 200,
    users: users,
  });
}

// Return an especific User
async function getUser(req, res) {
  const user = await PersonModel.selectPessoa(req.body.CPF);
  if (user) {
    return res.json({
      statusCode: 200,
      user,
    });
  } else {
    return res.json({
      statusCode: 400,
      message: "User not found",
    });
  }
}

// Update an especific User
async function updateUser(req, res) {
  await PersonModel.updatePessoa(req.body);
}

// Delete an especific User
async function deleteUser(req, res) {
  console.log(req.body);
  await PersonModel.deletePessoa(req.body.CPF);
  return res.json({
    statusCode: 200,
    message: `CPF ${req.body.CPF} foi deletado com sucesso`,
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
