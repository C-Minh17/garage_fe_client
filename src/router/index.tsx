import { useRoutes } from "react-router-dom"
import { elementRoute } from "./route"

function AllRoutes() {
  const allRoutes = useRoutes(elementRoute)
  return allRoutes
}

export default AllRoutes