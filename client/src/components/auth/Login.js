import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData; // destruct

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log('Calling login() from Auth comp...'+email);
        login(email, password);
    }

    // Redirect if logged in
    if (isAuthenticated) {
        // react-router
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}> 
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={e => onChange(e)}
                        name="email" 
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

// mapStateToProps: Bring in auth state for redirect (has isAuthenticated)
// ~ alert code
const mapStateToProps = state => ({
    //auth: state.auth // will give us everything (see initState in reducer)
    isAuthenticated: state.auth.isAuthenticated // we just need isAutheniticated
});

export default connect(
    mapStateToProps, 
    { login }
)(Login);
