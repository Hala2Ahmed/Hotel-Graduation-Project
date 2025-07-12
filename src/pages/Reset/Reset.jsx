import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const { token, email } = useParams();

  const initialValues = {
    email: decodeURIComponent(email || ""),
    password: "",
    password_confirmation: "",
    token: token || ""
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Password confirmation is required"),
  })

  const onSubmit = (values) => {
    setErrorMsg("")
    setSuccessMsg("")
    setIsLoading(true)
    
    axios.post("https://hotel.rasool.click/api/auth/reset-password", values)
      .then(() => {
        setSuccessMsg("Password has been reset successfully")
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
      <title>Reset Password</title>
      <div className='mx-auto md:w-2/3 bg-white dark:bg-secondaryDarkColor shadow-lg p-9'>
        <h2 className='text-3xl font-bold text-center'>Reset Password</h2>
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
            <Input 
              isInvalid={touched.password && errors.password} 
              errorMessage={errors.password} 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.password} 
              name='password' 
              label="New Password" 
              type="password" 
              className='col-span-2'
            />
            <Input 
              isInvalid={touched.password_confirmation && errors.password_confirmation} 
              errorMessage={errors.password_confirmation} 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.password_confirmation} 
              name='password_confirmation' 
              label="Confirm New Password" 
              type="password" 
              className='col-span-2'
            />
            <Button 
              disabled={isLoading} 
              isLoading={isLoading} 
              type='submit' 
              className='col-span-2' 
              color="primary"
            >
              Reset Password
            </Button>
            
            {successMsg && (
              <p className='text-mainColor col-span-2'>
                {successMsg} <Link to="/login" className='text-mainColor hover:underline'>Login now</Link>
              </p>
            )}
            {errorMsg && <p className='text-red-500 col-span-2'>{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}