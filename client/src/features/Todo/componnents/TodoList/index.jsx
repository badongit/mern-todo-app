import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoForm from '../TodoForm';
import { useHistory, useRouteMatch } from 'react-router-dom';
import './TodoList.scss';
import { useSelector } from 'react-redux';

TodoList.propTypes = {
    status: PropTypes.string,
    posts: PropTypes.array,
};

TodoList.defaultProps = {
    status: 'Active',
    posts: [],
}

function TodoList(props) {
    const { status, posts } = props;

    const { selectedPost } = useSelector(state => state.posts);

    const [showList, setShowList] = useState(true);
    const history = useHistory();
    const match = useRouteMatch();

    const selectedId = selectedPost ? selectedPost._id : '';

    const handleClickTodoForm = (post) => {
        history.push(`${match.url}/${post._id}`)
    }

    return (
        <div className="list">
            <div className="list__header" onClick={() => setShowList(!showList)}>
                <div className="icon" style={{transform: showList ? 'rotate(90deg)' : '',}}><i className="fas fa-angle-right"></i></div>{ status }
            </div>
            {
                showList && (
                    <div className="list__todo container-fluid">
                        {
                            posts.map( (post) => (
                                <TodoForm 
                                    key={post._id} 
                                    post={post} 
                                    onClick={handleClickTodoForm} 
                                    formSelected={post._id === selectedId}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default TodoList;