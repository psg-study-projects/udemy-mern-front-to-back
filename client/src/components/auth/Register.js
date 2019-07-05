import React, { Fragment, useState } from 'react';

const Register = () => {

    // "Hooks":
    //      state is formData object
    //      setFormData is function used to update state
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        password2:''
    }); // 'use state hook'

    const { name, email, password, password2 } = formData; // destruct

    // in formData, we only want to change the name (or one field), so we need to make a copy of     using the spread operator
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if ( password !== password2 ) {
            console.log('Passwords must match');
        } else {
            console.log(formData);
        }
    }

    return (
        <Fragment>
            <div>Register</div>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}> 
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name}
                        onChange={e => onChange(e)} // separate on change function, instead of calling setFormData directly
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={e => onChange(e)}
                        name="email" 
                        required 
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    );
};

export default Register;
