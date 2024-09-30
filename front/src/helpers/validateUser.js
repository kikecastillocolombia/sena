const validateUser = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'El nombre de usuario es obligatorio';
    }

    if (!values.password) {
        errors.password = 'La contraseña es obligatoria';
    } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
};

export default validateUser;
