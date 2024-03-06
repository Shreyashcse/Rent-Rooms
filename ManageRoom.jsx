import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ManageRoom = () => {
  const [roomArray, setroomArray] = useState([]);


  const getRoomData = async () => {
    const res = await fetch('http://localhost:5000/rent/getall');
    console.log(res.status);

    const data = await res.json();
    console.table(data);

    setroomArray(data);






  }

  useEffect(() => {
    getRoomData();
  }, []);

  const deleteRoom = async (id) => {
    console.log(id);


    const res = await fetch('http://localhost:5000/rent/delete/' + id, {
      method: 'DELETE',
    })

    console.log(res.status);
    getRoomData();
    toast.success('Room Deleted Successfully');
  }

  const displayRoomData = () => {
    if (roomArray.length) {
      return roomArray.map((room) => {
        return <tr key={room._id}>
          <td>{room._id}</td>
          <td>{room.name}</td>
          <td>{room.type}</td>
          <td>{room.location}</td>
          <td>{room.password}</td>
          <td>
            <button className='btn btn-danger' onClick={() => { deleteRoom(room._id) }}>delete room</button>
          </td>
          <td>
            <Link to={'/updateroom/' + room._id} className='btn btn-primary'>Update User</Link>
          </td>
        </tr>

      })
    }
  }




  return (
    <div>
      <div className='container'>
        <h1 className='text-center'>Manage Room data</h1>
        <hr />

        <table className='table table-dark'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Password</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayRoomData()}


          </tbody>
        </table>



      </div>
    </div>
  )
}

export default ManageRoom;