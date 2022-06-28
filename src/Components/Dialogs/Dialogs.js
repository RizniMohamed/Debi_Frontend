import React from 'react'
import Login from './Login'
import Profile from './Profile'
import RegisterHotel from './RegisterHotel'
// import Delete from '../Dialogs/Delete'
// import NotificationDetails from '../Dialogs/NotificationDetails'
// import Payment from '../Dialogs/Payment/Payment'
// import PaymentDetails from '../Dialogs/PaymentDetails'
// import Signup from './Signup'
// import NotificationPanel from '../Components/NotificationPanel'

const Dialogs = () => {
  return (
    <>
      <Login />
      <Profile/>
      <RegisterHotel/>
      {/* <Delete />
      <Payment />
      <NotificationDetails />
      <PaymentDetails />
      <Signup/>
      <NotificationPanel/> */}
    </>
  )
}

export default Dialogs