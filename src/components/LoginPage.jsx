import React, { useContext, useState } from 'react'
import '../CSS/LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NavBar from './NavBar';

function LoginPage() {
  const navigate = useNavigate();
  // Response structure for API response
  let response = { isError: false, message: "" }
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Arrow function for toggling password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
                <h2 className="p-2 text-center mb-4 h4" id="formHeading">Login</h2>
                {/* Creating Formik Tag and assigning initial values */}
                <Formik initialValues={{ username: "", password: "" }}
                  /* Validating the fields in the Form */
                  validate={(values) => {
                    const errors = {};
                    /* Validating username Field */
                    if (values.username.length < 1) {
                      errors.username = "Please Enter Username";
                    }
                    /* Validating password Field */
                    if (values.password < 1) {
                      errors.password = "Please Enter Password";
                    }
                    return errors;
                  }}
                  /* Submitting the form with the given values */
                  onSubmit={(values, { resetForm }) => {
                    /* Caliing login API with username and password */
                    fetch("https://capstone-backend-lcsf.onrender.com/auth/login", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(values)
                    })
                      .then(response => response.json())
                      .then(data => {
                        if (data.message == "Invalid Credentials") {
                          // If invalid credentials show error
                          response.isError = true;
                          response.message = data.message
                        } else {
                          // If valid credentials store the below details in local storage
                          localStorage.setItem('email', values.username);
                          localStorage.setItem('name', data.name);
                          localStorage.setItem("userToken", data.token);
                          // Navigate to dashboard screen after success response
                          navigate("/Dashboard", { replace: true })
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
                      <div className={response.isError ? "alert alert-danger d-block" : "alert alert-danger d-none"} role="alert">
                        {response.message}
                      </div>
                      <div className='py-2'>
                        <label htmlFor="username" className="form-label">Username</label>
                        <Field type="text" name="username" placeholder="Username" className="form-control" />
                        <ErrorMessage name="username" className='text-danger' component="div" />
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

                      <div className='d-flex py-2 justify-content-center align-items-center'>
                        <button type="submit" className='btn btn-primary'>
                          Login
                        </button>
                      </div>

                      <div className='py-2'>
                        <div className='d-flex justify-content-center'>
                          <p>Already a user?&nbsp;</p>
                          <Link to='/Registration'>Register</Link>
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

export default LoginPage