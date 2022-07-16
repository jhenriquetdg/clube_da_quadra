// import UserModel from "../model/UserModel.js";
import UserModel from "../model/UserModel.js";

// Create a new User
export async function createUser(req, res) {
  const newUser = await UserModel.insertPessoa(req.body);
  res.json({
    statusCode: 200,
    user: newUser,
  });
}

// Return all Users on Database
export async function getAllUsers(req, res) {
  const users = await UserModel.selectPessoas();
  return res.json({
    statusCode: 200,
    users: users,
  });
}

// Return an especific User
export async function getUser(req, res) {
  const user = await UserModel.selectPessoa(req.body.CPF);
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
export async function updateUser(req, res) {
  await UserModel.updatePessoa(req.body);
}

// Delete an especific User
export async function deleteUser(req, res) {
  await UserModel.deletePessoa(req.body.CPF);
}
