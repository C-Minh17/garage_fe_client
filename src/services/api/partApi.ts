import axios from "../../utils/axios"
import { ipPart } from "../../utils/ip"


const getPart = async () => {
  const res = await axios.get(ipPart)
  return res as ApiResponse<MPart.IRecord[]>
}

const getPartId = async (id: string) => {
  const res = await axios.get(`${ipPart}/${id}`)
  return res as ApiResponse<MPart.IRecord>
}



const searchParts = async (keyword: string) => {
  const res = await axios.get(`${ipPart}/search`, { params: { keyword } })
  return res as ApiResponse<MPart.IRecord[]>
}


export {
  getPart,
  getPartId,
  searchParts
}