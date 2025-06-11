import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import RoomDetailsUi from "../../components/RoomDetailsUi/RoomDetailsUi";
import Loading from "../../components/Loading/Loading";
export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const token = localStorage.getItem("token");
  const {
    data: room,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://hotel.rasool.click/api/rooms/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    },
  });

  const {
    mutate: bookRoom,
    isPending: isSubmitting,
    error: bookingError,
  } = useMutation({
    mutationFn: async (bookingData) => {
      const response = await axios.post(
        `https://hotel.rasool.click/api/rooms/${id}/reserve`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      navigate("/reservations");
    },
    onError: (error) => {
      console.error("Booking error:", error);
    },
  });

  const validationSchema = Yup.object({
    fname: Yup.string()
      .required("First Name is required")
      .min(3, "Name must be at least 3 characters"),
    lname: Yup.string()
      .required("Last Name is required")
      .min(3, "Name must be at least 3 characters"),
    number: Yup.number()
      .required("Number of guests is required")
      .min(1, "At least 1 guest is required")
      .max(
        room?.max_occupancy || 10,
        `Maximum ${room?.max_occupancy || 10} guests allowed`
      ),
    checkIn: Yup.date()
      .required("Check-in date is required")
      .min(today, "Check-in date cannot be in the past"),
    checkOut: Yup.date()
      .required("Check-out date is required")
      .min(Yup.ref("checkIn"), "Check-out must be after check-in"),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      number: "",
      checkIn: null,
      checkOut: null,
    },
    validationSchema,
    onSubmit: (values) => {
      if (!token) {
        navigate("/login");
        return;
      }

      const bookingData = {
        check_in_date: new Date(values.checkIn).toISOString().split("T")[0],
        check_out_date: new Date(values.checkOut).toISOString().split("T")[0],
      };

      bookRoom(bookingData);
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {"Failed to fetch room details"}
        </div>
        <Link
          to="/Rooms-available"
          className="text-mainColor hover:text-yellow-600"
        >
          Back to available rooms
        </Link>
      </div>
    );
  }
  return (
    <RoomDetailsUi
      room={room}
      isLoading={isLoading}
      error={error}
      formik={formik}
      isSubmitting={isSubmitting}
      bookingError={bookingError}
      handleSubmit={formik.handleSubmit}
    />
  );
}
