import axios from "../../utils/axios"
import { ipNotify } from "../../utils/ip"

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

const getNotifications = async () => {
  const res = await axios.get(ipNotify)
  return res as ApiResponse<MNotification.IRecord[]>
}


export {
  getNotifications
}