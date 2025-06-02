import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    current_password: Yup.string().required("Current password is required"),
    password: Yup.string().required("New password is required"),
    password_confirmation: Yup.string().required("Please confirm your password").oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onSubmit = (values) => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    const token = localStorage.getItem("token");

    axios
      .post("https://hotel.rasool.click/api/change-password", values, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSuccessMsg("Password changed successfully!");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Password changed successfully!"
        });
        navigate("/my-profile");

      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Failed to change password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <div className="container py-10">
      <div className="mx-auto md:w-2/3 bg-white shadow-lg p-9">
        <h2 className="text-3xl font-bold text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-5">
            <Input
              isInvalid={touched.current_password && errors.current_password}
              errorMessage={errors.current_password}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.current_password}
              name="current_password"
              label="Current Password"
              type="password"
              className="col-span-2"
            />

            <Input
              isInvalid={touched.password && errors.password}
              errorMessage={errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              label="New Password"
              type="password"
              className="col-span-2"
            />

            <Input
              isInvalid={
                touched.password_confirmation && errors.password_confirmation
              }
              errorMessage={errors.password_confirmation}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password_confirmation}
              name="password_confirmation"
              label="Confirm New Password"
              type="password"
              className="col-span-2"
            />

            <Button
              disabled={isLoading}
              isLoading={isLoading}
              type="submit"
              className="col-span-2"
              color="primary"
            >
              Change Password
            </Button>

            {errorMsg && <p className="text-red-500 col-span-2">{errorMsg}</p>}
            {successMsg && (
              <p className="text-green-500 col-span-2">{successMsg}</p>
            )}
          </div>
        </form>
        <Link to="/my-profile" className="text-blue-500 hover:underline">
          Back to Profile
        </Link>
      </div>
    </div>
  );
}
