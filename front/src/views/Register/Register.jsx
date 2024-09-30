import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import styles from './Register.module.css'; 
import { validateRegister } from '../../helpers/validateRegister';

const REGISTER_URL = 'http://localhost:3000/users/register'; 

export const Register = () => {
    const [message, setMessage] = useState('');

    return (
        <div className={styles.container}>
        
            <Formik
                initialValues={{ name: '', email: '', birthdate: '', nDni: '', username: '', password: '' }}
                validate={validateRegister}
                onSubmit={async (values, { setSubmitting }) => {
                    setMessage('');

                    const userData = {
                        name: values.name,
                        email: values.email,
                        birthdate: values.birthdate,
                        nDni: values.nDni,
                        username: values.username,
                        password: values.password
                    };

                    console.log('Datos enviados:', userData);

                    try {
                        const { data } = await axios.post(REGISTER_URL, userData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        setMessage('Registro exitoso!');
                        console.log('Respuesta:', data);  // respuesta del servidor
                    } catch (error) {
                        const errorMsg = error.response ? error.response.data.error : error.message;
                        console.error('Error en la solicitud:', errorMsg);
                        setMessage(`Error: ${errorMsg}`);
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Nombre:</label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className={styles.input}
                            />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email:</label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className={styles.input}
                            />
                            <ErrorMessage name="email" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="birthdate" className={styles.label}>Fecha de Nacimiento:</label>
                            <Field
                                type="date"
                                name="birthdate"
                                id="birthdate"
                                className={styles.input}
                            />
                            <ErrorMessage name="birthdate" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="nDni" className={styles.label}>Número de DNI:</label>
                            <Field
                                type="text"
                                name="nDni"
                                id="nDni"
                                className={styles.input}
                            />
                            <ErrorMessage name="nDni" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="username" className={styles.label}>Nombre de Usuario:</label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                className={styles.input}
                            />
                            <ErrorMessage name="username" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Contraseña:</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                className={styles.input}
                            />
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>
                        <button type="submit" className={styles.button} disabled={isSubmitting}>
                            Registrarse
                        </button>
                        <div className={styles.message}>
                            <p>{message}</p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
