import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';  // Import the context
import '../styles/Login.css';  // Import the login page CSS

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);  // Access the login function

  useEffect(() => {
    // Add the class for the login page when it's mounted
    document.body.classList.add('page-login');
    
    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('page-login');
    };
  }, []);

  const onSubmit = async (data) => {
    await login(data);  // Call the login function from the context
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src="src/styles/img/faz-drill-logo5.png" alt="Faz Drill Logo" width="250" height="200" />
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Start Session</p>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <button type="submit" className="btn btn-success btn-block">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
