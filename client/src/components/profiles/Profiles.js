// racfp (arrow function w/ prop types)
import React, { Fragment, useEffect } from 'react'; /* useEffect: call get Profiles action from  ...*/
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { getProfiles }  from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ 
    getProfiles,
    profile: { profiles, loading } 
}) => {

    // As soon as this runs, we want to run get profiles...
    useEffect(() => {
        getProfiles();
    }, []);

    return <Fragment> 
        { loading ? 
                <Spinner /> 
                : 
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead"><i className="fab fa-connectdevelop"></i> Browse and connect with developers</p>
                    <div className="profiles">
                        {profiles.length > 0 
                                ? ( profiles.map(profile => (<ProfileItem key={profile._Id} profile={profile} />)) ) 
                                : <h4>No profiles found...</h4>}
                    </div>
                </Fragment> }
        </Fragment>;
}

Profiles.propTypes = {
    getProfiles:  PropTypes.func.isRequired,
    profile:  PropTypes.object.isRequired

}

// so...anything in state/reducer, we'll be able to get in this component
const mapStateToProps = state => ({
    profile: state.profile /* profile state */
});


export default connect(
    mapStateToProps, 
    { getProfiles } 
)(Profiles);
