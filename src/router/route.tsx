import MainLayout from "../App"
import App from "../App"
import Error404 from "../components/Error404"
import Login from "../pages/Auth/login"
import Register from "../pages/Auth/register"
import BookCalendar from "../pages/Dat-lich"
import Services from "../pages/Dich-vu"
import Parts from "../pages/Phu-tung"
import Home from "../pages/Trang-chu"
export const elementRoute = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/services",
        element: <Services />
      },
      {
        path: "parts",
        element: <Parts />
      },
      {
        path: "bookcalendar",
        element: <BookCalendar />
      },
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "*",
    element: <Error404 />
  }
]