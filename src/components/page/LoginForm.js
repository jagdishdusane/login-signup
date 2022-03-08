import React from "react";
import useInput from "../hooks/use-input";

import Swal from "sweetalert2";
import "./SignIn-SignUpForm.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const user = {
  userName: "Jagdish90@gmail.com",
  password: "JagdishD#123",
};

const LoginForm = () => {
  function popup() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Login in successfully",
    });
    // alert("Congratulations, you have been successfully sign up");
  }

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value === user.userName);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value === user.password);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formHandler = (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    emailInputReset();
    passwordInputReset();
  };

  const emailInputClasses = emailInputHasError
    ? "input_field invalid"
    : "input_field ";

  const passwordInputClasses = passwordInputHasError
    ? "input_field invalid"
    : "input_field ";

  return (
    <>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Login</h2>
          </div>
          <div className="row clearfix">
            <div>
              <form onSubmit={formHandler}>
                <div className="row clearfix">
                  <div className="col_half"></div>
                </div>
                <div className={emailInputClasses}>
                  <span>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      aria-hidden="true"
                      className="icon"
                    ></FontAwesomeIcon>
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={enteredEmail}
                    onBlur={emailBlurHandler}
                    onChange={emailChangedHandler}
                  />
                </div>
                {emailInputHasError && <p>Email Must Be Valid</p>}

                <div className={passwordInputClasses}>
                  <span>
                    <FontAwesomeIcon
                      icon={faLock}
                      aria-hidden="true"
                      className="icon"
                    ></FontAwesomeIcon>
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={enteredPassword}
                    onBlur={passwordBlurHandler}
                    onChange={passwordChangedHandler}
                  />
                </div>
                {passwordInputHasError && <p>Enter Correct Password</p>}

                <button className="btn" disabled={!formIsValid}>
                  <Link
                    onClick={popup}
                    style={{
                      pointerEvents: !formIsValid ? "none" : "",
                    }}
                    to="/homepage"
                  >
                    Login
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
        <p className="credit">
          Don't have an account? <Link to="/signup">Signup Now</Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
