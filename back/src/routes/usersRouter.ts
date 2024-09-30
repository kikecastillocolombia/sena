import { Router } from "express";
import { getAllUsers } from "../controllers/userControllers/getAllUsers";
import { getUsersById } from "../controllers/userControllers/getUsersById";
import { register } from "../controllers/userControllers/register";
import { login } from "../controllers/userControllers/login";
import credentialValidateMiddleware from "../middlewares/credentialValidateMiddleware";
import userValidateMiddleware from "../middlewares/userValidateMiddleware";
const userRouter: Router = Router()

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUsersById)
userRouter.post("/register", userValidateMiddleware, register)
userRouter.post("/login", credentialValidateMiddleware, login)

export default userRouter