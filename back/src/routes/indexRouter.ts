import { Router } from "express";
import userRouter from "./usersRouter";
import appointmentRouter from "./appointmentRouter";


const indexRouter: Router = Router()

indexRouter.use("/users", userRouter)
indexRouter.use("/appointment", appointmentRouter)

export default indexRouter;