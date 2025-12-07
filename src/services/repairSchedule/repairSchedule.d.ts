declare module MRepairSchedule {
  interface IRecord {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    licensePlate: string;
    carBrand: string;
    carModel: string;

    serviceIds: string[];
    service: MService.IRecord;

    note: string;
    status: string;
    bookingTime: string;
    createdAt: string;
  }
}