import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react';
import NotFound from './pages/NotFound/NotFound'
const Register = lazy(() => import('./pages/Register/Register'));
const Login = lazy(() => import('./pages/Login/Login'));
import Home from './pages/Home/Home'
const RoomsAvailable = lazy(() => import('./pages/RoomsAvailable/RoomsAvailable'));
import Layout from './Layout/Layout'
const RoomDetails = lazy(() => import('./pages/RoomDetails/RoomDetails'));
const MyReservation = lazy(() => import('./pages/MyReservation/MyReservation'));
import Payment from './pages/Payment/Payment'
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'));
import AuthProvider from './Contexts/AuthContext'
import ProtectedRoute from './Auth/ProtectedRoute'
import ProtectedAuthRoute from './Auth/ProtectedAuthRoute'
import Forgot from './pages/Forgot/Forgot'
import Reset from './pages/Reset/Reset'
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Loading from './components/Loading/Loading';
const queryClient = new QueryClient()

function App() {
  const router=createBrowserRouter([
    {path:'',element:<Layout />,children:[
      {index:true,element:<Home />},
      {path:'/login',element:<ProtectedAuthRoute><Suspense fallback={<Loading />}><Login /></Suspense></ProtectedAuthRoute>},
      {path:'/register',element:<ProtectedAuthRoute><Suspense fallback={<Loading />}><Register /></Suspense></ProtectedAuthRoute>},
      {path:'/Rooms-available',element:<ProtectedRoute><Suspense fallback={<Loading />}><RoomsAvailable /></Suspense></ProtectedRoute>},
      {path:'/RoomDetails/:id',element:<ProtectedRoute><Suspense fallback={<Loading />}><RoomDetails /></Suspense></ProtectedRoute>},
      {path:'/reservations',element:<ProtectedRoute><Suspense fallback={<Loading />}><MyReservation /></Suspense></ProtectedRoute>},
      {path:'/payment',element:<ProtectedRoute><Payment /></ProtectedRoute>},
      {path:'/my-profile',element:<ProtectedRoute><Suspense fallback={<Loading />}><UserProfile /></Suspense></ProtectedRoute>},
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
