import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputField from 'custom-fields/InputField';

AddTodoForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

AddTodoForm.defaultProps = {
    initialValues: {
        title: '',
        description: '',
        status: 'Active',
    },
}

function AddTodoForm(props) {
    const { initialValues, onSubmit } = props;

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required(''),
    });

    return (
        <div className="add-todo">
             <Formik 
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {
                    formikProps => {

                        return (
                            <Form >
                                <FastField 
                                    name="title"
                                    component={InputField}

                                    placeholder="Add task to inbox, press Enter to save."
                                />
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}

export default AddTodoForm;