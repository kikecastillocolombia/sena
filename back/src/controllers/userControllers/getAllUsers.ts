import { Request, Response } from "express"
import { getAllUsersService } from "../../services/userService";

import { User } from "../../entities/User";


// GET /users => Obtener listado de todos los usuarios
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await getAllUsersService();
        res.status(200).json(users) 
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}