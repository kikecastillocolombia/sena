import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum AppointmentStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled'
}

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' }) // Cambiado a 'date' para manejar fechas correctamente
    date!: string;

    @Column({ length: 5 })
    time!: string;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE
    })
    status!: AppointmentStatus;

    @Column({ length: 255 }) // Aumentar el tamaño para descripciones
    description!: string;

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({ name: "user_id" })
    user!: User;
}
