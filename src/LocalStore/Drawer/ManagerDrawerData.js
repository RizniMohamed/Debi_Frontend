import {
  Dashboard,
  Home,
  MeetingRoom,
  Person,
  Notifications,
} from '@mui/icons-material';


const data = [
  {
    name: "Dashboard",
    path: "/manager/",
    icon: <Dashboard />
  },
  {
    name: "My Boarding",
    path: "/manager/boarding",
    icon: <Home />
  },
  {
    name: "Rooms",
    path: "/manager/rooms",
    icon: <MeetingRoom />
  },
  {
    name: "Persons",
    path: "/manager/persons",
    icon: <Person />
  },
  {
    name: "Notification",
    path: "/manager/notification",
    icon: <Notifications />
  },
]

export default data
