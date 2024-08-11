import e from "express"
import userController from "../../../controllers/user/userController.js"
import Delete from "../../../use-cases/users/delete.js"
import FindUserByID from "../../../use-cases/users/findUserById.js"
import LoginUser from "../../../use-cases/users/login.js"
import RegisterUser from "../../../use-cases/users/register.js"
import UpdateUser from "../../../use-cases/users/update.js"
import UserRepository from "../../../repositories/users/userRepo.js"

const userRouter = e.Router()

const userRepo = new UserRepository()
const deleteUser = new Delete(userRepo)
const findUserByID = new FindUserByID(userRepo)
const loginUser = new LoginUser(userRepo)
const registerUser = new RegisterUser(userRepo)
const updateUser = new UpdateUser(userRepo)

const usersController = new userController({
    deleteUser, findUserByID, loginUser, registerUser, updateUser
})

userRouter.get("/:id", (req, res)=>usersController.findUser(req, res))
userRouter.delete("/delete/:id", (req, res)=>usersController.delete(req, res))
userRouter.post("/sign-in", (req, res)=>usersController.signIn(req, res))
userRouter.post("/sign-up", (req, res)=>usersController.signUp(req, res))
userRouter.put("/update/:id", (req, res)=>usersController.update(req, res))


export default userRouter