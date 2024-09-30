import { Request, Response } from 'express';
import { cancelAppointmentService } from '../../services/appointmentService';

export const cancelAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const cancelledAppointment = await cancelAppointmentService(Number(id));
        res.status(200).json(cancelledAppointment);
    } catch (error:any) {
        res.status(404).json({ message: error.message });
    }
}