const UserModel = require('../model/UserModel.js');

// Create a new User
async function createUser(req, res) {
    const newUser = await UserModel.insertPessoa(req.body);
    res.json({
        statusCode: 200,
        user: newUser
    });
}

// Return all Users on Database
async function getAllUsers(req, res) {
    const users = await UserModel.selectPessoas();
    return res.json({
        statusCode: 200,
        users: users
    });
}

// Return an especific User
async function getUser(req, res) {
    const user = await UserModel.selectPessoa(req.body.CPF);
    if(user){
        return res.json({
            statusCode: 200,
            user
        });
    } else {
        return res.json ({
            statusCode: 400,
            message: "User not found"
        })
    }
}

// Update an especific User
async function updateUser(req, res) {
   await UserModel.updatePessoa(req.body);
}

// Delete an especific User
async function deleteUser(req, res) {
    await UserModel.deletePessoa(req.body.CPF);
 }
module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}