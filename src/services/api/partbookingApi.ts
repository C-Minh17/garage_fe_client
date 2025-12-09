import axios from "../../utils/axios";
import { ipPartBooking } from "../../utils/ip";

const createBooking = async (data: MPartBooking.IRequest) => {
  const res = await axios.post(`${ipPartBooking}/create`, data);
  return res;
};

const getBookingById = async (id: string) => {
  const res = await axios.get(`${ipPartBooking}/${id}`);
  return res;
};

const deleteBooking =  async (id: string) => {
  const res = await axios.delete(`${ipPartBooking}/${id}`);
  return res;
};


export {
  createBooking,
  getBookingById,
  deleteBooking
};