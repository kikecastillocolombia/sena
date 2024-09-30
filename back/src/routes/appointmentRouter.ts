import { Router } from "express";

import { getAllAppointments } from "../controllers/appointmentControllers/getAllApointments";
import { getAppointmentById } from "../controllers/appointmentControllers/getAppointmentById";
import { createAppointment } from "../controllers/appointmentControllers/createAppointment";
import { cancelAppointment } from "../controllers/appointmentControllers/cancelAppointment";
import appointmentValidate from "../middlewares/appointmentValidateMiddleware";

const appointmentRouter: Router = Router()

appointmentRouter.get("/", getAllAppointments)
appointmentRouter.get("/:id", getAppointmentById)
appointmentRouter.post("/schedule", appointmentValidate, createAppointment)
appointmentRouter.put("/cancel/:id", cancelAppointment)

export default appointmentRouter




