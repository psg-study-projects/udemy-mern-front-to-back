// racfp (arrow function w/ prop types)
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';
import { connect }  from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
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
    }, [getProfileById, match.params.id]); // need to add as dependency to get rid of warning

    return <Fragment> 
        {profile === null || loading ? (
            <Spinner /> 
        ) : (
            <Fragment>
                <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
                {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id 
                        && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                            <Fragment>
                                {profile.experience.map(experience => (
                                    <ProfileExperience key={experience._id} experience={experience} />
                                ))}
                            </Fragment>
                        ) : (
                            <h4>No experience credientials</h4>
                        )}
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? (
                            <Fragment>
                                {profile.education.map(education => (
                                    <ProfileEducation key={education._id} education={education} />
                                ))}
                            </Fragment>
                        ) : (
                            <h4>No education credientials</h4>
                        )}
                    </div>

                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername} />
                    )}
                </div>
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
