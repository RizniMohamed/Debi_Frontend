import { Route, Routes } from "react-router-dom"
import HotelDetails from "../Pages/HotelDetails"
import Hotel from "../Pages/Hotel"
import Welcome from "../Pages/Welcome"
import Room from "../Pages/Room"
import RoomDetails from "../Pages/RoomDetails"
import ManagerIndex from "../Pages/Manager/Index"
import MyHotel from "../Pages/Manager/MyHotel"

import AdminIndex from "../Pages/Admin/Index"
import AdminHotel from "../Pages/Admin/Hotel"
import AdminRoom from "../Pages/Admin/Room"
import AdminUser from "../Pages/Admin/User"

function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />
      <Route path="/hotel" element={<Hotel />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/hotel/:id/room" element={<Room />} />
      <Route path="/hotel/:id/room/:id" element={<RoomDetails />} />

      <Route path="Admin" element={<AdminIndex />}>
        <Route index element={<AdminHotel />} />
        <Route path="Room" element={<AdminRoom />} />
        <Route path="User" element={<AdminUser />} />
      </Route>

      <Route path="Manager" element={<ManagerIndex />}>
        <Route index element={<MyHotel />} />
      </Route>

    </Routes>
  )
}

export default Views