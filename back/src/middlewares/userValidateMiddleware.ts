import { Request, Response, NextFunction } from "express";

const userValidateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { email, name, birthdate, password } = req.body;

    try {
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new Error("El campo email debe ser un email válido");
        }

        // Validación de nombre
        if (!name || name.length < 3 || name.length > 20) {
            throw new Error("El campo nombre debe tener al menos 3 caracteres y como máximo 20");
        }

        // Validación de birthdate
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdate || !birthdateRegex.test(birthdate)) {
            throw new Error("El campo birthdate debe estar en formato yyyy-mm-dd");
        }

        // Validación de password
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
        if (!password || !passwordRegex.test(password)) {
            throw new Error("El password debe tener al menos 4 caracteres, una letra, un número y un carácter especial");
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }

    next();
}

export default userValidateMiddleware;
