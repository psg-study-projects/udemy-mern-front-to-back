// racfp (arrow function w/ prop types)
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';
import { connect }  from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById }  from '../../actions/profile';

const Profile = ({ 
    getProfileById,
    profile: { profile, loading },
    auth, 
    match
}) => {

    // As soon as this runs, we want to run get profiles...
    useEffect(() => {
        getProfileById(match.params.id); // get ID from URL
    }, [getProfileById]); // need to add as dependency to get rid of warning

    return <Fragment> 
        {profile === null || loading ? (
            <Spinner /> 
        ) : (
            <Fragment>
                <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
                {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id 
                        && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
            </Fragment>
        )}
        </Fragment>;
}

Profile.propTypes = {
    getProfileById:  PropTypes.func.isRequired,
    profile:  PropTypes.object.isRequired,
    auth:  PropTypes.object.isRequired
}

// so...anything in state/reducer, we'll be able to get in this component
const mapStateToProps = state => ({
    profile: state.profile, // profile state
    auth: state.auth        // auth state -- to display edit profile if viewing owned profile 
});


export default connect(
    mapStateToProps, 
    { getProfileById } 
)(Profile);
