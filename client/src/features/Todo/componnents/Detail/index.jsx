import React, { useEffect } from 'react';
import './Detail.scss';
import { useDispatch, useSelector } from 'react-redux';
import DetailForm from '../DetailForm';
import { useParams } from 'react-router';
import { loadSelectedPost } from 'features/Todo/todoSlice';

function Detail() {
    const posts = useSelector(state => state.posts);
    const { selectedPost } = posts;
    const { postId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadDetailPost = async (postId) => {
            await dispatch(loadSelectedPost(postId));
        };

        if(postId) {
            loadDetailPost(postId);
        }
    }, [dispatch, postId]);


    let body;

    if(!selectedPost) {
        body = (
            <h2>Click a task title to view its detail</h2>
        )
    } else {
        body = (
            <DetailForm 
                post={selectedPost}
            />
        )
    }
    return (
        <div className="detail">
            {body}
        </div>
    );
}

export default Detail;