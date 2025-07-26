import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const initialValues = {
    email: email,
    code: "",
    newPassword: "",
    confirmPassword: ""
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    code: Yup.string().required("Verification code is required").length(6, "Code must be 6 digits"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your password')
  })

  const onSubmit = (values) => {
    setErrorMsg("")
    setSuccessMsg("")
    setIsLoading(true)
    
    axios.post("https://hotel.rasool.click/api/auth/verify-password-reset-code", {
      email: values.email,
      code: values.code,
      newPassword: values.newPassword
    })
      .then(() => {
        setSuccessMsg("Password has been reset successfully")
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
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
              disabled={!!email}
            />
            
            <Input 
              isInvalid={touched.code && errors.code} 
              errorMessage={errors.code} 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.code} 
              name='code' 
              label="Verification Code" 
              type="text" 
              className='col-span-2'
              placeholder="Enter 6-digit code"
            />
            
            <Input 
              isInvalid={touched.newPassword && errors.newPassword} 
              errorMessage={errors.newPassword} 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.newPassword} 
              name='newPassword' 
              label="New Password" 
              type="password" 
              className='col-span-2'
              placeholder="At least 8 characters with uppercase, lowercase, and symbol"
            />
            
            <Input 
              isInvalid={touched.confirmPassword && errors.confirmPassword} 
              errorMessage={errors.confirmPassword} 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.confirmPassword} 
              name='confirmPassword' 
              label="Confirm Password" 
              type="password" 
              className='col-span-2'
            />
            
            <Button 
              disabled={isLoading} 
              isLoading={isLoading} 
              type='submit' 
              className='col-span-2 bg-mainColor hover:bg-yellow-600' 
            >
              Reset Password
            </Button>
            
            {successMsg && (
              <p className='text-green-500 col-span-2'>
                {successMsg} You will be redirected to login shortly...
              </p>
            )}
            {errorMsg && <p className='text-red-500 col-span-2'>{errorMsg}</p>}
          </div>
        </form>
        <div>
          <Link to="/login" className='text-mainColor hover:underline'>Back to Login</Link>
        </div>
      </div>
    </div>
  )
}