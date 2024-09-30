/* eslint-disable no-unused-vars */
// CreateAppointment.jsx
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { validateAppointment } from '../../helpers/validateAppointment';
import styles from './CreateAppointment.module.css'; 
import { fetchAppointments } from '../../redux/appointmentsSlice'; 
import { Navigate } from 'react-router-dom'; 

const APPOINTMENT_URL = 'http://localhost:3000/appointment/schedule'; 

const generateTimeSlots = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
        times.push(`${hour < 10 ? '0' : ''}${hour}:00`);
        times.push(`${hour < 10 ? '0' : ''}${hour}:30`);
    }
    times.push('18:00'); // Agregar el último intervalo de las 6 p.m.
    return times;
};

export const CreateAppointment = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const timeSlots = generateTimeSlots();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Crear Cita</h1>
                <Formik
                    initialValues={{ date: '', time: '', userId: user.id }}
                    validate={validateAppointment}
                    onSubmit={async (values, { setSubmitting }) => {
                        setMessage('');

                        const appointmentData = {
                            date: values.date,
                            time: values.time,
                            userId: parseInt(values.userId, 10) // Convertimos el userId a número
                        };

                        try {
                            const response = await axios.post(APPOINTMENT_URL, appointmentData, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            setMessage('Cita creada exitosamente!');
                            dispatch(fetchAppointments(user.id));
                        } catch (error) {
                            let errorMsg;
                            if (error.response) {
                                errorMsg = error.response.data.error || error.response.data.message;
                            } else if (error.request) {
                                errorMsg = 'No se recibió respuesta del servidor';
                            } else {
                                errorMsg = error.message;
                            }
                            setMessage(`Léeme: ${errorMsg}`);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.formGroup}>
                                <label htmlFor="date" className={styles.label}>Fecha:</label>
                                <Field
                                    type="date"
                                    name="date"
                                    id="date"
                                    className={styles.input}
                                />
                                <ErrorMessage name="date" component="div" className={styles.error} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="time" className={styles.label}>Hora:</label>
                                <Field as="select" name="time" id="time" className={styles.input}>
                                    <option value="">Seleccione una hora</option>
                                    {timeSlots.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="time" component="div" className={styles.error} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="userId" className={styles.label}>ID del Usuario:</label>
                                <Field
                                    type="text"
                                    name="userId"
                                    id="userId"
                                    className={styles.input}
                                    disabled
                                />
                                <ErrorMessage name="userId" component="div" className={styles.error} />
                            </div>
                            <button type="submit" className={styles.button} disabled={isSubmitting}>
                                Crear Cita
                            </button>
                            <div className={styles.message}>
                                <p>{message}</p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
