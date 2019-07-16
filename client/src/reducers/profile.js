import { 
    GET_PROFILE, 
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
            return {
                ...state,
                profile: payload,
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
