import { Request, Response } from 'express';
import {getAllAppointmentsService} from '../../services/appointmentService';

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await getAllAppointmentsService();
        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};