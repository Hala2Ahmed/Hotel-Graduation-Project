import React, { useState } from "react";
import img from "../../assets/bg.jpg";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import RoomsAvailable from "../../components/RoomsAavilable/RoomsAavilable";
export default function BookingNow() {
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const token = localStorage.getItem("token");
  const [dateValue1, setDateValue1] = useState(null);
  const [errorMessage1, setErrorMessage1] = useState("");
  const [dateValue2, setDateValue2] = useState(null);
  const [errorMessage2, setErrorMessage2] = useState("");
  const [success, setSuccess] = useState(null);
  
  const {
    data: rooms = [],
    isLoading: checkingAvailability,
    refetch: fetchAvailableRooms,
  } = useQuery({
    queryKey: ["available-rooms"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://hotel.rasool.click/api/rooms`,
          {
            params: {
              check_in_date: formatDateForAPI(dateValue1),
              check_out_date: formatDateForAPI(dateValue2),
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const roomsData = response.data.data || [];
        setSuccess(
          roomsData.length > 0
            ? `${roomsData.length} rooms available`
            : "No rooms available for selected dates"
        );

        return roomsData;
      } catch (err) {
        const currentTheme = localStorage.getItem("theme");
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
          },
        });
        Toast.fire({
          icon: "error",
          title:
            (err.response?.data?.errors?.check_in_date &&
              err.response?.data?.errors?.check_out_date) ||
            err.response?.data?.errors?.check_in_date ||
            err.response?.data?.errors?.check_out_date ||
            "Failed to check availability",
        });
        return [];
      }
    },
    enabled: false,
  });

  const formatDateForAPI = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleCheckAvailability = () => {
    fetchAvailableRooms();
  };

  const handleBookRoom = (roomId) => {
    navigate(`/RoomDetails/${roomId}`, {
      state: {
        checkInDate: dateValue1,
        checkOutDate: dateValue2,
      },
    });
  };

  const handleDateChange1 = (date) => {
    setDateValue1(date);
    setErrorMessage1("");
  };

  const handleDateBlur1 = () => {
    const selectedDate = new Date(dateValue1);
    selectedDate.setHours(0, 0, 0, 0);
  };

  const handleDateChange2 = (date) => {
    setDateValue2(date);
    setErrorMessage2("");
  };

  const handleDateBlur2 = () => {
    const selectedDate = new Date(dateValue2);
    selectedDate.setHours(0, 0, 0, 0);
  };

  return (
    <>
      <section
        className="bg-cover bg-center bg-no-repeat mx-0 h-screen relative"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="container">
          <div className="flex justify-center items-center h-screen">
            <div className="text-center text-white">
              <span className="block mb-3">Welcome To Hope Hotel</span>
              <h1 className="text-5xl font-bold">A Best Place To Stay</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-secondaryDarkColor pb-0 absolute bottom-[-15%] left-[50%] translate-x-[-50%]">
        <div className="flex justify-center items-center">
          <div className="container bg-white dark:bg-secondaryDarkColor p-10 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DateInput
                isInvalid={!!errorMessage1}
                value={dateValue1}
                onChange={handleDateChange1}
                onBlur={handleDateBlur1}
                errorMessage={errorMessage1}
                label="Check in"
                placeholderValue={
                  new CalendarDate(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  )
                }
              />
              <DateInput
                isInvalid={!!errorMessage2}
                value={dateValue2}
                onChange={handleDateChange2}
                onBlur={handleDateBlur2}
                errorMessage={errorMessage2}
                label="Check out"
                placeholderValue={
                  new CalendarDate(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  )
                }
              />
              <Button
                className="bg-mainColor text-white shadow-lg mt-2"
                onPress={handleCheckAvailability}
                isLoading={checkingAvailability}
              >
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </section>
      {success && (
        <div className="container mx-auto mt-10 w-[fit-content]">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            {success}
          </div>
        </div>
      )}
      <RoomsAvailable
        rooms={rooms}
        onBookRoom={handleBookRoom}
        checkingAvailability={checkingAvailability}
      />
    </>
  );
}
