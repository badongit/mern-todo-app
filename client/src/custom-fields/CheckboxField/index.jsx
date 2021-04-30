import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  disabled: PropTypes.bool,
  label: PropTypes.string,
  checkboxValues: PropTypes.array,
};

InputField.defaultProps = {
  disabled: false,
  label: "",
  checkboxValues: [],
};

function InputField(props) {
  const { field, form, label, disabled, checkboxValues } = props;
  const { name, value, onBlur } = field;

  const handleChange = e => {
      const checked = e.target.checked;
      const value = checked ? checkboxValues[1] : checkboxValues[0];
      
      form.setFieldValue(name, value);
      form.submitForm();
  }

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        name={name}
        id={name}
        type="checkbox"
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
        checked={value === 'Completed'}
      />
    </FormGroup>
  );
}

export default InputField;
