import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// %TODO %STUDY redux-thunk (?) middleware lets us do this w/ dispatch
export const setAlert = (msg, alertType, timeout=3000) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    }); // "dispatches" to the reducer (?)

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}
