import { Request, Response } from 'express';
import { getAppointmentByIdService } from '../../services/appointmentService';

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const appointment = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};