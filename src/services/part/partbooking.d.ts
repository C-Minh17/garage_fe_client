declare namespace MPartBooking {
  interface IRecord {
    id: string;
    supplierId: string;
    supplierCode: string;
    bookingCode: string;
    partId: string;
    partName: string;
    quantity: number;
    note?: string;
    remainingStock: number;
    price: number;
    phone: string;
    address: string;
    customerName: string;
    isActive: boolean;
    status: string;
    updatedAt: string;
    createdAt: string;
  }

  interface IRequest {
  partId: string;
  supplierId: string;
  supplierCode?: string;
  quantity: number;
  note: string;
  customerName: string;
  phone: string;
  address: string;
  isActive?: boolean;
}
}