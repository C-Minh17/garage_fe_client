import React, { useState } from "react";
import Tag from "../../../components/Tag";
import BaseModal from "../../../components/baseModal";
import DetailNotify from "./detailNotify";
import { putNotificationsRead } from "../../../services/api/notifyRepairSchedule";

interface INotificationList {
  list: MNotification.IRecord[],
  isReload?: boolean,
  setIsReaload?: (a: boolean) => void
}

const NotificationList = ({ list, isReload, setIsReaload }: INotificationList) => {
  const [isModal, setIsModal] = useState<boolean>(false)
  const [dataNotifyPending, setDataNotifyPending] = useState<MNotification.IRecord>()

  if (!list || list.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#999" }}>
        Không có thông báo
      </div>
    );
  }


  return (
    <>
      <BaseModal
        isOpen={isModal}
        closeModal={() => setIsModal(false)}
      >
        <DetailNotify data={dataNotifyPending} />
      </BaseModal>
      <div style={{ maxHeight: "75vh", overflowY: "auto", padding: "10px" }}>
        {list.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                padding: "14px 16px",
                backgroundColor: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                marginBottom: 12,
                border: "1px solid #e3e8ff",
              }}
              onClick={async () => {
                setIsModal(true)
                setDataNotifyPending(item)
                await putNotificationsRead(item.id)
                setIsReaload?.(!isReload)
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Thông tin lịch sửa chữa</div>

                {item.status === "NEW" ? <Tag color={"gold"}>Đang chờ xử lý</Tag> :
                  item.status === "CONFIRMED" ? <Tag color={"green"}>Đặt lịch thành công</Tag> :
                    <Tag color={"red"}>Lịch đã bị hủy</Tag>
                }
              </div>

              <div style={{ fontSize: 14, color: "#555", margin: "8px 0" }}>
                {item.message}
              </div>

              {item.booking && (
                <div style={{ fontSize: 13, color: "#444", marginBottom: 6 }}>
                  {item.booking.customerName} – {item.booking.licensePlate}
                </div>
              )}
              <div style={{ fontSize: 12, color: "#888" }}>
                {new Date(item.createdAt).toLocaleString("vi-VN")}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotificationList;
