import axios from "../../utils/axios"
import { ipBooking } from "../../utils/ip"


interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  status?: number;
  data?: T;
}


const createBooking = async (data: MBooking.IRequest): Promise<ApiResponse<MBooking.IResponse>> => {
  const res = await axios.post(`${ipBooking}/bookings`, data);
  return res as ApiResponse<MBooking.IResponse>;
}

const getAllBookings = async (): Promise<ApiResponse<MBooking.IResponse[]>> => {
  const res = await axios.get(`${ipBooking}/bookings`);
  return res as ApiResponse<MBooking.IResponse[]>;
}

const getBookingById = async (id: string): Promise<ApiResponse<MBooking.IResponse>> => {
  const res = await axios.get(`${ipBooking}/bookings/${id}`);
  return res as ApiResponse<MBooking.IResponse>;
}

const updateBookingStatus = async (id: string, status: string): Promise<ApiResponse<MBooking.IResponse>> => {
  const res = await axios.put(`${ipBooking}/bookings/${id}/status/${status}`);
  return res as ApiResponse<MBooking.IResponse>;
}

const deleteBooking = async (id: string): Promise<ApiResponse<null>> => {
  const res = await axios.delete(`${ipBooking}/bookings/${id}`);
  return res as ApiResponse<null>;
}

export {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
}