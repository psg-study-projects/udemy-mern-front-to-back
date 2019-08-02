import React, { Fragment, useEffect } from 'react';
import { Link}  from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect}  from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile}  from '../../actions/profile';

// racfp (arrow function w/ prop types)
const Dashboard = ({ 
    getCurrentProfile, 
    auth : { user }, 
    profile: { profile, loading } 
}) => {

    // because we are using 'hooks'...
    useEffect( () => {
        getCurrentProfile();
    }, []);

    return (loading && profile===null) ? <Spinner /> : <Fragment> 
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>Welcome { user && user.name }
        </p>
        { profile !== null ? 
                <Fragment>
                    has
                </Fragment> 
                : 
                <Fragment>
                    <p>You have not yet setup a profile, please add info</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment> 
        }
        </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired, // ptfr
    auth:  PropTypes.object.isRequired, // ptor
    profile:  PropTypes.object.isRequired

}

// so...anything in state/reducer, we'll be able to get in this component
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});


export default connect(
    mapStateToProps, 
    { getCurrentProfile } 
)(Dashboard);
