import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';

import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAppContext from '../AppContext';

const LoginSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

const Login = () => {

    const navigate = useNavigate();
    const { setloggedIn } = useAppContext();




    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        onSubmit: async (values, { resetForm }) => {
            // alert(JSON.stringify(values));
            console.log(values);

            // send request to backend/REST API
            const response = await fetch('http://localhost:5000/user/authenticate', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.status);
            console.log(response.statusText);

            if (response.status === 200) {
                enqueueSnackbar('Loggedin Successfully', { variant: 'success' });

                const data = await response.json();
                console.log(data);

                // to save user data in session that is it works on our frontend

                // sessionStorage is an API and it is inbuilt and predefined
                // first we use set data nad then we use get data

                sessionStorage.setItem('user', JSON.stringify(data));
                setloggedIn(true);
                navigate('/addrentroom');
            } else if (response.status === 401) {
                enqueueSnackbar('Email or Password is incorrect', { variant: 'error' });
            } else {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }

            // resetForm();
            // toast.success('Form Submitted Successfully');
        },
        validationSchema: LoginSchema
    });



    return (
        <div className='login-bg'>
            <div className="container">

                <div className="row align-items-center vh-100 gx-5">
                    <div className="col-md-7">
                        <h1 className='display-1 fw-bold text-white'>Bring your Ideas to Reality with Us</h1>
                        <p className='fs-5 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quas cum quaerat voluptatum delectus tenetur facilis maiores, esse deleniti ad nulla voluptates similique vero eius eaque! Molestiae molestias nulla natus quam minima veniam aliquam ab officia perferendis animi adipisci, alias quae veritatis repudiandae rerum aut minus distinctio, deserunt sapiente provident?</p>
                    </div>
                    <div className="col-md-5 py-5">
                        <div className="card shadow">
                            <div className="card-body p-5">
                                <h3 className='my-3 text-center fw-bold'>Brand Logo</h3>
                                <h5 className='text-center text-muted fs-10'>Login Form</h5>

                                <form onSubmit={loginForm.handleSubmit} >

                                    <label htmlFor="email">Email Address</label>
                                    <span className='text-danger ms-3'>{loginForm.touched.email && loginForm.errors.email}</span>
                                    <input type="text" id='email' onChange={loginForm.handleChange} value={loginForm.values.email} className='form-control mb-4' />

                                    <label htmlFor="password">Password</label>
                                    <span className='text-danger ms-3'>{loginForm.touched.password && loginForm.errors.password}</span>
                                    <input type="password" id='password' onChange={loginForm.handleChange} value={loginForm.values.password} className='form-control mb-4' />

                                    <button type='submit' className='btn btn-primary w-100 my-4'>Submit</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login;