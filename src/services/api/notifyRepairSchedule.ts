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
  return res
}

const getNotificationsPending = async () => {
  const res = await axios.get(`${ipNotify}/pending`)
  return res
}

const getNotificationsConfirmed = async () => {
  const res = await axios.get(`${ipNotify}/confirmed`)
  return res
}

const getNotificationsCancelled = async () => {
  const res = await axios.get(`${ipNotify}/cancelled`)
  return res
}

const putNotificationsRead = async (id: string) => {
  const res = await axios.put(`${ipNotify}/${id}/read`)
  return res
}


export {
  getNotifications,
  getNotificationsCancelled,
  getNotificationsConfirmed,
  getNotificationsPending,
  putNotificationsRead
}