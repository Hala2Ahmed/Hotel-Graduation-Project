import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

export default function MyReservation() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const [editingBooking, setEditingBooking] = useState(null);
  const [editDates, setEditDates] = useState({
    check_in_date: null,
    check_out_date: null
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://hotel.rasool.click/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to fetch bookings");
      }
    },
    enabled: !!token,
  });

  const deleteBooking = useMutation({
    mutationFn: async (bookingReference) => {
      try {
        const response = await axios.delete(
          `https://hotel.rasool.click/api/bookings/${bookingReference}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to delete booking");
      }
    },    
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", error.message, "error");
    }
  });

  const updateBooking = useMutation({
    mutationFn: async ({ bookingReference, dates }) => {
      try {
        // تحويل CalendarDate إلى صيغة YYYY-MM-DD
        const formatDate = (date) => {
          return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        };

        const payload = {
          check_in_date: formatDate(dates.check_in_date),
          check_out_date: formatDate(dates.check_out_date)
        };

        const response = await axios.put(
          `https://hotel.rasool.click/api/bookings/${bookingReference}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        return response.data;
      } catch (error) {
        const serverMessage = error.response?.data?.errors?.check_in_date &&
        error.response?.data?.errors?.check_out_date ||
        error.response?.data?.errors?.check_in_date ||
      error.response?.data?.errors?.check_out_date ||
      error.response?.data?.error||
      "Failed to check availability";
        throw new Error(serverMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      setEditingBooking(null);
      Swal.fire("Updated!", "Your booking has been updated.", "success");
    },
    onError: (error) => {
      Swal.fire({
        title: "Update Failed",
        text: error.message,
        icon: "error",
        footer: 'Please check the dates and try again'
      });
    }
  });

  // بدء عملية التعديل
  const handleEdit = (booking) => {
    // تحويل تواريخ API إلى CalendarDate
    const parseDate = (dateStr) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new CalendarDate(year, month, day);
    };

    setEditingBooking(booking.booking_reference);
    setEditDates({
      check_in_date: parseDate(booking.check_in_date),
      check_out_date: parseDate(booking.check_out_date)
    });
  };

  // إلغاء التعديل
  const handleCancelEdit = () => {
    setEditingBooking(null);
    setEditDates({
      check_in_date: null,
      check_out_date: null
    });
  };

  // حفظ التعديلات
  const handleSaveChanges = () => {
    updateBooking.mutate({
      bookingReference: editingBooking,
      dates: editDates
    });
  };

  // إلغاء الحجز
  const handleCancelBooking = (bookingReference) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking.mutate(bookingReference);
      }
    });
  };

  const bookings = data?.data || [];

  if (isLoading) {
    return <div className="container mb-6">Loading reservations...</div>;
  }

  if (isError) {
    return (
      <div className="container mb-6">
        Error fetching reservations. Please try again.
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="container mb-6">
        <p className="-mt-36 text-center text-yellow-500">No reservations found.</p>
      </div>
    );
  }

  return (
    <div className="container mb-6 overflow-hidden">
      <p className="pb-3 text-lg font-medium text-gray-600 border-b">
        My Reservation
      </p>

      {bookings.map((booking) => (
        <div key={booking.booking_reference} className="mb-6 border-b pb-6">
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4">
            <div className="flex-shrink-0">
              <img
                className="w-40 h-40 object-cover bg-[#EAEFFF] rounded"
                src={booking.room.image_path}
                alt={booking.room.type}
              />
            </div>
            <div className="flex-1 text-sm text-[#5E5E5E]">
              <div className="flex justify-between items-start">
                <p className="text-[#262626] text-lg font-semibold">
                  {booking.room.type} Room ({booking.room.room_number})
                </p>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="mt-1">
                <span className="text-sm text-[#3C3C3C] font-medium">
                  Max occupancy:{" "}
                </span>
                {booking.room.max_occupancy}
              </p>
              <p className="mt-1">
                <span className="text-sm text-[#3C3C3C] font-medium">
                  Price:{" "}
                </span>
                ${booking.room.price_per_night} /per night (Total: $
                {booking.total_price})
              </p>
              <p className="mt-1">
                <span className="text-sm text-[#3C3C3C] font-medium">
                  Dates:{" "}
                </span>
                {booking.check_in_date}
                <span className="text-[#464646] font-medium mx-1">to</span>
                {booking.check_out_date}
              </p>
              <p className="mt-1">
                <span className="text-sm text-[#3C3C3C] font-medium">
                  Booked on:{" "}
                </span>
                {booking.created_at}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end text-sm text-center">
              {booking.status === "confirmed" && (
                <>
                  <Link
                    state={{ booking }}
                    className="text-[#696969] sm:min-w-36 py-1 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    <p className="text-gray-500 text-sm font-medium mx-4">
                      YaadPay
                    </p>
                  </Link>
                  <button className="text-[#696969] sm:min-w-36 py-1 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center">
                    <p className="text-gray-500 text-sm font-medium mx-4">
                      CASH PAYMENT
                    </p>
                  </button>
                  <div className="grid md:grid-cols-2 gap-1">
                    <button 
                      onClick={() => handleEdit(booking)}
                      disabled={editingBooking === booking.booking_reference}
                      className={`text-[#696969] sm:min-w-36 py-1 border rounded transition-all duration-300 flex items-center justify-center ${
                        editingBooking === booking.booking_reference ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 hover:text-white"
                      }`}
                    >
                      <p className="text-gray-500 text-sm font-medium mx-4">
                        Edit
                      </p>
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.booking_reference)}
                      disabled={deleteBooking.isLoading}
                      className="text-[#696969] sm:min-w-36 py-1 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                      <p className="text-gray-500 text-sm font-medium mx-4">
                        {deleteBooking.isLoading ? "Cancelling..." : "Cancel"}
                      </p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Edit Section */}
          {editingBooking === booking.booking_reference && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DateInput
                  label="New Check-in Date"
                  value={editDates.check_in_date}
                  onChange={(value) => setEditDates(prev => ({
                    ...prev,
                    check_in_date: value
                  }))}
                />
                <DateInput
                  label="New Check-out Date"
                  value={editDates.check_out_date}
                  onChange={(value) => setEditDates(prev => ({
                    ...prev,
                    check_out_date: value
                  }))}
                  minValue={editDates.check_in_date}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                  disabled={updateBooking.isLoading}
                >
                  {updateBooking.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}