import { Button } from "@heroui/react";
import React from "react";

export default function RoomsAvailable({
  rooms,
  onBookRoom,
  checkingAvailability,
}) {
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-8 gap-2">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
              className="m-6 flex flex-col rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <div className="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img
                  className="object-cover w-full"
                  src={room.image_path}
                  alt={room.type}
                />
              </div>
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl capitalize">{room.type} Room</h5>
                <div className="mt-2 mb-5">
                  <p className="flex items-center">
                    <span className="text-2xl font-bold">
                      ${room.price_per_night}
                    </span>
                    <span className="text-sm">/ per night</span>
                  </p>
                  <div className="mt-2">
                    <span className="text-sm">
                      Max occupancy: {room.max_occupancy}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-yellow-500 text-white"
                  onPress={() => onBookRoom(room.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">
              {checkingAvailability
                ? "Checking availability..."
                : "Please select dates to see rooms"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
