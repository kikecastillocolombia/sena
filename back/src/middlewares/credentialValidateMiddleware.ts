import { Request, Response, NextFunction } from "express";

const credentialValidateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        // Validación de username
        if (!username) {
            throw new Error("El campo username es requerido");
        }
        if (username.length < 2) {
            throw new Error("El campo username debe tener al menos 2 caracteres");
        }
        if (username.length > 25) {
            throw new Error("El campo username debe tener como máximo 25 caracteres");
        }

        // Validación de password
        if (!password) {
            throw new Error("El campo password es requerido");
        }
        if (password.length < 4) {
            throw new Error("El campo password debe tener al menos 4 caracteres");
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }

    next();
}

export default credentialValidateMiddleware;
