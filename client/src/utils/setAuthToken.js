import axios from 'axios';

// adds global header to axios request
const setAuthToken = token => {
    if (token) {
        axios.default.headers.common['x-auth-token'] = token;
    } else {
        delete axios.default.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
