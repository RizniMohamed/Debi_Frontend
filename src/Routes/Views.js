import { Route, Routes } from "react-router-dom"
import Welcome from "../Pages/Welcome"


function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />
      

    </Routes>
  )
}

export default Views