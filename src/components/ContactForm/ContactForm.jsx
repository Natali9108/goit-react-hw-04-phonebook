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
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              className={errors.name && touched.name ? 'invalid' : 'null'}
            />
            <ErrorDescription component="div" name="name" />
          </Label>
          <Label htmlFor="number">
            Number
            <Input
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
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
