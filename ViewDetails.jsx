import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddRentRoom from './AddRentRoom';
import ViewDetails from 'ViewDetails';
import roomdetails from 'roomdetails'


const roomdetails = () => {

  const { id } = useParams();

  cost [roomData, setRoomData] = useState(null);

  const fetchRoomData = async () => {
    const res = await fetch('http://localhost:5000/rent/getbyid/' + id);
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setRoomData(data);
  }

  useEffect(() => {
    fetchRoomData();
  }, []);


  const showRoomDetails = () => {
    if (roomData !== null) {
      return <div className='container'>
        <img src={roomData.image} className='room-img w-100' alt=""/>
        <div className='p-4'>
          <h2>{roomData.name}</h2>
          <h3>{roomData.type}</h3>
          <p className='fs-5'>Address : {roomData.address}</p>
          <p className='fs-5'>Contact : {roomData.contact}</p>
          <hr />
          <h3>Facilities : </h3>
          <p className='fs-5'>{roomData.facilities}</p>
          <h1>Rent : ₹{roomData.rent}</h1>
          <h1>Security Amount : ₹{roomData.security}</h1>
        </div>
      </div>
    }
  }

  return (
    <div className='roomdetails'>
      {showRoomDetails()}



    </div>

  )
}

export default ViewDetails