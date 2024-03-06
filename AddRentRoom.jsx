import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// const AddRentSchema = Yup.object().shape({
//     name: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().min(5, 'Too Short!').required('Required')
//         .matches(/[0-9]/, 'Number is required')
//         .matches(/[a-z]/, 'Lowercase letter is required')
//         .matches(/[A-Z]/, 'Uppercase letter is required'),
//         // .matches(/[^\w]/, 'Special character is required'),
//     confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
// });

const AddRentRoom = () => {

    const navigate = useNavigate();

    const addRentForm = useFormik({
        initialValues: {
            name: '',
            type: '',
            facilities: '',
            address: '',
            rent: '',
            security: '',
            contact: '',
            image: ''
        },
        onSubmit: async (values, { resetForm }) => {
            // alert(JSON.stringify(values));
            console.log(values);

            // send request to backend/REST API
            const response = await fetch('http://localhost:5000/rent/add', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.status);
            console.log(response.statusText);

            if (response.status === 200) {
                enqueueSnackbar('Room Added Successfully', { variant: 'success' });
            } else {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }

            // navigate('/login');

            // resetForm();
            // toast.success('Form Submitted Successfully');
        },
        // validationSchema: AddRentSchema
    });



    return (
        <div className='addRent-bg'>
            <div className="container-fluid">

                <div className="row align-items-center gx-5">
                <div className="col-md-6">
                        <h1 className='display-1 fw-bold text-white text-center px-9 m-auto'>Bring your Ideas to Reality with Us</h1>
                        <p className='fs-5 text-white text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quas cum quaerat voluptatum delectus tenetur facilis maiores, esse deleniti ad nulla voluptates similique vero eius eaque! Molestiae molestias nulla natus quam minima veniam aliquam ab officia perferendis animi adipisci, alias quae veritatis repudiandae rerum aut minus distinctio, deserunt sapiente provident?</p>
                    </div>
                    <div className="col-md-6 mx-auto py-5">
                        <div className="card shadow">
                            <div className="card-body p-5">
                                <h3 className='text-center mb-5'>Add New Rent Property</h3>

                                <form onSubmit={addRentForm.handleSubmit} >

                                    <label htmlFor="name">Name</label>
                                    {/* <span className='text-danger ms-3'>{addRentForm.touched.name && addRentForm.errors.name}</span> */}
                                    <input type="text" id='name' onChange={addRentForm.handleChange} value={addRentForm.values.name} className='form-control mb-4' />
                                    
                                    <label htmlFor="image">Image Url</label>
                                    {/* <span className='text-danger ms-3'>{addRentForm.touched.name && addRentForm.errors.name}</span> */}
                                    <input type="text" id='image' onChange={addRentForm.handleChange} value={addRentForm.values.image} className='form-control mb-4' />

                                    <label htmlFor="facilities">Facilities</label>
                                    {/* <span className='text-danger ms-3'>{addRentForm.touched.email && addRentForm.errors.email}</span> */}
                                    <textarea type="text" id='facilities' onChange={addRentForm.handleChange} value={addRentForm.values.facilities} className='form-control mb-4' rows={4} ></textarea>

                                    <label htmlFor="address">Address</label>
                                    {/* <span className='text-danger ms-3'>{addRentForm.touched.password && addRentForm.errors.password}</span> */}
                                    <textarea type="text" id='address' onChange={addRentForm.handleChange} value={addRentForm.values.address} className='form-control mb-4' rows={4} ></textarea>


                                    <div className="row">
                                        <div className="col-md-6">

                                            <label htmlFor="rent">Monthly Rent</label>
                                            {/* <span className='text-danger ms-3'>{addRentForm.touched.password && addRentForm.errors.password}</span> */}
                                            <input type="number" id='rent' onChange={addRentForm.handleChange} value={addRentForm.values.rent} className='form-control mb-4' rows={4} />
                                        </div>
                                        <div className="col-md-6">

                                            <label htmlFor="security">Security Amount</label>
                                            {/* <span className='text-danger ms-3'>{addRentForm.touched.password && addRentForm.errors.password}</span> */}
                                            <input type="number" id='security' onChange={addRentForm.handleChange} value={addRentForm.values.security} className='form-control mb-4' rows={4} />
                                        </div>
                                    </div>
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

export default AddRentRoom;