'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import './login.css';
import axios from 'axios';
import Image from 'next/image';
import Frame from '../imges/Frame.webp'; // Ensure your image path is correct

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

export default function Login() {

  const handleSubmit = async (values: { email: string; password: string }, { resetForm }: { resetForm: () => void }) => {
    try {
      const formData = new FormData();
      formData.append('Email', values.email);
      formData.append('Password', values.password);
      
      const response = await axios.post('http://localhost:5049/Api/Authentication/SignIn', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data.succeeded) {
        const token = response.data.data; 

        localStorage.setItem('accessToken', token);
        console.log(token);
        
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userData = {
          userName: decodedToken.UserName,
          email: decodedToken.Email,
        };
        localStorage.setItem('userData', JSON.stringify(userData)); 

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successful Login',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
        window.location.href = '/'; 

        });

        resetForm();
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Error notification with SweetAlert
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login Failed',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex items-center gap-48 justify-center p-7 mt-5">
      {/* Login Form */}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="text-center">
            <h2 className="text-2xl font-bold">
              <span className="text-secondcolor">Log In</span>
            </h2>

            {/* Email Field */}
            <Field type="email" name="email" placeholder="Email Address" />
            <ErrorMessage name="email" component="div" className="text-red-500" />

            {/* Password Field */}
            <Field type="password" name="password" placeholder="Ex: omarResd12@" />
            <ErrorMessage name="password" component="div" className="text-red-500" />

            {/* Submit Button */}
            <div>
              <button className="bg-secondcolor text-white p-2 rounded-md border-none" type="submit">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Image next to the login form */}
      <div>
        <Image src={Frame} width={700} height={700} alt="Frame" loading="lazy" />
      </div>
    </div>
  );
}
