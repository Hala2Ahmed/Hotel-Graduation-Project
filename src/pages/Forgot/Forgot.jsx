import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const initialValues = {
    email: "",
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required("Email is required"),
  })

  const onSubmit = (values) => {
    setErrorMsg("")
    setSuccessMsg("")
    setIsLoading(true)
    
    axios.post("https://hotel.rasool.click/api/auth/forgot-password", values)
      .then(() => {
        setSuccessMsg("Password reset link has been sent to your email")
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const {handleSubmit, values, handleChange, errors, handleBlur, touched} = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <div className='container py-10'>
      <div className='mx-auto md:w-2/3 bg-white shadow-lg p-9'>
        <h2 className='text-3xl font-bold text-center'>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4 py-5'>
            <Input 
              isInvalid={touched.email && errors.email} 
              errorMessage={errors.email} 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.email} 
              name='email' 
              label="Email" 
              type="email" 
              className='col-span-2'
            />
            <Button 
              disabled={isLoading} 
              isLoading={isLoading} 
              type='submit' 
              className='col-span-2' 
              color="primary"
            >
              Send Reset Link
            </Button>
            
            {successMsg && <p className='text-green-500 col-span-2'>{successMsg}</p>}
            {errorMsg && <p className='text-red-500 col-span-2'>{errorMsg}</p>}
          </div>
        </form>
        <div className='text-center'>
          <Link to="/login" className='text-blue-500 hover:underline'>Back to Login</Link>
        </div>
      </div>
    </div>
  )
}