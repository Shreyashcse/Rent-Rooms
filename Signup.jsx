import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required')
        .matches(/[0-9]/, 'Number is required')
        .matches(/[a-z]/, 'Lowercase letter is required')
        .matches(/[A-Z]/, 'Uppercase letter is required'),
        // .matches(/[^\w]/, 'Special character is required'),
    confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
});

const Signup = () => {

    const navigate = useNavigate();

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm: ''
        },
        onSubmit: async (values, { resetForm }) => {
            // alert(JSON.stringify(values));
            console.log(values);

            // send request to backend/REST API
            const response = await fetch('http://localhost:5000/user/add', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.status);
            console.log(response.statusText);

            if (response.status === 200) {
                enqueueSnackbar('Registered Successfully', { variant: 'success' });
            } else {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }

            navigate('/login');

            // resetForm();
            // toast.success('Form Submitted Successfully');
        },
        validationSchema: SignupSchema
    });



    return (
        <div className='signup-bg'>
            <div className="container">

                <div className="row align-items-center vh-100 gx-5">
                    
                    <div className="col-md-5 py-5">
                        <div className="card shadow">
                            <div className="card-body p-5">
                                <h3 className='my-3 text-center'>Rentable Rooms</h3>
                                <h5 className='text-center text-muted'>Signup Form</h5>

                                <form onSubmit={signupForm.handleSubmit}>

                                    <label htmlFor="name">Name</label>
                                    <span className='text-danger ms-3'>{signupForm.touched.name && signupForm.errors.name}</span>
                                    <input type="text" id='name' onChange={signupForm.handleChange} value={signupForm.values.name} className='form-control mb-4' />

                                    <label htmlFor="email">Email Address</label>
                                    <span className='text-danger ms-3'>{signupForm.touched.email && signupForm.errors.email}</span>
                                    <input type="text" id='email' onChange={signupForm.handleChange} value={signupForm.values.email} className='form-control mb-4' />

                                    <label htmlFor="password">Password</label>
                                    <span className='text-danger ms-3'>{signupForm.touched.password && signupForm.errors.password}</span>
                                    <input type="password" id='password' onChange={signupForm.handleChange} value={signupForm.values.password} className='form-control mb-4' />

                                    <label htmlFor="confirm">Confirm Password</label>
                                    <span className='text-danger ms-3'>{signupForm.touched.confirm && signupForm.errors.confirm}</span>
                                    <input type="password" id='confirm' onChange={signupForm.handleChange} value={signupForm.values.confirm} className='form-control mb-4' />


                                    <button type='submit' className='btn btn-primary w-100 my-4'>Submit</button>

                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h1 className='display-1 fw-bold text-white'>Bring your Ideas to Reality with Us</h1>
                        <p className='fs-5 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quas cum quaerat voluptatum delectus tenetur facilis maiores, esse deleniti ad nulla voluptates similique vero eius eaque! Molestiae molestias nulla natus quam minima veniam aliquam ab officia perferendis animi adipisci, alias quae veritatis repudiandae rerum aut minus distinctio, deserunt sapiente provident?</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signup;