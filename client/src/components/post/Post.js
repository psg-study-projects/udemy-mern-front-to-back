// racfp (arrow function w/ prop types)
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import { Link }  from 'react-router-dom';
import { getPost }  from '../../actions/post';

const Post = ({ 
    getPost,
    post: { post, loading },
    match
}) => {

    // As soon as this runs, we want to run get profiles...
    useEffect(() => {
        getPost(match.params.id); // get ID from URL
    }, [getPost, match.params.id]);

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>
            Back to Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
    </Fragment>;
}

Post.propTypes = {
    getPost:  PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post // post state
});


export default connect(
    mapStateToProps, 
    { getPost } 
)(Post);
