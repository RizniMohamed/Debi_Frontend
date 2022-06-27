import { Route, Routes } from "react-router-dom"
import HotelDetails from "../Pages/HotelDetails"
import Hotel from "../Pages/Hotel"
import Welcome from "../Pages/Welcome"
import Room from "../Pages/Room"
import RoomDetails from "../Pages/RoomDetails"


function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />
      <Route path="/hotel" element={<Hotel />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/hotel/:id/room" element={<Room />} />
      <Route path="/hotel/:id/room/:id" element={<RoomDetails />} />


    </Routes>
  )
}

export default Views