declare namespace MBooking {
  type Status = 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'DONE';

  interface IResponse {
    id: string;
    customerId: string;
    serviceId: string;
    note?: string;
    status: Status;
    bookingTime: string;
    createdAt: string;
  }

  interface IRequest {
    customerId: string;
    serviceId: string;
    note?: string;
    bookingTime: string;
  }
}