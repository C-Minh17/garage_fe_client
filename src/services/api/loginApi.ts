import axios from "../../utils/axios"
import { ipAuth } from "../../utils/ip"

const postAuthRegister = (data: MRegister.IRecord) => {
  const res = axios.post(ipAuth + "/register", data)
  return res
}

const postAuthLogin = (data: MLogin.IRecord) => {
  const res = axios.post(ipAuth + "/login", data)
  return res
}

export {
  postAuthRegister,
  postAuthLogin
}