import { useState, useEffect } from "react";

const useForm = (callback, formObj, validate = () => ({})) => {
  const [values, setValues] = useState(formObj);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event?.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    setIsSubmitting(false);
  }, [errors]);

  return { handleChange, handleSubmit, values, errors, setErrors, setValues };
};

export default useForm;
