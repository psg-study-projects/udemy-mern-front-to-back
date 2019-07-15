import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

// action: action that is dispatched
export default function(state=initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload // name, email, avatar, but not password
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // we get token back, login user right away
            // payload is an object
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload, // %TODO %STUDYME
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}
