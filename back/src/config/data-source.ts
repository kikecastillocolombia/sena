import { DataSource } from "typeorm"
import "dotenv/config"
import { User } from "../entities/User"
import { Credential } from "../entities/Credentials"
import { Appointment } from "../entities/Appointment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})

export const userRepository = AppDataSource.getRepository(User)
export const appointmentRepository = AppDataSource.getRepository(Appointment);
export const credentialRepository = AppDataSource.getRepository(Credential);
