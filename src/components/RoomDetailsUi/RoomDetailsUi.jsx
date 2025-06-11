import { Button, DateInput, Image, Input } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";
export default function RoomDetailsUi({
  room,
  isLoading,
  error,
  formik,
  isSubmitting,
  bookingError,
  handleSubmit,
}) {

  return (
    <div className="m-4 py-5 px-4 md:m-10">
      <div className="flex mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <Link to="/" className="text-mainColor hover:text-yellow-600">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-mainColor">/</span>
            <Link
              to="/Rooms-available"
              className="text-mainColor hover:text-yellow-600"
            >
              Rooms
            </Link>
          </li>
          <li>
            <span className="mx-2 text-mainColor">/</span>
            <span className="text-mainColor">{room.type} Room</span>
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={room.image_path}
              alt={`${room.type} `}
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* Room Details */}
        <div className="col-span-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 capitalize">
            {room.type} Room
          </h1>
          <p className="text-gray-600 mb-4">Room Number: {room.room_number}</p>
          <div className="mb-4">
            <span className="text-xl font-bold">${room.price_per_night}</span>
            <span className="text-gray-500"> / per night</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Max Occupancy:</span>{" "}
            {room.max_occupancy}
          </div>
          <div className="prose">
            <div dangerouslySetInnerHTML={{ __html: room.description }} />
          </div>
        </div>

        {/* Booking Form */}
        <div className="col-span-1 bg-white dark:bg-secondaryDarkColor p-6 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Book This Room
          </h2>

          {bookingError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {bookingError.response?.data?.message ||
                "Failed to book room. Please try again."}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Input
                  label="First Name"
                  name="fname"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.fname && formik.errors.fname}
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  name="lname"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.lname && formik.errors.lname}
                />
              </div>
            </div>

            <div className="mb-4">
              <Input
                label="Number of Guests"
                name="number"
                type="number"
                min="1"
                max={room.max_occupancy}
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.number && formik.errors.number}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <DateInput
                label="Check In"
                value={formik.values.checkIn}
                onChange={(value) => formik.setFieldValue("checkIn", value)}
                onBlur={() => formik.setFieldTouched("checkIn", true)}
                errorMessage={formik.touched.checkIn && formik.errors.checkIn}
              />
              <DateInput
                label="Check Out"
                value={formik.values.checkOut}
                onChange={(value) => formik.setFieldValue("checkOut", value)}
                onBlur={() => formik.setFieldTouched("checkOut", true)}
                errorMessage={formik.touched.checkOut && formik.errors.checkOut}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-mainColor hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium"
              isLoading={isSubmitting}
              isDisabled={!formik.isValid || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Book Now"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
