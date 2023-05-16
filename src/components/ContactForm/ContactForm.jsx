import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { validationSchema } from '../../utils';
import {
  PhonebookForm,
  Label,
  Input,
  ErrorDescription,
  AddBtn,
} from './ContactForm.styled';

const ContactForm = props => {
  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, actions) => {
    props.onSubmit(values);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty }) => (
        <PhonebookForm autoComplete="off">
          <Label htmlFor="name">
            Name
            <Input
              type="text"
              name="name"
              className={errors.name && touched.name ? 'invalid' : 'null'}
            />
            <ErrorDescription component="div" name="name" />
          </Label>
          <Label htmlFor="number">
            Number
            <Input
              type="tel"
              name="number"
              className={errors.number && touched.number ? 'invalid' : 'null'}
            />
            <ErrorDescription component="div" name="number" />
          </Label>

          <AddBtn type="submit" disabled={!isValid || !dirty}>
            Add contact
          </AddBtn>
        </PhonebookForm>
      )}
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
