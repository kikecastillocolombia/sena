import { error } from "console";
import {credentialRepository, userRepository } from "../config/data-source";
import ICreateUserDto from "../dtos/ICreateUserDto";
import { User } from "../entities/User";

export const getAllUsersService = async (): Promise<User[]> => {
    const users = await userRepository.find({
        relations: ['appointments']
    });
    return users; 
}

export const getAllUsersByIdService = async (id: number): Promise<User | null> => {
    const user = await userRepository.findOne({
        where: { id },
        relations: ['appointments']
    });

    if (!user) throw new Error(`Usuario con id: ${id} no encontrado`);
    return user;
}

export const createUserService = async (createUserDto: ICreateUserDto) => {
    const { name, email, birthdate, nDni, username, password } = createUserDto;

    // Validar que el nombre no sea nulo o vacío
    if (!name) throw new Error('Debes ingresar un nombre');

    // Validar que el email no sea nulo o vacío
    if (!email) throw new Error('Debes ingresar un correo electronico');

    // Validar que el usuario no sea nulo o vacío
    if (!username) throw new Error('Debes ingresar un nombre de usuario');

    // Validar que la contraseña no sea nula o vacía
    if (!password) throw new Error('La contraseña no puede ser nula o vacía');

    //Validar que el usuario no este registrado
    const foundUser = await userRepository.findOneBy({ email });
    if(foundUser) throw new Error(`El mail ${email} ya se ha registrado`)

    // Crear y guardar credenciales
    
    const newCredential = credentialRepository.create({ username, password });
    await credentialRepository.save(newCredential);

    const newUser = userRepository.create({
        name,
        email,
        birthdate: birthdate.toString(), // Convierte a string si birthdate es de tipo string
        nDni,
        credential: newCredential
    });
    await userRepository.save(newUser);

    return newUser;
}

export const findUserByCredentialId = async (credentialId: number): Promise<User> => {
    // Encuentra el usuario por credentialId
    const foundUser = await userRepository.findOne({
        where: { credential: { id: credentialId } },
        relations: ["credential"] 
    });

    if (!foundUser) throw new Error('Usuario no encontrado');

    return foundUser;
};
