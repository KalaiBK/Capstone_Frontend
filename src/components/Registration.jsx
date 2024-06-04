import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NavBar from './NavBar';
import '../CSS/Registration.css'

function Registration() {
    const navigate = useNavigate();
    // Response structure for API response
    let response = { isSuccess: false, isError: false, message: "" };
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    // Regex for email validation
    const emailRegExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

    // Arrow function for toggling password
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    // Arrow function for toggling confirm password
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };
    return (
        <div>
            {/* Displaying Navbar component*/}
            <NavBar screen={true} />
            <div className="p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-6 col-lg-4 mx-auto">
                            <div className="formContainer">
                                <h2 className="p-2 text-center mb-4 h4" id="formHeading">Registration</h2>
                                {/* Creating Formik Tag and assigning initial values */}
                                <Formik initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
                                    /* Validating the fields in the Form */
                                    validate={(values) => {
                                        const errors = {};
                                        /* Validating username Field */
                                        if (values.username.length < 1) {
                                            errors.username = "Please Enter Name";
                                        }
                                        /* Validating email Field */
                                        if (values.email.length < 1) {
                                            errors.email = "Please Enter e-mail ";
                                        }
                                        if (!emailRegExp.test(values.email)) {
                                            errors.email = "Please Enter e-mail in correct format";
                                        }
                                        /* Validating password Field */
                                        if (values.password.length < 1) {
                                            errors.password = "Please Enter Password";
                                        }
                                        /* Validating Confirm password Field */
                                        if (values.confirmPassword.length < 1) {
                                            errors.confirmPassword = "Please Confirm your Password";
                                        } else if (values.confirmPassword !== values.password) {
                                            errors.confirmPassword = "Password Mismatch"
                                        }
                                        return errors;
                                    }}
                                    /* Submitting the form with the given values */
                                    onSubmit={(values, { resetForm }) => {
                                        response.isError = false
                                        response.isSuccess = false
                                        // Registering the user details
                                        fetch("https://capstone-backend-lcsf.onrender.com/auth/register", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(values)
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                if (data.message == "User already exists") {
                                                    // Assign error response in case of error
                                                    response.isError = true;
                                                    response.message = data.message
                                                } else {
                                                    // Assign success response in case of success
                                                    response.isSuccess = true;
                                                    response.message = data.message
                                                    // Navigate to Login screen
                                                    navigate("/Login", { replace: true })
                                                }
                                                // Reset form
                                                resetForm({ values: '' })
                                            })
                                            .catch(error => {
                                                // Consoling the error received on fetch
                                                console.log("Error: ", error);
                                            })
                                        // Reset form
                                        resetForm({ values: '' })
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div className={response.isSuccess ? "alert alert-success d-block" : "alert alert-success d-none"} role="alert">
                                                <strong>{response.message}</strong>
                                            </div>
                                            <div className={response.isError ? "alert alert-danger d-block" : "alert alert-danger d-none"} role="alert">
                                                <strong>{response.message}</strong>
                                            </div>
                                            <div className="my-2">
                                                <label htmlFor="username" className="form-label">Name</label>
                                                <Field type="text" name="username" className='form-control' />
                                                <ErrorMessage name="username" className='text-danger' component="div" />
                                            </div>
                                            <div className="my-2">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <Field type="email" name="email" className='form-control' />
                                                <label style={{ color: 'blue' }}>Email will be your Username for Login</label>
                                                <ErrorMessage name="email" className='text-danger' component="div" />
                                            </div>
                                            <div className='input-group py-2'>
                                                <div>
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                </div>
                                                <div className='input-group'>
                                                    <Field type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" className="form-control" aria-describedby="basic-addon2" />
                                                    <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                        <i className={`bi ${passwordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="password" className='text-danger' component="div" />
                                            </div>
                                            <div className='input-group py-2'>
                                                <div>
                                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                                </div>
                                                <div className='input-group'>
                                                    <Field type={confirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" placeholder="Password" className="form-control" aria-describedby="basic-addon2" />
                                                    <span className="input-group-text" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                                                        <i className={`bi ${confirmPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="confirmPassword" className='text-danger' component="div" />
                                            </div>
                                            <div className="my-2 d-flex py-2 justify-content-center align-items-center">
                                                <button type="submit" className="btn btn-primary">Register</button>
                                            </div>
                                            <div className="my-2">
                                                <div className='d-flex justify-content-center'>
                                                    <p>Already a user?&nbsp;</p>
                                                    <Link to='/'>Login</Link>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </ Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Registration