import React, { useContext, useState } from 'react'
import NavBar from './NavBar';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function ChangePassword() {
    // Response structure for API response
    const response = { isSuccess: false, isError: false, message: "" }
    // Usestate for old password
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    // Usestate for new password
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    // Usestate for confirm new password
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);

    // Arrow function for toggling old password
    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible(!oldPasswordVisible);
    };
    // Arrow function for toggling new password
    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };
    // Arrow function for toggling confirm new password
    const toggleConfirmNewPasswordVisibility = () => {
        setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
    };
    return (
        <div>
            {/* Displaying Navbar component*/}
            <NavBar />
            <div className="p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-6 col-lg-4 mx-auto">
                            <div className="formContainer">
                                <h2 className="p-2 text-center mb-4 h4" id="formHeading">Change Password</h2>
                                {/* Creating Formik Tag and assigning initial values */}
                                <Formik initialValues={{ oldpassword: "", newpassword: "", confirmnewpassword: "" }}
                                    /* Validating the fields in the Form */
                                    validate={(values) => {
                                        const errors = {};
                                        /* Validating Old Password Field */
                                        if (values.oldpassword.length < 1) {
                                            errors.oldpassword = "Please Enter your Old Password";
                                        }
                                        /* Validating New Password Field */
                                        if (values.newpassword.length < 1) {
                                            errors.newpassword = "Please Enter your Old Password";
                                        }
                                        /* Validating Confirm New Password Field */
                                        if (values.confirmnewpassword.length < 1) {
                                            errors.confirmnewpassword = "Please Confirm your New Password";
                                        } else if (values.confirmnewpassword !== values.newpassword) {
                                            errors.confirmnewpassword = "Password Mismatch"
                                        }
                                        return errors;
                                    }}
                                    /* Submitting the form with the given values */
                                    onSubmit={(values, { resetForm }) => {
                                        response.isError = false
                                        response.isSuccess = false
                                        // Creating new data by appending entered values and email
                                        const newData = {
                                            ...values,
                                            email: localStorage.getItem("email"),
                                        };
                                        // Adding the customer details to DB
                                        fetch("https://capstone-backend-lcsf.onrender.com/auth/changepassword", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(newData)
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                if (data.message == "Something went wrong. Please try after some time." || data.message == "Invalid Credentials") {
                                                    // If error occurs assign error to response
                                                    response.isError = true;
                                                    response.message = data.message
                                                } else {
                                                    // If success assign success to response
                                                    response.isSuccess = true;
                                                    response.message = data.message
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
                                            <div className='input-group py-2'>
                                                <div>
                                                    <label htmlFor="oldpassword" className="form-label">Old Password</label>
                                                </div>
                                                <div className='input-group'>
                                                    <Field type={oldPasswordVisible ? 'text' : 'password'} name="oldpassword" placeholder="Old Password" className="form-control" aria-describedby="basic-addon2" />
                                                    <span className="input-group-text" onClick={toggleOldPasswordVisibility} style={{ cursor: 'pointer' }}>
                                                        <i className={`bi ${oldPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="oldpassword" className='text-danger' component="div" />
                                            </div>
                                            <div className='input-group py-2'>
                                                <div>
                                                    <label htmlFor="newpassword" className="form-label">New Password</label>
                                                </div>
                                                <div className='input-group'>
                                                    <Field type={newPasswordVisible ? 'text' : 'password'} name="newpassword" placeholder="New Password" className="form-control" aria-describedby="basic-addon2" />
                                                    <span className="input-group-text" onClick={toggleNewPasswordVisibility} style={{ cursor: 'pointer' }}>
                                                        <i className={`bi ${newPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="newpassword" className='text-danger' component="div" />
                                            </div>
                                            <div className='input-group py-2'>
                                                <div>
                                                    <label htmlFor="confirmnewpassword" className="form-label">Confirm New Password</label>
                                                </div>
                                                <div className='input-group'>
                                                    <Field type={confirmNewPasswordVisible ? 'text' : 'password'} name="confirmnewpassword" placeholder="Confirm New Password" className="form-control" aria-describedby="basic-addon2" />
                                                    <span className="input-group-text" onClick={toggleConfirmNewPasswordVisibility} style={{ cursor: 'pointer' }}>
                                                        <i className={`bi ${confirmNewPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="confirmnewpassword" className='text-danger' component="div" />
                                            </div>
                                            <div className="my-2 d-flex py-2 justify-content-center align-items-center">
                                                <button type="submit" className="btn btn-primary">Change Password</button>
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

export default ChangePassword