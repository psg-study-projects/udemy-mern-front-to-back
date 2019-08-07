import axios from 'axios';
import { setAlert } from './alert'; 

import { 
    GET_PROFILE, 
    GET_PROFILES, 
    GET_REPOS, 
    UPDATE_PROFILE, 
    CLEAR_PROFILE, 
    ACCOUNT_DELETED, 
    PROFILE_ERROR
} from '../actions/types';

// Get Current User's Profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get User's Profile by *user* ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get User's GitHub Repos by (github) username
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE }); // prevent flicker of past user's profile
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update a profile
// history: so we can redirect after form submit (.push)
// edit: create vs update (?)
export const createProfile = (
    formData, 
    history, 
    edit=false
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // make request to api.profile
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch( setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success') );

        // redirecting in an action: use history object (vs component)
        if (!edit) {
            history.push('/dashboard'); // redirect
        }

    } catch (err) {
        // Validation errors (?)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // %NOTE!
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch( setAlert('Experience Added', 'success') );

        history.push('/dashboard');

    } catch(err) {
        // Validation errors (?)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // %NOTE!
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch( setAlert('Education Added', 'success') );

        history.push('/dashboard');

    } catch(err) {
        // Validation errors (?)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // %NOTE!
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`); // %NOTE backticks for interpolation

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch( setAlert('Experience Removed', 'success') );

    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`); // %NOTE backticks for interpolation

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch( setAlert('Education Removed', 'success') );

    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete account & profile
export const deleteAccount = id => async dispatch => {
    if ( window.confirm('Are you sure?')) {
        try {
            const res = await axios.delete(`/api/profile/`);

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch( setAlert('Account Deleted') );

        } catch(err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }

}
