// validateAppointment.js
export const validateAppointment = (values) => {
    const errors = {};
    if (!values.date) {
        errors.date = 'La fecha es obligatoria';
    }
    if (!values.time) {
        errors.time = 'La hora es obligatoria';
    }
    if (!values.userId) {
        errors.userId = 'El ID del usuario es obligatorio';
    }
    return errors;
};
