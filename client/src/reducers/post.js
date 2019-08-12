import { 
    GET_POSTS, 
    GET_POST, 
    ADD_POST, 
    DELETE_POST, 
    ADD_COMMENT, 
    REMOVE_COMMENT, 
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
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts], // assign current array...with new post (at top)
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                // return all posts except for one we just deleted (??)
                posts: state.posts.filter(post => post._id!==payload),
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
        case ADD_COMMENT:
            // only need to edit single post part of it (on single post page), it's an object, we want whatever's in it currenlty, and then we want to replace comments with the payload
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: { 
                    ...state.post, 
                    // %TODO (???) bring in all comments in state & UI *except* the one we just deleted from the server
                    comments: state.post.comments.filter(comment => comment._id!==payload)
                },
                loading: false
            };
        default:
            return state;
    }
}
