import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NavBar from './NavBar';

function UserProfile() {
    const [isFetching, setIsFetching] = useState(true);
    const [initialValues, setInitialValues] = useState(null);
    const [error, setError] = useState(null);
    const [id, setID] = useState(0);
    // Response structure for API response
    let response = { isSuccess: false, isError: false, message: "" };
    // Reg for Email Validation
    const emailRegExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    // Reg for Phone Number Validation
    const phoneRegExp = RegExp(/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/);
    // Reg for zipcode Validation
    const zipcodeRegExp = RegExp(/^\d{6}$/);

    useEffect(() => {
        if (isFetching) {
            // Get staff details from API
            fetch('https://capstone-backend-lcsf.onrender.com/staffdetails/get', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: localStorage.getItem("email") })
            })
                .then(response => response.json())
                .then(data => {
                    // Assign response data to variable
                    const { name, gender, mobile_number, email_id, address, city, state, zipcode, country } = data[0]
                    // Set ID to state
                    setID(data[0]._id)
                    // Set initial values
                    setInitialValues({ name: name, email: email_id, gender: gender, mobile: mobile_number, address: address, city: city, state: state, country: country, zipcode: zipcode })
                })
                .catch(error => {
                    // Consoling the error received on fetch
                    setError(error);
                });
        }
        setIsFetching(false);
    }, [isFetching, initialValues]);
    return (
        <div>
            {/* Displaying Navbar component*/}
            <NavBar />
            <div className="p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-6 col-lg-4 mx-auto">
                            <div className="formContainer">
                                <h2 className="p-2 text-center mb-4 h4" id="formHeading">Profile</h2>
                                {initialValues ?
                                    /* Creating Formik Tag and assigning initial values */ 
                                        (<Formik initialValues={initialValues}
                                            /* Validating the fields in the Form */
                                            validate={(values) => {
                                                const errors = {};
                                                /* Validating Name Field */
                                                if (values.name.length < 1) {
                                                    errors.name = "Please Enter name";
                                                }
                                                /* Validating Email Field */
                                                if (values.email < 1) {
                                                    errors.email = "Please Enter e-mail ";
                                                }
                                                if (!emailRegExp.test(values.email)) {
                                                    errors.email = "Please Enter e-mail in correct format";
                                                }
                                                /* Validating Gender Field */
                                                if (values.gender.length < 1) {
                                                    errors.gender = "Please Enter your gender";
                                                }
                                                /* Validating Mobile Field */
                                                if (!values.mobile || values.mobile.length < 1) {
                                                    errors.mobile = "Please Enter Customer Mobile Number";
                                                } else {
                                                    if (!phoneRegExp.test(values.mobile)) {
                                                        errors.mobile = "Please Enter a valid Mobile Number";
                                                    }
                                                }
                                                /* Validating Address Field */
                                                if (values.address.length < 1) {
                                                    errors.address = "Please Enter Address";
                                                }
                                                /* Validating City Field */
                                                if (values.city.length < 1) {
                                                    errors.city = "Please Enter City";
                                                }
                                                /* Validating State Field */
                                                if (values.state.length < 1) {
                                                    errors.state = "Please Enter State";
                                                }
                                                /* Validating Country Field */
                                                if (values.country.length < 1) {
                                                    errors.country = "Please Enter Country";
                                                }
                                                /* Validating zipcode Field */
                                                if (!values.zipcode || values.zipcode < 1) {
                                                    errors.zipcode = "Please Enter Zipcode";
                                                } else {
                                                    if (!zipcodeRegExp.test(values.zipcode)) {
                                                        errors.zipcode = "Please Enter a valid Zipcode";
                                                    }
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
                                                    _id: id
                                                };
                                                // Fetch Staff Details from API
                                                fetch("http://localhost:3000/staffdetails/update", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(newData)
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        if (data.message == "User updated successfully") {
                                                            // Assign Success response to response
                                                            response.isSuccess = true;
                                                            response.message = data.message
                                                        } else {
                                                            // Assign Error response to response
                                                            response.isError = true;
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
                                                    <div className="my-2">
                                                        <label htmlFor="name" className="form-label">Name</label>
                                                        <Field type="text" name="name" className='form-control' disabled />
                                                        <ErrorMessage name="name" className="text-danger" component="div" />

                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="email" className="form-label">Email Id</label>
                                                        <Field type="email" name="email" className='form-control' disabled />
                                                        <ErrorMessage name="email" className="text-danger" component="div" />

                                                    </div>
                                                    <div className="form-group my-2">
                                                        <label>Gender</label>
                                                        <div>
                                                            <label className="radio-inline w-25">
                                                                <Field type="radio" name="gender" value="male"/>&nbsp;Male
                                                            </label>
                                                            <label className="radio-inline">
                                                                <Field type="radio" name="gender" value="female"/>&nbsp;Female
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="gender" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                                        <Field type="text" name="mobile" className='form-control' />
                                                        <ErrorMessage name="mobile" className="text-danger" component="div" />

                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="address" className="form-label">Address</label>
                                                        <Field type="text" name="address" className='form-control' />
                                                        <ErrorMessage name="address" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="city" className="form-label">City</label>
                                                        <Field type="text" name="city" className='form-control' />
                                                        <ErrorMessage name="city" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="state" className="form-label">State</label>
                                                        <Field type="text" name="state" className='form-control' />
                                                        <ErrorMessage name="state" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="country" className="form-label">Country</label>
                                                        <Field type="text" name="country" className='form-control' />
                                                        <ErrorMessage name="country" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="zipcode" className="form-label">Zipcode</label>
                                                        <Field type="text" name="zipcode" className='form-control' />
                                                        <ErrorMessage name="zipcode" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="my-2 d-flex py-2 justify-content-center align-items-center">
                                                        <button type="submit" className="btn btn-primary">Update Profile</button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>) : (<></>)}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserProfile