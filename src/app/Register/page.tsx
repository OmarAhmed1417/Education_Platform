'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Frame from '../imges/Frame.webp'; // Ensure the path is correct
import './Register.css';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';

// Updated validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required(
            'Confirm password is required'
        ),
    country: Yup.string().required('Country is required'),
});

export default function Register() {









    const handleSubmit = async (
        values: { name: string; phone: string; username: string; email: string; password: string; confirmPassword: string }, 
        { resetForm }: { resetForm: () => void }
    ) => {
        try {
            const payload = {
                name: values.name,
                phoneNumber: values.phone,
                userName: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            };
    
            const response = await axios.post('http://localhost:5049/Api/UserApp/Create', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });
    
            console.log('Success:', response.data);
            
            resetForm();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your account has been created',
                showConfirmButton: false,
                timer: 1500
            });
    
        } catch (error) {
            console.error('Error creating account:', error);
    
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'An error occurred while creating your account',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };














    return (
        <div className={`flex items-center gap-48 justify-center p-7 mt-5`}>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    country: 'usa',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className='text-center'>
                        <h2 className='text-2xl font-bold'>
                            <span className="text-secondcolor">Create </span>
                            <span className='text-orangecolor'>Account </span>
                        </h2>
                        
                        <Field type='text' name='name' placeholder='Enter your Name' />
                        <ErrorMessage name='name' component='div' className='text-red-500  text-center font-semibold' />
                        
                        <Field type='text' name='phone' placeholder='Phone number' />
                        <ErrorMessage name='phone' component='div' className='text-red-500' />

                        <Field type='text' name='username' placeholder='Username' />
                        <ErrorMessage name='username' component='div' className='text-red-500' />
                        
                        <Field type='email' name='email' placeholder='Email Address' />
                        <ErrorMessage name='email' component='div' className='text-red-500' />

                        <Field type='password' name='password' placeholder='Password (Ex: omarResd12@)' />
                        <ErrorMessage name='password' component='div' className='text-red-500' />

                        <Field type='password' name='confirmPassword' placeholder='Confirm Password' />
                        <ErrorMessage name='confirmPassword' component='div' className='text-red-500' />

                        <div>
                            <button className='bg-secondcolor text-white p-2 rounded-md border-none' type='submit'>
                                Create Account
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div>
                <Image src={Frame} width={700} height={700} alt="Frame" loading="lazy" />
            </div>
        </div>
    );
}
