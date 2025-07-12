import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/user.svg";
import Swal from 'sweetalert2';
import Loading from "../../components/Loading/Loading";

const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {throw new Error("No token found. Please log in.")};

  try {
    const response = await axios.get("https://hotel.rasool.click/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Session expired. Please log in again.");
    }
    throw error;
  }
};

const updateProfile = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "https://hotel.rasool.click/api/profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const profileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});

export default function UserProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const currentTheme = localStorage.getItem("theme");

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    onError: (error) => {
      if (
        error.message.includes("No token") ||
        error.message.includes("Session expired")
      ) {
        navigate("/login");
      }
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setEditMode(false);
      setImageFile(null);
      setImagePreview(null);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: currentTheme === "dark" ? "#fff" : "#000",
        background: currentTheme === "dark" ? "#000" : "#fff",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Profile updated successfully"
      });
    },
    onError: (error) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: currentTheme === "dark" ? "#fff" : "#0d0d0d",
        background: currentTheme === "dark" ? "#0d0d0d" : "#fff",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: `Update failed: ${error.response?.data.message || "Unknown error"}`
      });
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <Loading />;
  
  if (error) return (
    <div className="p-4 container text-center text-red-500 h-[100vh]">
      {error.message}
    </div>
  );

  return (
    <div className="p-4 container">
      <title>User Profile</title>
      <div className="bg-white dark:bg-secondaryDarkColor shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">USER INFORMATION</h2>

        <Formik
          initialValues={{
            name: userData?.name || "",
            email: userData?.email || "",
            phone: userData?.mobile || "Not provided",
          }}
          validationSchema={profileSchema}
          onSubmit={(values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("mobile", values.phone);
            if (imageFile) formData.append("image", imageFile);
            mutation.mutate(formData);
          }}
          enableReinitialize
        >
          {({ resetForm }) => (
            <Form>
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={
                      imagePreview ||
                      (userData?.image
                        ? `https://hotel.rasool.click${userData.image}`
                        : img)
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-mainColor"
                    onError={(e) => {
                      e.target.src = img;
                    }}
                  />
                  {editMode && (
                    <label className="absolute bottom-0 right-0 bg-mainColor text-white rounded-full p-2 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold mb-2">
                  Name:
                </label>
                {editMode ? (
                  <>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-xs italic mt-1"
                    />
                  </>
                ) : (
                  <p className="text-gray-700 dark:text-gray-400">{userData?.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  Email:
                </label>
                {editMode ? (
                  <>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-xs italic mt-1"
                    />
                  </>
                ) : (
                  <p className="text-gray-700 dark:text-gray-400">{userData?.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-bold mb-2">
                  Phone:
                </label>
                {editMode ? (
                  <>
                    <Field
                      id="phone"
                      name="phone"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-red-500 text-xs italic mt-1"
                    />
                  </>
                ) : (
                  <p className="text-gray-700 dark:text-gray-400">
                    {userData?.mobile || "Not provided"}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                {editMode ? (
                  <>
                    <button
                      type="submit"
                      disabled={mutation.isLoading}
                      className="bg-mainColor hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all w-full disabled:opacity-50"
                    >
                      {mutation.isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setImagePreview(null);
                        setImageFile(null);
                        setEditMode(false);
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all w-full"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="bg-mainColor hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all w-full"
                  >
                    Edit Profile
                  </button>
                )}
                <Link
                  to="/change-password"
                  className="text-mainColor hover:underline text-center block mt-2"
                >
                  Change Password?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}