import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from "react";

import { AuthContext } from "../../../services/AuthContext";
import styles from './editProfile.module.css';
import constants from '../../../services/constants.js';
import auth from '../../../services/authentication.js';

export const EditProfile = () => {
    const { user, userAuth } = useContext(AuthContext);

    const userId = user._id;
    const [userData, setUser] = useState({});
    const [state, setState] = useState(false);
    const [uploadedPicture, setUploadedPicture] = useState(false);
    const [changedInfo, setChangedInfo] = useState(false);
    const [regError, setRegError] = useState('');

    useEffect(() => {
        auth.getOneUser(userId)
            .then(result => {
                setUser(result);
            });
    }, [userId]);

    const [values, setValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        phoneNumber: user.phoneNumber,
    });

    const [picture, setPicture] = useState({
        imageUrl: user.imageUrl,
        picture: '',
        pictureName: '',
    });

    useEffect(() => {
        setValues({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            bio: user.bio,
            phoneNumber: user.phoneNumber,
        });
        setPicture({
            imageUrl: user.imageUrl,
            picture: '',
            pictureName: '',
        });
    }, [user]);

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        setChangedInfo(false);
    }

    const minLength = (e, min) => {
        if (values[e.target.name].length < min) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true,
            }))
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false,
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

    const checkPhone = (e) => {
        const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!pattern.test(values.phoneNumber)) {
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

    const saveFile = (e) => {
        setPicture(state => ({
            ...state,
            picture: e.target.files[0]
        }));
        setPicture(state => ({
            ...state,
            pictureName: e.target.files[0].name
        }));

        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onSubmitPictureHandler = async (e) => {
        e.preventDefault();
        setUploadedPicture(old => !old);
        console.log(uploadedPicture);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("imageUrl", values.imageUrl || user.imageUrl);

        const url = `${constants.USERS_EDIT_PICTURE}/${userId}`;

        try {
            const res = axios.put(
                url,
                formData
            ).then(res => {
                if (res.data.error) {
                    const pattern = /(Path `)(.*?)(`)/g;
                    const errors = res.data.error.replace(pattern, '');
                    setRegError(errors);
                    setErrors(state => ({
                        ...state,
                        createError: true,
                        first: false,
                    }));
                    setState(false);
                    return;
                } else {

                    auth.getOneUser(userId)
                        .then(result => {
                            userAuth(result);
                        });

                    setUploadedPicture(true);
                }
            }).catch((err) => {
                setErrors(state => ({
                    ...state,
                    pictureError: true,
                    first: false,
                }));
            });
        } catch (ex) {
            setErrors(state => ({
                ...state,
                pictureError: true,
                first: false,
            }));
        }
        setUploadedPicture(false);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("bio", values.bio);
        formData.append("phoneNumber", values.phoneNumber);

        const url = `${constants.USERS_EDIT}/${userId}`;

        try {
            const res = axios.put(
                url,
                formData
            ).then(res => {
                if (res.data.error) {
                    const pattern = /(Path `)(.*?)(`)/g;
                    const errors = res.data.error.replace(pattern, '');
                    setRegError(errors);
                    setErrors(state => ({
                        ...state,
                        createError: true,
                        first: false,
                    }));

                    setState(false);
                    return;
                } else {
                    auth.getOneUser(userId)
                        .then(result => {
                            userAuth(result);
                        });

                    setChangedInfo(true);
                }
            }).catch((err) => {
                setErrors(state => ({
                    ...state,
                    serverError: true,
                    first: false,
                }));
            });
        } catch (ex) {
            setErrors(state => ({
                ...state,
                serverError: true,
                first: false,
            }));
        }
    }

    let isValidForm = Object.values(errors).some(x => x);

    return (
        <>
            <div className="rn-breadcrumb-inner ptb--30">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <h5 className="title text-center text-md-start">Edit Profile</h5>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <ul className="breadcrumb-list">
                                <li className="item"><Link to="/">Home</Link></li>
                                <li className="separator"><i className="feather-chevron-right"></i></li>
                                <li className="item current">Edit Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="edit-profile-area rn-section-gapTop">
                <div className="container">
                    <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
                        <div className="col-12 d-flex justify-content-between mb--30 align-items-center">
                            <h4 className="title-left">Edit Your Profile</h4>
                        </div>
                    </div>
                    <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
                        <div className="col-lg-3 col-md-3 col-sm-12">

                            <nav className="left-nav rbt-sticky-top-adjust-five">
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i className="feather-edit"></i>Edit Profile Image</button>
                                    <button className="nav-link" id="nav-home-tabs" data-bs-toggle="tab" data-bs-target="#nav-homes" type="button" role="tab" aria-controls="nav-homes" aria-selected="false"><i className="feather-user"></i>Personal Information</button>
                                    <button className="nav-link" id="nav-delete-tab" data-bs-toggle="tab" data-bs-target="#delete-profile" type="button" role="tab" aria-controls="delete-profile" aria-selected="false"> <i className="feather-unlock"></i>Delete User</button>
                                </div>
                            </nav>

                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12 mt_sm--30">
                            <div className="tab-content tab-content-edit-wrapepr" id="nav-tabContent">

                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <form onSubmit={onSubmitPictureHandler} className="row">
                                        <div className="nuron-information">

                                            <div className="profile-change row g-5">

                                                <div className="upload-area">

                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">
                                                            Upload file
                                                        </h6>
                                                        <p className="formate">
                                                            Drag or choose your file to upload
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                        <input name="picture"
                                                            id="createinputfile"
                                                            type="file"
                                                            className="inputfile"
                                                            onChange={saveFile}
                                                        />
                                                        <img
                                                            id="createfileImage"
                                                            src={user.imageUrl
                                                                ? user.imageUrl
                                                                : "/images/portfolio/portfolio-05.jpg"
                                                            }
                                                            alt=""
                                                            data-black-overlay="6"
                                                        />

                                                        <label htmlFor="createinputfile" title="No File Choosen">
                                                            <i className="feather-upload"></i>
                                                            <span className="text-center">Choose a File</span>
                                                            <p className="text-center mt--10">PNG, GIF, WEBP, MP4 or MP3. <br />    Max 1Gb.</p>
                                                        </label>
                                                    </div>

                                                    {uploadedPicture &&
                                                        <div className={`${styles.buttons} alert alert-success`} role="alert">
                                                            Picture uploaded!
                                                        </div>
                                                    }

                                                    {errors.pictureError &&
                                                        <p className={styles.formError}>
                                                            Something went wrong please try again later!
                                                        </p>
                                                    }
                                                    <div className="input-box">
                                                        <button
                                                            type="submit"
                                                            className={`${styles.buttons} btn btn-primary btn-large w-100`}
                                                            disabled={uploadedPicture}
                                                        >
                                                            {state ? 'Saving...' : 'Save'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                                <div className="tab-pane fade" id="nav-homes" role="tabpanel" aria-labelledby="nav-home-tab">

                                    <div className="nuron-information">
                                        <form onSubmit={onSubmitHandler} className="row">
                                            <div className="profile-form-wrapper">
                                                <div className="input-two-wrapper mb--15">
                                                    <div className="first-name half-wid">
                                                        <label htmlFor="contact-name" className="form-label">First Name</label>
                                                        <input
                                                            name="firstName"
                                                            id="contact-name"
                                                            type="text"
                                                            onChange={changeHandler}
                                                            onBlur={(e) => minLength(e, 2)}
                                                            value={values.firstName}
                                                        />
                                                    </div>
                                                    {errors.firstName &&
                                                        <p className={styles.formError}>
                                                            First name should be at least 2 characters long!
                                                        </p>
                                                    }
                                                    <div className="last-name half-wid">
                                                        <label htmlFor="contact-name-last" className="form-label">Last Name</label>
                                                        <input
                                                            name="lastName"
                                                            id="contact-name-last"
                                                            type="text"
                                                            onChange={changeHandler}
                                                            onBlur={(e) => minLength(e, 2)}
                                                            value={values.lastName}
                                                        />
                                                    </div>
                                                    {errors.lastName &&
                                                        <p className={styles.formError}>
                                                            Last name should be at least 2 characters long!
                                                        </p>
                                                    }
                                                </div>
                                                <div className="email-area">
                                                    <label htmlFor="Email" className="form-label">Edit Your Email</label>
                                                    <input
                                                        name="email"
                                                        id="Email"
                                                        type="email"
                                                        onChange={changeHandler}
                                                        onBlur={checkEmail}
                                                        value={values.email}
                                                    />
                                                </div>
                                                {errors.email &&
                                                    <p className={styles.formError}>
                                                        Email should be valid!
                                                    </p>
                                                }
                                            </div>



                                            <div className="edit-bio-area mt--20">
                                                <label htmlFor="Discription" className="form-label">Edit Your Bio</label>
                                                <textarea
                                                    name="bio"
                                                    id="Discription"
                                                    onChange={changeHandler}
                                                    onBlur={(e) => minLength(e, 5)}
                                                    value={values.bio}
                                                >

                                                </textarea>
                                                {errors.bio &&
                                                    <p className={styles.formError}>
                                                        Bio should be at least 5 characters long!
                                                    </p>
                                                }
                                            </div>

                                            <div className="edit-bio-area mt--20">
                                                <div className="half-wid phone-number">
                                                    <label htmlFor="PhoneNumber" className="form-label">Phone Number</label>
                                                    <input
                                                        name="phoneNumber"
                                                        id="PhoneNumber"
                                                        type="text"
                                                        placeholder="+880100000000"
                                                        onChange={changeHandler}
                                                        onBlur={checkPhone}
                                                        value={values.phoneNumber}
                                                    />
                                                </div>
                                                {errors.phoneNumber &&
                                                    <p className={styles.formError}>
                                                        Phone should be valid!
                                                    </p>
                                                }
                                            </div>
                                            {changedInfo &&
                                                <div className={`${styles.buttons} alert alert-success`} role="alert">
                                                    Saved!
                                                </div>
                                            }

                                            {errors.createError &&
                                                <p className={styles.formError}>
                                                    {regError}
                                                </p>
                                            }
                                            {errors.serverError &&
                                                <p className={styles.formError}>
                                                    Something went wrong please try again later!
                                                </p>
                                            }
                                            <div className="input-box">
                                                <button
                                                    type="submit"
                                                    className={`${styles.buttons} btn btn-primary btn-large w-100`}
                                                    disabled={isValidForm && state}
                                                >
                                                    {state ? 'Saving...' : 'Save'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="delete-profile" role="tabpanel" aria-labelledby="delete-profile-tab">

                                    <div className="nuron-information">
                                        <div className="condition">
                                            <h5 className="title">Delete your profile</h5>
                                            <p className="condition">
                                                Are you sure you want to delete your prodfile. This cannot be undone!
                                            </p>
                                            <hr />

                                            <Link to="/user/delete-user" className="btn btn-danger save-btn-edit">Delete Profile</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};