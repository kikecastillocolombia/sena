import { credentialRepository } from "../config/data-source";
import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import { Credential } from "../entities/Credentials";
import ICredential from "../interfaces/Icredential";


export const createCredential = async (createCredentialDto: ICreateCredentialDto): Promise<ICredential> => {
    const { username, password } = createCredentialDto;

    // Crea una nueva instancia de ICredential
    const newCredential = credentialRepository.create({
        username,
        password
    });

    // Guarda la nueva credencial en la base de datos
    await credentialRepository.save(newCredential);
    return newCredential;
};



// Repositorio de credenciales desde la fuente de datos

// Valida credenciales
export const validateCredential = async (username: string, password: string): Promise<Credential> => {
    // Encuentra credencial por nombre de usuario
    const credential = await credentialRepository.findOne({
        where: { username }
    });

    // Verifica si la contraseña es correcta
    if (!credential || credential.password !== password) {
        throw new Error("Credenciales incorrectas");
    }

    return credential;
};
