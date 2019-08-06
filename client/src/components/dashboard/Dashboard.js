import React, { Fragment, useEffect } from 'react';
import { Link}  from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect}  from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount }  from '../../actions/profile';

// racfp (arrow function w/ prop types)
const Dashboard = ({ 
    getCurrentProfile, 
    deleteAccount, 
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
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={()=> deleteAccount()}>
                            <i className="fas fa-user-minus"></i>Delete My Account
                        </button>
                    </div>
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
    deleteAccount: PropTypes.func.isRequired, // ptfr
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
    { getCurrentProfile, deleteAccount } 
)(Dashboard);
