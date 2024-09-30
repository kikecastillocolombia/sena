import { Request, Response } from "express";

import ICreateUserDto from "../../dtos/ICreateUserDto";
import { createUserService } from "../../services/userService";
import { User } from "../../entities/User";

export const register = async (req: Request<{}, {}, ICreateUserDto>, res: Response) => {
    const { name, email, birthdate, nDni, username, password } = req.body;

    try {
        const newUser: User = await createUserService({
            name, email, birthdate, nDni, username, password
        });

        res.status(201).json(newUser);
    } catch (error: any) {
      
        res.status(400).json({ error: error.message });
    }
}

