import { Request,Response } from "express";
// GET /users/:id => Obtener detalle de usuario por id 
import { getAllUsersByIdService } from "../../services/userService";
import { User } from "../../entities/User";


export const getUsersById =async  (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params;
    try {
        const user: User | null = await getAllUsersByIdService(Number(id));
        if (!user) {
            res.status(404).json({ message: `Usuario con id: ${id} no encontrado` });
            return;
        }
        res.status(200).json(user)
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}