import { Route, Routes } from "react-router-dom"
import HotelDetails from "../Pages/HotelDetails"
import Hotel from "../Pages/Hotel"
import Welcome from "../Pages/Welcome"
import Room from "../Pages/Room"


function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />
      <Route path="/hotel" element={<Hotel />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/hotel/:id/room" element={<Room />} />


    </Routes>
  )
}

export default Views