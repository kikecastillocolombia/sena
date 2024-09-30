import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Credential } from "./Credentials"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column({ length: 100 })
    name!: string

    @Column({ length: 100 })
    email!: string

    @Column({ type: "date" })
    birthdate!: Date 

    @Column({ length: 100 })
    nDni!: string
    
    @OneToOne(() => Credential)
    @JoinColumn()
    credential!: Credential
    
    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments!: Appointment[]
    }