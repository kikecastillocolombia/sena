import { appointmentRepository, userRepository } from '../config/data-source';
import { Appointment, AppointmentStatus } from '../entities/Appointment';


export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    return appointmentRepository.find();
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const appointment = await appointmentRepository.findOneBy({ id });
    if (!appointment) {
        throw new Error(`Turno con id: ${id} no encontrado`);
    }

    return appointment;
};

export const createAppointmentService = async (date: string, time: string, userId: number, description: string = ''): Promise<Appointment> => {
    
    // Verifica si el usuario existe
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new Error(`Usuario con id: ${userId} no encontrado`);
    }

    //nuevo turno
    const newAppointment: Appointment = appointmentRepository.create({
        date,
        time,
        description
    });
    //usuario asociado
    newAppointment.user = user;

    // Guarda el turno en la base de datos
    await appointmentRepository.save(newAppointment);
    
    return newAppointment;
};

export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointment = await appointmentRepository.findOne({
        where: { id }
    });

    if (!appointment) {
        throw new Error(`Turno con id: ${id} no encontrado`);
    }

    appointment.status = AppointmentStatus.CANCELLED;
    await appointmentRepository.save(appointment);

    return appointment;
};