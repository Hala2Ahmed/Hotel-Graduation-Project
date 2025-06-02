import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedAuthRoute({children}) {
   const { IsLoggedIn } = useContext(authContext);
  return (
    <div>
      {!IsLoggedIn ? children : <Navigate to="/" />}
    </div>
  )
}
