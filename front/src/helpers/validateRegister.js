export const validateRegister = ({ name, email, birthdate, nDni, username, password }) => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    if (!name) {
        errors.name = 'Debe ingresar su nombre';
    }

    if (!email) {
        errors.email = 'Debe ingresar un email';
    } else if (!emailRegExp.test(email)) {
        errors.email = 'Email inválido';
    }

    if (!birthdate) {
        errors.birthdate = 'Debe ingresar una fecha de nacimiento';
    }

    if (!nDni) {
        errors.nDni = 'Debe ingresar un número de DNI';
    }

    if (!username) {
        errors.username = 'Debe ingresar un nombre de usuario';
    }

    if (!password) {
        errors.password = 'Debe ingresar una contraseña';
    } else if (password.length < 5) {
        errors.password = 'Contraseña de al menos 5 caracteres';
    }

    return errors;
};
