import axios from 'axios';

// Set Auth Token in HTTP header (not local storage)
// adds global header to axios request
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
