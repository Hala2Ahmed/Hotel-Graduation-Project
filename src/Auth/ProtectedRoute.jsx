import React, { useContext } from 'react'
import Login from '../pages/Login/Login'
import { authContext } from '../Contexts/AuthContext';

export default function ProtectedRoute({children}) {
       const { IsLoggedIn } = useContext(authContext);
  return (
    <div>
      {IsLoggedIn ? children : <Login />} 
    </div>
  )
}
