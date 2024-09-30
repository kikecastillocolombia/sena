import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import validateUser from '../../helpers/validateUser';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    return (
        <div className={styles.container}>
            <div>
            </div>
            <Formik
                initialValues={{ username: '', password: '' }}
                validate={validateUser}
                onSubmit={async (values, { setSubmitting }) => {
                    setMessage('');

                    const userData = {
                        username: values.username,
                        password: values.password
                    };

                    try {
                        const action = await dispatch(loginUser(userData));
                        if (loginUser.fulfilled.match(action)) {
                            setMessage('Inicio de sesión exitoso!');
                            navigate('/appointment'); // Redirige a la página deseada
                        } else {
                            setMessage(`Error: ${action.payload.message || 'No se pudo iniciar sesión'}`);
                        }
                    } catch (error) {
                        setMessage(`Error: ${error.message || 'Error desconocido'}`);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
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
                            Iniciar Sesión
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
