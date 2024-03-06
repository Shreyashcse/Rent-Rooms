import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BrowseRentRooms = () => {

  const [rentArray, setRentArray] = useState([]);

  const getRentData = async () => {

    const res = await fetch('http://localhost:5000/rent/getall');
    console.log(res.status);

    const data = await res.json();
    console.table(data);

    setRentArray(data);
  }

  useEffect(() => {
    getRentData();
  }, []);


  const displayRentRooms = () => {
    return rentArray.map((room) => {
      return <div className='col-md-4'>
        <div className='container'>
          <div className="card">
            <img className='my-img' src={room.image} alt="" />
            <div className="card-body p-5 mb-5 max-width-100 height-100 img-fluid">
              <h3>{room.name}</h3>
              <p>{room.address}</p>
              <Link className='btn btn-primary mt-3' to={'/view/' + room._id}>View Details</Link>
            </div>
          </div>
        </div>
      </div>
    })
  }


  return (
    <div className='BrowseRooms'>
      <div className='container'>
        <h1 className='text-center p-3'>Manage Rent Data</h1>
        <hr />

        <div className="row gy-5">
          {displayRentRooms()}
        </div>

      </div>
    </div>
  )
}

export default BrowseRentRooms;