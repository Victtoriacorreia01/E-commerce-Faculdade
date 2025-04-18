import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService'; 
import { AiOutlineMail } from 'react-icons/ai'; 
import Logo from "../../../assets/logo.png";

const createUserFormSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
  name: z.string().min(1, 'Field required.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  passwordConfirmation: z.string().min(1, 'Confirm your password.'),
}).refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
  message: 'Passwords do not match. Try again.',
  path: ['passwordConfirmation'],
});

export default function RegisterPrinc() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setSuccess(false);
  
    try {
      await registerUser(data);
      setSuccess(true);
      reset(); 
      setLoading(false);
  
      setTimeout(() => {
        navigate('/login/login', { replace: true });
      }, 5000); 
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user. Try again.');
      setLoading(false);
    }
  };
  
  const onError = (errors) => console.log(errors);

  useEffect(() => {
    return () => reset();
  }, [reset]);
  
  return (
    <div className="mt-10 relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form autoComplete="off" className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input id="email" type="email" autoComplete="new-email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" {...register('email')} />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <input id="name" type="text" autoComplete="off" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" {...register('name')} />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div>
              <input id="password" type="password" autoComplete="new-password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" {...register('password')} />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div>
              <input id="passwordConfirmation" type="password" autoComplete="off" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" {...register('passwordConfirmation')} />
              {errors.passwordConfirmation && <span className="text-red-500 text-sm">{errors.passwordConfirmation.message}</span>}
            </div>
          </div>

          {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
          {success && <div className="text-green-500 text-center">Registration successful!</div>}

          <div>
            <button type="submit" disabled={isSubmitting || loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {loading ? 'Loading...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </a>
          </p>
        </div>
      </div>
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg text-center">
            <AiOutlineMail className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Successfully sent!</h3>
            <p className="text-gray-600 mt-2">Please check your email to confirm your registration.</p>
          </div>
        </div>
      )}
    </div>
  );
}
