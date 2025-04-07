import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import app from '../Firebase/firebase.config';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google login successful:', user);
      
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Successfully logged in with Google',
        icon: 'success',
        confirmButtonText: 'Great!'
      });

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let userCredential;
      if (isLogin) {
        // Sign in
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      console.log(`${isLogin ? 'Login' : 'Signup'} successful:`, user);

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        photoURL: user.photoURL
      }));

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: `Successfully ${isLogin ? 'logged in' : 'signed up'}`,
        icon: 'success',
        confirmButtonText: 'Great!'
      });

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Signup'} error:`, error);
      setError(error.message);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        
        <form className='mt-8 space-y-6' onSubmit={handleEmailPasswordAuth}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-gray-50 text-gray-500'>Or continue with</span>
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={handleGoogleLogin}
              className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
            >
              <img
                className='h-5 w-5 mr-2'
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                alt='Google logo'
              />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className='text-center'>
          <button
            className='text-sm text-blue hover:text-blue-700'
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
