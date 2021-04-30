import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  placeholder: "",
  disabled: false,
  label: "",
};

function InputField(props) {
  const { field, form, type, placeholder, label, disabled } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        name={name}
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        invalid={!!showError}
      />
      {showError && <FormFeedback >{errors[name]}</FormFeedback>}
    </FormGroup>
  );
}

export default InputField;
