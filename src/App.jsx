import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound/NotFound'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import RoomsAvailable from './pages/RoomsAvailable/RoomsAvailable'
import Layout from './Layout/Layout'
import RoomDetails from './pages/RoomDetails/RoomDetails'
import MyReservation from './pages/MyReservation/MyReservation'
import Payment from './pages/Payment/Payment'
import UserProfile from './pages/UserProfile/UserProfile'
import AuthProvider from './Contexts/AuthContext'
import ProtectedRoute from './Auth/ProtectedRoute'
import ProtectedAuthRoute from './Auth/ProtectedAuthRoute'
import Forgot from './pages/Forgot/Forgot'
import Reset from './pages/Reset/Reset'
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import ChangePassword from './pages/ChangePassword/ChangePassword'
const queryClient = new QueryClient()

function App() {
  const router=createBrowserRouter([
    {path:'',element:<Layout />,children:[
      {index:true,element:<Home />},
      {path:'/login',element:<ProtectedAuthRoute><Login /></ProtectedAuthRoute>},
      {path:'/register',element:<ProtectedAuthRoute><Register /></ProtectedAuthRoute>},
      {path:'/Rooms-available',element:<ProtectedRoute><RoomsAvailable /></ProtectedRoute>},
      {path:'/RoomDetails/:id',element:<ProtectedRoute><RoomDetails /></ProtectedRoute>},
      {path:'/reservations',element:<ProtectedRoute><MyReservation /></ProtectedRoute>},
      {path:'/payment',element:<ProtectedRoute><Payment /></ProtectedRoute>},
      {path:'/my-profile',element:<ProtectedRoute><UserProfile /></ProtectedRoute>},
      {path:'/change-password',element:<ProtectedRoute><ChangePassword /></ProtectedRoute>},
      {path:'/forgot-password',element:<ProtectedAuthRoute><Forgot /></ProtectedAuthRoute>},
      {path:'/reset-password',element:<ProtectedAuthRoute><Reset /></ProtectedAuthRoute>},
      {path: "*", element:<NotFound />},
    ]}
  ])
    return (
      <>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      </QueryClientProvider>
      </>
    )
}

export default App
