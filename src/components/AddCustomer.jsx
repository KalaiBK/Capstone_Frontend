import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NavBar from './NavBar';

function AddCustomer() {
  // Reg for Email Validation
  const emailRegExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
  // Reg for Phone Number Validation
  const phoneRegExp = RegExp(/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/);
  // Response structure for API response
  const response = { isSuccess: false, isError: false, message: "" }
  return (
    <div>
      {/* Displaying Navbar component*/}
      <NavBar name="addcustomer" />
      <div className="p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-6 col-lg-4 mx-auto">
              <div className="formContainer">
                <h2 className="p-2 text-center mb-4 h4" id="formHeading">Add Customer</h2>
                {/* Creating Formik Tag and assigning initial values */}
                <Formik initialValues={{ name: "", email: "", gender: "", mobile: "", address: "" }}
                  /* Validating the fields in the Form */
                  validate={(values) => {
                    const errors = {};
                    /* Validating Name Field */
                    if (values.name.length < 1) {
                      errors.name = "Please Enter Customer Name";
                    }
                    /* Validating Email Field */
                    if (values.email.length < 1) {
                      errors.email = "Please Enter Customer Email";
                    } else {
                      if (!emailRegExp.test(values.email)) {
                        errors.email = "Please Enter a valid email";
                      }
                    }
                    /* Validating Gender Field */
                    if (values.gender.length < 1) {
                      errors.gender = "Please Enter Customer Gender";
                    }
                    /* Validating Mobile Field */
                    if (values.mobile.length < 1) {
                      errors.mobile = "Please Enter Customer Mobile Number";
                    } else {
                      if (!phoneRegExp.test(values.mobile)) {
                        errors.mobile = "Please Enter a valid Mobile Number";
                      }
                    }
                    /* Validating Address Field */
                    if (values.address.length < 1) {
                      errors.address = "Please Enter Customer Address";
                    }
                    return errors;
                  }}
                  /* Submitting the form with the given values */
                  onSubmit={(values, { resetForm }) => {
                    response.isError = false;
                    response.isSuccess = false;
                    // Adding the customer details to DB
                    fetch("https://capstone-backend-lcsf.onrender.com/customer/add", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(values)
                    })
                      .then(response => response.json())
                      .then(data => {
                        if (data.message == "Customer already exists") {
                          // If Customer already exists assign error to response
                          response.isError = true;
                          response.message = data.message;
                        } else {
                          // If success assign success to response
                          response.isSuccess = true;
                          response.message = data.message;
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
                      <div className={response.isSuccess ? "d-block alert alert-success" : "d-none alert alert-success"}>
                        <strong>{response.message}</strong>
                      </div>
                      <div className={response.isError ? "d-block alert alert-danger" : "d-none alert alert-danger"}>
                        <strong>{response.message}</strong>
                      </div>
                      <div className="my-2">
                        <label htmlFor="name" className="form-label">Name</label>
                        <Field type="text" name="name" className='form-control' />
                        <ErrorMessage name="name" className="text-danger" component="div" />

                      </div>
                      <div className="my-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <Field type="email" name="email" className='form-control' />
                        <ErrorMessage name="email" className="text-danger" component="div" />

                      </div>
                      <div className="form-group my-2">
                        <label>Gender</label>
                        <div>
                          <label className="radio-inline w-25">
                            <Field type="radio" name="gender" value="male" />&nbsp;Male
                          </label>
                          <label className="radio-inline">
                            <Field type="radio" name="gender" value="female" />&nbsp;Female
                          </label>
                        </div>
                        <ErrorMessage name="gender" component="div" className="text-danger" />
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
                      <div className="my-2 d-flex py-2 justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary">Add Customer</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomer