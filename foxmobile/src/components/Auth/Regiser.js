import React from 'react';
import { registerWithEmail } from '../../services/auth';
import SocialAuthButtons from './SocialAuthButtons';
import { Formik, Field, ErrorMessage } from 'formik';

const Register = () => {
  const onSubmit = (values) => {
    // Handle form submission (register with email)
    registerWithEmail(values);
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
      >
        <form>
          {/* Email input */}
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" />

          {/* Password input */}
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="span" />

          {/* Other registration fields */}
          {/* ... */}

          {/* Submit button */}
          <button type="submit">Register with Email</button>
        </form>
      </Formik>

      {/* Social sign-up buttons */}
      <SocialAuthButtons />
    </div>
  );
};

export default Register;
