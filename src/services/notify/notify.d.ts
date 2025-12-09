declare module MNotification {
  interface IRecord {
    id: string;
    title: string;
    message: string;
    booking: MRepairSchedule.IRecord,
    type: string;
    status: string | "NEW" | "CONFIRMED" | "CANCELLED";
    read: boolean;
    createdAt: string;
    services: MService.IRecord[]
  }
}