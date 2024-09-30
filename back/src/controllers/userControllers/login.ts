// src/controllers/login.ts

import { Request, Response } from "express";
import { validateCredential } from "../../services/credentialService";
import { findUserByCredentialId } from "../../services/userService";

export const login = async (req: Request<{}, {}, { username: string, password: string }>, res: Response) => {
    const { username, password } = req.body;

    try {
        // Valida las credenciales
        const credential = await validateCredential(username, password);

        // Encuentra el usuario asociado a la credencial
        const user = await findUserByCredentialId(credential.id);

        // Devuelve la respuesta
        res.status(200).json({
            logged: true,
            user: {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                birthdate: user?.birthdate,
                nDni: user?.nDni
            }
        });
    } catch (error: any) {
        // Manejo de errores
        res.status(400).json({ message: error.message });
    }
};
