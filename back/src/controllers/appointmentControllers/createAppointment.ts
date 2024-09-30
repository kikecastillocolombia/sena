import { Request, Response } from 'express';
import {createAppointmentService} from '../../services/appointmentService';

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date, time, userId } = req.body;
        const newAppointment = await createAppointmentService(date, time, Number(userId));
        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};