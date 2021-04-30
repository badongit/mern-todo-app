import React from 'react';
import PropTypes from 'prop-types';
import './Main.scss';
import { Button } from 'reactstrap';
import AddTodoForm from '../AddTodoForm';
import TodoList from '../TodoList';

Main.propTypes = {
    onBarsClick: PropTypes.func,
    addTodoSubmit: PropTypes.func,
    posts: PropTypes.array,
    validationSchema: PropTypes.object,
};

Main.defaultProps = {
    onBarsClick: null,
    addTodoSubmit: null,
    posts: [],
    validationSchema: {},
}

function Main(props) {
    const { onBarsClick, addTodoSubmit, posts, validationSchema } = props;
    const postsActive = posts.filter( post => post.status === 'Active' );
    const postsCompleted = posts.filter( post => post.status === 'Completed' ); 

    return (
        <div className="main">
            <h2><Button color="link" onClick={onBarsClick}><i className="fas fa-bars" ></i></Button> Inbox</h2>
            <div className="main__add">
               <AddTodoForm onSubmit={addTodoSubmit}/>
            </div>

            {
                postsActive.length ? (
                    <TodoList posts={postsActive} status="Active" validationSchema={validationSchema}/>
                ) : null
            }
            {
                postsCompleted.length ? (
                    <TodoList posts={postsCompleted} status="Completed" validationSchema={validationSchema} />
                ) : null
            }

            { 
                !!postsActive.length || !!postsCompleted.length || (
                    <div className="note">Time to relax</div>
                )
            
            }
    
        </div>
    );
}

export default Main;
