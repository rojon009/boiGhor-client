import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from 'react-router';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle } from "../../firebase/firebase";
// import './Login.css';


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [errMsg, setErrMsg] = useState('');

    // Using previous state to redirect
    const location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: '/' } }

    const [signUp, setSignUp] = useState(false);

    const { register, handleSubmit, watch, errors } = useForm();

    // On form submit
    const onSubmit = ({ name, email, password }) => {
        if (signUp) {
            createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: name
                    })
                    return res.user;
                })
                .then((user) => {
                    const newUser = { ...user, newName: name };
                    console.log(newUser);
                    setLoggedInUser({ displayName: name })
                })
                .catch(err => setErrMsg(err.message))
        } else {
            signInWithEmailAndPassword(email, password)
                .then(user => {
                    setLoggedInUser(user);
                    history.replace(from);
                })
                .catch(err => setErrMsg(err.message))
        }
    };

    // On Sign In google button clicked
    const loginInWithGoogle = () => {
        signInWithGoogle()
            .then(res => res.user)
            .then(user => {
                setLoggedInUser(user);
                history.replace(from);
            })
            .catch(err => setErrMsg(err.message))
    }

    // Email Validation Regex
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    return loggedInUser ? <Redirect to={from} /> : (
        <div className="container">
            <div className="row">

            <div className="col-md-9 col-lg-7 mx-auto">
                <h1>{signUp ? 'Create an Account' : 'Log In'}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        signUp && (
                            <>
                                <label for="name" className="form-label">Name</label>
                                <input className="form-control" id="name" name="name" type="text" placeholder="Name" ref={register({ required: true, minLength: 3 })} />
                                {errors.name && errors.name.type === 'required' && <span className="form-text text-danger">This field is required</span>}
                                {errors.name && errors.name.type === 'minLength' && <span className="form-text text-danger">User name require at least 3 character.</span>}
                            </>
                        )
                    }
                    <br />
                    <label for="email" className="form-label">Email</label>
                    <input className="form-control" id="email" name="email" type="email" placeholder="Email" ref={register({ required: true, pattern: { value: regex, message: 'Email is not Valid.' } })} />
                    {errors.email && errors.email.type === 'required' && <span className="form-text text-danger">This field is required</span>}
                    {errors.email?.message && <span className="form-text text-danger">{errors.email?.message}</span>}

                    <br />
                    <label for="password" className="form-label">Password</label>
                    <input className="form-control" id="password" name="password" type="password" placeholder="Password" ref={register({ required: true, minLength: 6 })} />
                    {errors.password && errors.password.type === 'required' && <span className="form-text text-danger">This field is required</span>}
                    {errors.password && errors.password.type === 'minLength' && <span className="form-text text-danger">Password must be at least 6 character</span>}
                    {
                        signUp && (
                            <>
                                <br />
                                <label for="confirm_password" className="form-label">Confirm Password</label>
                                <input className="form-control" id="confirm_password" name="confirm_password" type="password" placeholder="Confirm Password" ref={register({
                                    required: true, validate: {
                                        confirm: value => value === watch('password')
                                    }
                                })} />
                                {errors.confirm_password && errors.confirm_password.type === 'required' && <span className="error">This field is required</span>}
                                {errors.confirm_password && errors.confirm_password.type === 'confirm' && <span className="error">Password does not match</span>}
                            </>
                        )
                    }
                    <br />
                    <input className="btn btn-success px-5" type="submit" value={signUp ? 'Sign Up' : 'Login'} />
                    <br />
                    {
                        errMsg && <span className="form-text text-danger">{errMsg}</span>
                    }
                </form>
                <p className="pt-4">Already have an Account? <button className="btn btn-link" onClick={() => setSignUp(!signUp)}>{signUp ? 'Login' : 'Sign Up'}</button></p>
            </div>
            <div className="text-center pb-5">
                <h1>or</h1>
                <button onClick={loginInWithGoogle} className="btn btn-primary rounded-pill px-5"><img style={{width: '30px', height: '30px'}} src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="google" /> Sign In With Google</button>
            </div>
            </div>
        </div>
    );
}

export default Login;