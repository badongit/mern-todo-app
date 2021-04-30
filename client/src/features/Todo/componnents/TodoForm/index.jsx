import postApi from 'api/postApi';
import CheckboxField from 'custom-fields/CheckboxField';
import InputField from 'custom-fields/InputField';
import { updatePost, updateSelectedPost } from 'features/Todo/todoSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import timeString from 'utils/timeString';
import * as Yup from 'yup';
import './TodoForm.scss';

TodoForm.propTypes = {
    post: PropTypes.object,
    onClick: PropTypes.func,
    formSelected: PropTypes.bool,
};

TodoForm.defaultProps = {
    post: {
        title: '',
        status: 'Active',
        createdAt: Date.now(),
    },
    onClick: null,
    formSelected: false,
}

function TodoForm(props) {
    const { post, onClick, formSelected } = props;
    const dispatch = useDispatch();
    const initialValues = {
        ...post
    }
    
    const validationSchema = Yup.object().shape({
        status: Yup.string().oneOf(['Active', 'Completed'], ''),
        title: Yup.string().required(''),
        description: Yup.string(),
    });

    const checkboxValues = ['Active', 'Completed'];

    const handleSubmit = async (values, actions) => {
        const postId = values._id;
        const postData = await postApi.update(postId, values);

        if(postData.success) {
            dispatch(updatePost(postData.post));
            dispatch(updateSelectedPost(postData.post));
        } else {
            actions.resetForm();
        }

        console.log(postData.message);
    }

    return (
        <div 
            className={`todo-form ${ formSelected ? 'formSelected' : ''}`}
            onClick={() => onClick(post)} 
        >
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    formikProps => {

                        return (
                            <Form >
                                <FastField 
                                    name="status"
                                    component={CheckboxField}

                                    checkboxValues={checkboxValues}
                                />
                                <FastField 
                                    name="title"
                                    component={InputField}
                                />
                                <p className="todo-form__time" >{timeString(post.createdAt)}</p>
                            </Form>
                        )
                    }
                }
            </Formik>
            { formSelected || <hr/>}
        </div>
    );
}

export default TodoForm;