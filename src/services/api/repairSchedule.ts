import axios from "../../utils/axios"
import { ipRepairSchedule } from "../../utils/ip"

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

const getRepairSchedule = async () => {
  const res = await axios.get(ipRepairSchedule)
  return res as ApiResponse<MRepairSchedule.IRecord[]>
}

const getRepairScheduleId = async (id: string) => {
  const res = await axios.get(`${ipRepairSchedule}/${id}`)
  return res as ApiResponse<MRepairSchedule.IRecord>
}

const postRepairSchedule = async (data: MRepairSchedule.IRecord) => {
  const res = await axios.post(ipRepairSchedule, data)
  return res as ApiResponse<MRepairSchedule.IRecord>
}

const putRepairSchedule = async (id: string, data: MRepairSchedule.IRecord) => {
  const res = await axios.post(`${ipRepairSchedule}/${id}`, data)
  return res as ApiResponse<MRepairSchedule.IRecord>
}

const deleteRepairSchedule = async (id: string, data: MRepairSchedule.IRecord) => {
  const res = await axios.post(`${ipRepairSchedule}/${id}`)
  return res as ApiResponse<MRepairSchedule.IRecord>
}

export {
  getRepairSchedule,
  getRepairScheduleId,
  postRepairSchedule,
  putRepairSchedule,
  deleteRepairSchedule,
}