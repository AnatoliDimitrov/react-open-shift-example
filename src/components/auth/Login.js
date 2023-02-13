import { createBrowserRouter, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import axios from 'axios';

import { AuthContext } from "../../services/AuthContext";
import constants from '../../services/constants';

import styles from './register.module.css';

export const Login = () => {
    const { userAuth } = useContext(AuthContext);
    const [state, setState] = useState(false);

    const [values, setValues] = useState({
        username: '',
        password: '',
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
        formData.append("username", values.username);
        formData.append("password", values.password);
        

        try {
            const res = axios.post(
                constants.BASE,
                formData
            );
            res.then((value) => {
                console.log(value);
                userAuth(result.data);
                navigate('/');
              })

            const result = await res;
            console.log(result);
            if (result.data.error) {
                setErrors(state => ({
                ...state,
                invalidLogin: true,
                first: false,
                }));
            } else {
                userAuth(result.data);
                navigate('/');
            }
        } catch (ex) {
            // setErrors(state => ({
            //     ...state,
            //     serverError: true,
            //     first: false,
            //     }));
        }

        setState(false);
    }

    let isValidForm = Object.values(errors).some(x => x);
    //console.log(errors);
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src="../../images/logo.svg" alt="logo" />
                                </div>
                                <h4>Hello! let's get started</h4>
                                <h6 className="fw-light">Sign in to continue.</h6>
                                <form className="pt-3" onSubmit={onSubmitHandler}>
                                    <div className="form-group">
                                        <input 
                                            type="username" 
                                            name="username"
                                            onChange={changeHandler}
                                            value={values.username}
                                            className="form-control form-control-lg" 
                                            id="exampleInputEmail1" 
                                            placeholder="Username" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        type="password" 
                                        name="password"
                                        onChange={changeHandler}
                                        value={values.password}
                                        className="form-control form-control-lg" 
                                        id="exampleInputPassword1" 
                                        placeholder="Password" 
                                    />
                                    </div>
                                    {errors.invalidLogin &&
                                        <p className={styles.formError}>
                                            Invalid username or password!
                                        </p>
                                    }
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" disabled={state}>{state?'Loading...':'SIGN IN'}</button>
                                    </div>
                                    <div className="my-2 d-flex justify-content-between align-items-center">
                                        <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" />
                                                Keep me signed in
                                            </label>
                                        </div>
                                        <a href="#" className="auth-link text-black">Forgot password?</a>
                                    </div>
                                    {/* <div className="mb-2">
                                        <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                                            <i className="ti-facebook me-2"></i>Connect using facebook
                                        </button>
                                    </div> */}
                                    <div className="text-center mt-4 fw-light">
                                        Don't have an account? <a href="register.html" className="text-primary">Create</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};