import { Route, Routes } from "react-router-dom"
import Hotel from "../Pages/Hotel"
import Welcome from "../Pages/Welcome"


function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />
      <Route path="/hotel" element={<Hotel />} />


    </Routes>
  )
}

export default Views