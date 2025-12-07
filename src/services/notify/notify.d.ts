declare module MNotification {
  interface IRecord {
    id: string;
    title: string;
    message: string;
    bookingId: string;
    senderId: string;
    receiverId: string;
    type: string;
    status: string;
    read: boolean;
    createdAt: string;
  }
}