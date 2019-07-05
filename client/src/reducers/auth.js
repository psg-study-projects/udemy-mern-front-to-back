import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL 
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
        case REGISTER_SUCCESS:
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
