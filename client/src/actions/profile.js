import axios from 'axios';
import { setAlert } from './alert'; 

import { 
    GET_PROFILE, 
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
