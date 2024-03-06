import { Formik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const UpdateUser = () => {
  const { id } = useParams();

  const [roomData, setroomData] = useState(null);


  const getRoomData = async () => {
    const res = await fetch('http://localhost:5000/user/getbyid/' + id);
    console.log(res.status);
    const data = await res.json();
    console.log(data);

    setuserData(data);

  }

  useEffect(() => {
    getRoomData();

  }, [])

  const submitForm = async (values, { resetForm }) => {
    // alert(JSON.stringify(values));
    console.log(values);


    // send request to backend/REST API
    const response = await fetch('http://localhost:5000/user/update/'+id, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'

      }

    });

    console.log(response.status);
    console.log(response.statusText);

    if (response.status === 200) {

      enqueueSnackbar('Registered Successfully', { variant: 'success' });
    }
    else {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }

    // resetForm();
    // toast.success('Form Submitted Successfully');

  }


  return (
    <div>
      <div className='container py-5'>
        <div className="card">
          <div className="card-body p-5">
            <h3 className='my-3 text-center'>Brand Logo</h3>
            <h5 className='text-center text-muted'>Signup Form</h5>
            {
              roomData!== null ? (
                <Formik initialValues={roomData} onSubmit={submitForm} >
                  {({ values, handleChange, handleSubmit, errors, touched }) => {
                    return <form onSubmit={handleSubmit}>

                      <label htmlFor="name">Name</label>
                      <span className='text-danger ms-3'>{touched.name && errors.name}</span>
                      <input type="text" id='name' onChange={handleChange} value={values.name} className='form-control mb-4' />

                      <label htmlFor="email">Email Address</label>
                      <span className='text-danger ms-3'>{touched.email && errors.email}</span>
                      <input type="text" id='email' onChange={handleChange} value={values.email} className='form-control mb-4' />

                      <label htmlFor="password">Password</label>
                      <span className='text-danger ms-3'>{touched.password && errors.password}</span>
                      <input type="password" id='password' onChange={handleChange} value={values.password} className='form-control mb-4' />

                      <label htmlFor="location">Location</label>
                      <span className='text-danger ms-3'>{touched.location && errors.location}</span>
                      <input type="type" id='location' onChange={handleChange} value={values.location} className='form-control mb-4' />



                      <button type='submit' className='btn btn-primary w-100 my-4'>Submit</button>

                    </form>
                  }}
                </Formik>

              ) : (<h1 className='my-5 text-center text-muted'>Loading Room Data...</h1>)
            }




          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateRoom;