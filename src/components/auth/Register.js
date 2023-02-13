import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

//import axios from 'axios';

import { AuthContext } from "../../services/AuthContext";
import constants from '../../services/constants';

import styles from './register.module.css';

export const Register = () => {

    const { userAuth } = useContext(AuthContext);
    const [state, setState] = useState(false);
    const [regError, setRegError] = useState('');

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({ first: true });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const minLength = (e, min) => {
        if (values[e.target.name].length < min) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true,
                first: false,
            }))
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false,
                first: false,
            }))
        }
    };

    const checkRepeatPassword = (e) => {
        if (values.password !== values.repeatPassword) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true,
                first: false,
            }))
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false,
                first: false,
            }))
        }
    };

    const checkEmail = (e) => {
        const pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!pattern.test(values.email)) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true,
                first: false,
            }))
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false,
                first: false,
            }))
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setState(true);
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("repeatPassword", values.repeatPassword);

        // try {
        //     const res = axios.post(
        //         constants.USERS_REGISTER,
        //         formData
        //     );

        //     const result = await res;
        //     if (result.data.error) {
        //         const pattern = /(Path `)(.*?)(`)/g;
        //         const errors = result.data.error.replace(pattern, '');
        //         setRegError(errors);
        //         setErrors(state => ({
        //             ...state,
        //             registerError: true,
        //             first: false,
        //         }));

        //         setState(false);
        //         return;
        //     } else {
        //         userAuth(result.data);
        //         navigate('/');
        //     }
        // } catch (ex) {
        //     setErrors(state => ({
        //         ...state,
        //         serverError: true,
        //         first: false,
        //     }));
        // }

        setState(false);
    }

    let isValidForm = Object.values(errors).some(x => x);

    return (
        <>
            <div className="rn-breadcrumb-inner ptb--30">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <h5 className="title text-center text-md-start">Nuron Sign Up</h5>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <ul className="breadcrumb-list">
                                <li className="item"><Link to="/">Home</Link></li>
                                <li className="separator"><i className="feather-chevron-right"></i></li>
                                <li className="item current">Sign Up</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-area rn-section-gapTop">
                <div className="container">
                    <div className="row g-5">
                        <div className="offset-2 col-lg-4 col-md-6 ml_md--0 ml_sm--0 col-sm-12">
                            <div className="form-wrapper-one registration-area">
                                <h4>Sign up</h4>
                                <form onSubmit={onSubmitHandler}>
                                    <div className="mb-5">
                                        <label htmlFor="firstName" className="form-label">First name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="Anatoli"
                                            onChange={changeHandler}
                                            onBlur={(e) => minLength(e, 2)}
                                            value={values.firstName}
                                        />
                                        {errors.firstName &&
                                            <p className={styles.formError}>
                                                First name should be at least 2 characters long!
                                            </p>
                                        }
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="lastName" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Dimitrov"
                                            onChange={changeHandler}
                                            onBlur={(e) => minLength(e, 2)}
                                            value={values.lastName}
                                        />
                                        {errors.lastName &&
                                            <p className={styles.formError}>
                                                Last name should be at least 2 characters long!
                                            </p>
                                        }
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            id="exampleInputEmail1"
                                            name="email"
                                            placeholder="example@example.com"
                                            onChange={changeHandler}
                                            value={values.email}
                                            onBlur={checkEmail}
                                        />
                                        {errors.email &&
                                            <p className={styles.formError}>
                                                Email should be valid!
                                            </p>
                                        }
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="newPassword" className="form-label">Create Password</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="password"
                                            onChange={changeHandler}
                                            onBlur={(e) => minLength(e, 3)}
                                            value={values.password}
                                        />
                                        {errors.password &&
                                            <p className={styles.formError}>
                                                Password should be at least 3 characters long!
                                            </p>
                                        }
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Repeat Password</label>
                                        <input
                                            type="password"
                                            id="exampleInputPassword1"
                                            name="repeatPassword"
                                            onChange={changeHandler}
                                            onBlur={checkRepeatPassword}
                                            value={values.repeatPassword}
                                        />
                                        {errors.repeatPassword &&
                                            <p className={styles.formError}>
                                                Passwords should match!
                                            </p>
                                        }
                                    </div>
                                    {errors.registerError &&
                                        <p className={styles.formError}>
                                            {regError}
                                        </p>
                                    }
                                    {errors.serverError &&
                                        <p className={styles.formError}>
                                            Something went wrong please try again later!
                                        </p>
                                    }
                                    <button type="submit" className="btn btn-primary mr--15" disabled={state}>{state ? 'Loading...' : 'Sign Up'}</button>
                                    <Link to="/authentication/login" className="btn btn-primary-alta">Log In</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};