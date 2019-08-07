import { 
    GET_PROFILE, 
    GET_PROFILES, 
    GET_REPOS, 
    UPDATE_PROFILE, 
    CLEAR_PROFILE, 
    PROFILE_ERROR
} from '../actions/types';

const initialState = {
    profile: null, // holds profile data, logged in user or other user's page being visited
    profiles: [], // for profile listing page
    repos: [],
    loading: true, // once we make a request, set to false
    error: { } // store any request errors

}

export default function(state=initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
            // fill empty array w/ profiles from server
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
