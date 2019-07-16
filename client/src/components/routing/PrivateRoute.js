import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Ch 44
const PrivateRoute = ({ 
    component: Component, 
    auth: { isAuthenticated, loading }, 
    ...rest 
})  => (
    <Route 
        {...rest} 
        // Add in a render prop where we check if user is not logged in...if they are load Component
        render={props => 
                !isAuthenticated && !loading ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(PrivateRoute);
