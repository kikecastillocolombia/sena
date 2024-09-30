import { Request, Response, NextFunction } from "express";
import IAppointmentDto from "../dtos/IAppointmentDto";

const appointmentValidate = (req: Request<{}, {}, IAppointmentDto>, res: Response, next: NextFunction) => {
    const { date, time } = req.body;
    try {
        // Validación de la fecha
        if (!date) throw new Error("Introduce la fecha por favor");

        // Obtener la fecha actual en formato YYYY-MM-DD
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        
        const in14Days = new Date(today);
        in14Days.setDate(today.getDate() + 14);
        const in14DaysString = in14Days.toISOString().split('T')[0];


        // Validar si la fecha está entre mañana y dentro de 14 días
        if (date < tomorrowString || date > in14DaysString) {
            throw new Error("La fecha debe estar entre mañana y dentro de 14 días");
        }

        // Validar si la fecha cae en fin de semana (sábado o domingo)
        const appointmentDate = new Date(date);
        const dayOfWeek = appointmentDate.getUTCDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("No se permiten citas en fines de semana");
        }

        // Validación de la hora
        if (!time) throw new Error("Ingresa la hora de tu turno");

        const validTimes = [
            "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
            "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
            "17:00", "17:30", "18:00"
        ];

        if (!validTimes.includes(time)) {
            throw new Error("El horario de turnos es de 9:00 a.m a 6:00 p.m");
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default appointmentValidate;
