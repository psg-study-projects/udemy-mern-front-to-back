import React, { Fragment, useEffect } from 'react'; /* useEffect: call get Profiles action from  ...*/
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { getPosts }  from '../../actions/post';
import Spinner from '../layout/Spinner';

const Posts = ({ 
    getPosts,
    post : {
        posts,
        loading
    }
}) => {

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return <div className="profile bg-light"> 
        </div>;
}

Posts.propTypes = {
    getPosts:  PropTypes.func.isRequired,
    post:  PropTypes.object.isRequired

}

// so...anything in state/reducer, we'll be able to get in this component
const mapStateToProps = state => ({
    post: state.post
});


export default connect(
    mapStateToProps, 
    { getPosts } 
)(Posts);
