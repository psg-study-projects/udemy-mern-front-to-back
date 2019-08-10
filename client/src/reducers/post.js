import { 
    GET_POSTS, 
    UPDATE_LIKES, 
    POST_ERROR
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function(state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                // make sure it's correct post that we're adding or removing the like to
                // ~ map through posts, for each post check if it's correct one , if it's a match return new state 
                //   with all the stuff in that post, manipulate likes to likes that are returned. Else
                ///  just return regular post (if not match)
                posts: state.posts.map(post => 
                    post._id===payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
            };
        default:
            return state;
    }
}
