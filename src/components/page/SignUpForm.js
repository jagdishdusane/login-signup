import { useDispatch } from "react-redux";

import { React, useState } from "react";
import Swal from "sweetalert2";
import useInput from "../hooks/use-input";
import "./SignIn-SignUpForm.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faChild } from "@fortawesome/free-solid-svg-icons";
import { signup } from "../features/userSlice";

var regName = /^[a-zA-Z]+$/;
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var phoneno = /^\d{10}$/;
var strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const SignUpForm = (props) => {
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
      title: "Sign up successfully done",
    });
    // alert("Congratulations, you have been successfully sign up");
  }

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameInputReset,
  } = useInput((value) => value.trim() !== "" && value.match(regName));

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameInputReset,
  } = useInput((value) => value.trim() !== "" && value.match(regName));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.match(mailformat));

  const {
    value: enteredPhoneNum,
    isValid: enteredPhoneNumIsValid,
    hasError: phoneNumInputHasError,
    valueChangeHandler: phoneNumChangedHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: phoneNumInputReset,
  } = useInput((value) => value.match(phoneno));

  const {
    value: enteredAge,
    isValid: enteredAgeIsValid,
    hasError: ageInputHasError,
    valueChangeHandler: ageChangedHandler,
    inputBlurHandler: ageBlurHandler,
    reset: ageInputReset,
  } = useInput((value) => value > 5 && value < 60);

  const {
    value: enteredGender,
    isValid: enteredGenderIsValid,
    hasError: genderInputHasError,
    valueChangeHandler: genderChangedHandler,
    inputBlurHandler: genderBlurHandler,
    reset: genderInputReset,
  } = useInput((value) => value);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => strongRegex.test(value));

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordInputReset,
  } = useInput((value) => value === enteredPassword);

  let formIsValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneNumIsValid &&
    enteredAgeIsValid &&
    enteredGenderIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }
  const dispatch = useDispatch();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    alert("Congratulations, you have been successfully sign up");

    if (
      !enteredFirstNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPhoneNumIsValid ||
      !enteredAgeIsValid ||
      !enteredGenderIsValid ||
      !enteredPasswordIsValid ||
      !enteredConfirmPasswordIsValid
    ) {
      return;
    }

    dispatch(
      signup({
        email: enteredEmail,
        password: enteredPassword,
      })
    );

    firstNameInputReset();
    lastNameInputReset();
    emailInputReset();
    phoneNumInputReset();
    ageInputReset();
    genderInputReset();
    passwordInputReset();
    confirmPasswordInputReset();
  };

  const firstNameInputClasses = firstNameInputHasError
    ? "input_field invalid"
    : "input_field ";
  const lastNameInputClasses = lastNameInputHasError
    ? "input_field invalid"
    : "input_field ";
  const emailInputClasses = emailInputHasError
    ? "input_field invalid"
    : "input_field ";

  const phoneNumInputClasses = phoneNumInputHasError
    ? "input_field invalid"
    : "input_field ";
  const ageInputClasses = ageInputHasError
    ? "input_field invalid"
    : "input_field ";
  const passwordInputClasses = passwordInputHasError
    ? "input_field invalid"
    : "input_field ";
  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? "input_field invalid"
    : "input_field ";

  return (
    <>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Sign Up</h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={formSubmitHandler}>
                <div className="row clearfix">
                  <div className="col_half">
                    <div className={firstNameInputClasses}>
                      <span>
                        <FontAwesomeIcon
                          icon={faUser}
                          aria-hidden="true"
                          className="icon"
                        ></FontAwesomeIcon>
                      </span>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={enteredFirstName}
                        onBlur={firstNameBlurHandler}
                        onChange={firstNameChangedHandler}
                      />
                    </div>
                    {firstNameInputHasError && <p>First Name Must Be Valid</p>}
                  </div>
                  <div className="col_half">
                    <div className={lastNameInputClasses}>
                      <span>
                        <FontAwesomeIcon
                          icon={faUser}
                          aria-hidden="true"
                          className="icon"
                        ></FontAwesomeIcon>
                      </span>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={enteredLastName}
                        onBlur={lastNameBlurHandler}
                        onChange={lastNameChangedHandler}
                      />
                    </div>
                    {lastNameInputHasError && <p>Last Name Must Be Valid</p>}
                  </div>
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

                <div className={phoneNumInputClasses}>
                  <span>
                    <FontAwesomeIcon
                      icon={faPhone}
                      aria-hidden="true"
                      className="icon"
                    ></FontAwesomeIcon>
                  </span>
                  <input
                    type="Number"
                    placeholder="1234567890"
                    value={enteredPhoneNum}
                    onBlur={phoneNumBlurHandler}
                    onChange={phoneNumChangedHandler}
                  />
                </div>
                {phoneNumInputHasError && <p>Mobile Number Must Be Valid</p>}

                <div className={ageInputClasses}>
                  <span>
                    <FontAwesomeIcon
                      icon={faChild}
                      aria-hidden="true"
                      className="icon"
                    ></FontAwesomeIcon>
                  </span>
                  <input
                    type="number"
                    placeholder="Age"
                    value={enteredAge}
                    onBlur={ageBlurHandler}
                    onChange={ageChangedHandler}
                  />
                </div>
                {ageInputHasError && <p>Age Must Be Between 5 or 60 </p>}

                <div className="input_field  radio_option">
                  <input
                    type="radio"
                    name="radiogroup1"
                    id="rd1"
                    value="male"
                    onBlur={genderBlurHandler}
                    onChange={genderChangedHandler}
                  />
                  <label htmlFor="rd1">Male</label>
                  <input
                    type="radio"
                    name="radiogroup1"
                    id="rd2"
                    value="female"
                    onBlur={genderBlurHandler}
                    onChange={genderChangedHandler}
                  />
                  <label htmlFor="rd2">Female</label>
                </div>
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
                {passwordInputHasError && (
                  <p>
                    Password must be eight characters or longer. <br />
                    Password must be combination of [a-z][A-Z][0-9][!@#$%^&*]
                  </p>
                )}
                <div className={confirmPasswordInputClasses}>
                  <span>
                    <FontAwesomeIcon
                      icon={faLock}
                      aria-hidden="true"
                      className="icon"
                    ></FontAwesomeIcon>
                  </span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={enteredConfirmPassword}
                    onBlur={confirmPasswordBlurHandler}
                    onChange={confirmPasswordChangedHandler}
                  />
                </div>
                {confirmPasswordInputHasError && (
                  <p>Password and Confirm password must be same</p>
                )}

                <button className="btn" disabled={!formIsValid}>
                  <Link
                    onClick={popup}
                    style={{
                      pointerEvents: !formIsValid ? "none" : "",
                    }}
                    to="/"
                  >
                    Sign up
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
        <p className="credit">
          Already have an account? <Link to="/">Login Now</Link>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
