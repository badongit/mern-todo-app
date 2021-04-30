import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import CheckboxField from 'custom-fields/CheckboxField';
import timeString from 'utils/timeString';
import './DetailForm.scss';
import InputField from 'custom-fields/InputField';
import { useDispatch } from 'react-redux';
import postApi from 'api/postApi';
import { updatePost, updateSelectedPost, removePost } from 'features/Todo/todoSlice';
import * as Yup from 'yup';

DetailForm.propTypes = {
    post: PropTypes.object,
};

DetailForm.defaultProps = {
    post: {},
}

function DetailForm(props) {
    const { post } = props;
    const dispatch = useDispatch();

    const initialValues = {
        ...post,
    };

    const checkboxValues = ['Active', 'Completed'];

    const validationSchema = Yup.object().shape({
        status: Yup.string().oneOf(['Active', 'Completed'], ''),
        title: Yup.string().required(''),
        description: Yup.string(),
    });

    const handleSubmit = async (values, actions) => {
        const postId = values._id;
        const postData = await postApi.update(postId, values);

        if(postData.success) {
            const action = updatePost(postData.post);
            dispatch(action);
        } else {
            actions.resetForm();
        }
        console.log(postData.message);
    }

    const removeTodo = async (postId) => {
        const postData = await postApi.delete(postId);

        if(postData.success) {
            dispatch(updateSelectedPost(null));
            dispatch(removePost(postData.post))
        }   
        console.log(postData.message);
    }

    return (
        <div className="detail-form">
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {
                    formikProps => {

                        return (
                            <Form >
                                <div className="detail-form__header d-flex container">
                                    <FastField 
                                        name="status"
                                        component={CheckboxField}

                                        checkboxValues={checkboxValues}
                                    />
                                    <div className="detail-form__header__time">
                                        {timeString(post.createdAt)}
                                    </div>
                                    <div className="detail-form__header__trash" onClick={() => removeTodo(post._id)}>
                                        <i className="fas fa-trash"></i>
                                    </div>
                                </div>
                                
                                <FastField 
                                    name="title"
                                    component={InputField}

                                    placeholder="What needs doing?"
                                />

                                <FastField 
                                    name="description"
                                    component={InputField}

                                    type="textarea"
                                    placeholder="Description"
                                />

                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}

export default DetailForm;