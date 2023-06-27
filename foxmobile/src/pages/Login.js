import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Handle form submission (login logic)
    console.log(data); // Replace with your login logic
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email input */}
        <input
          type="email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>Email is required</span>}

        {/* Password input */}
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>Password is required</span>}

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
