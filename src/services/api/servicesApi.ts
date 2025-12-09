import axios from "../../utils/axios"
import { ipService } from "../../utils/ip"


const getServices = async (): Promise<ApiResponse<MService.IRecord[]>> => {
  const res = await axios.get(ipService)
  return res as ApiResponse<MService.IRecord[]>
}

const sortServices = async (asc: boolean = false): Promise<ApiResponse<MService.IRecord[]>> => {
  const res = await axios.get(`${ipService}/sort?asc=${asc}`)
  return res as ApiResponse<MService.IRecord[]>
}

const getServiceId = async (id: string): Promise<ApiResponse<MService.IRecord>> => {
  const res = await axios.get(`${ipService}/${id}`)
  return res as ApiResponse<MService.IRecord>
}

const searchServices = async (query: string): Promise<ApiResponse<MService.IRecord[]>> => {
  const res = await axios.get(`${ipService}/search?name=${query}&serviceCode=${query}`)
  return res as ApiResponse<MService.IRecord[]>
}




export {
  getServices,
  getServiceId,
  searchServices,
  sortServices
}