import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate=useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  }
  const validationSchema = Yup.object({
    name:Yup.string().required("Name is required").min(3,"Name length must be at least 3 characters").max(20,"Name must be at most 20 characters"),
    email: Yup.string().email('Invalid email address').required("Email is required"),
    password: Yup.string().required("Password is required"),
    password_confirmation:Yup.string().required().oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  const onSubmit=(values)=>{
    setErrorMsg("")
    setIsLoading(true)
    axios.post("https://hotel.rasool.click/api/auth/register",values).then(({data})=>{
        navigate("/login")
    }).catch((err)=>{
      setErrorMsg(err.response.data.message)
    }).finally(()=>{
      setIsLoading(false)
  })
  }
  const {handleSubmit,values,handleChange,errors,handleBlur,touched}=useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  return (
<>
<div className='container py-10'>
  <title>Register</title>
<div className='mx-auto sm:w-2/3 bg-white dark:bg-secondaryDarkColor shadow-lg p-9'>
<h2 className='text-3xl font-bold text-center'>Register</h2>
  <form onSubmit={handleSubmit}>
  <div className='grid md:grid-cols-2 gap-4 py-5 '>
  <Input isInvalid={touched.name&&errors.name} errorMessage={errors.name} onBlur={handleBlur} onChange={handleChange} value={values.name} name='name' label="Name" type="name" className='md:col-span-2' />
  <Input isInvalid={touched.email&&errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' label="Email" type="email" className='md:col-span-2'/>
  <Input isInvalid={touched.password&&errors.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' label="Password" type="password" className='col-span-1'/>
  <Input isInvalid={touched.password_confirmation&&errors.password_confirmation} errorMessage={errors.password_confirmation} onBlur={handleBlur} onChange={handleChange} value={values.password_confirmation} name='password_confirmation' label="password_confirmation" type="password" className='col-span-1'/>
  <Button disabled={isLoading} isLoading={isLoading} type='submit' className='md:col-span-2 bg-mainColor hover:bg-yellow-600'>Register</Button>
  {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
  </div>
  </form>
  </div>
  </div>
</>
  )
}