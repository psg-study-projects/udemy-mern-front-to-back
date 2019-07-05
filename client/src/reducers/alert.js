import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = []; // array of objects


export default function(state=initialState, action) {

    const { type, payload } = action;

    // action contains (1) type (required), (2) payload (data)
    switch (type) {
        case SET_ALERT:
            // state is immutable, so you have to include all state
            // updates *all* state, then 'render' (components) happens (?)
            //  with updated state (via props)
            return [...state, payload];
        case REMOVE_ALERT:
            // remove an alert by ID
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}
