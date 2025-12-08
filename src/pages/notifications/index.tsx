import { useContext, useEffect, useState } from "react";
import Drawer from "../../components/draw.tsx"
import { CalendarOutlined } from "@ant-design/icons";
import Button from "../../components/Button";
import NotificationList from "./components/listNotify";
import { getNotifications, getNotificationsCancelled, getNotificationsConfirmed, getNotificationsPending } from "../../services/api/notifyRepairSchedule";
import { useReloadStore } from "../../stores/useReloadStore";

const NotificationSchedule = () => {
  const [openNotify, setOpenNotify] = useState<boolean>(false);
  const [dataNotify, setDataNotify] = useState<MNotification.IRecord[]>([])
  const [dataNotifyPending, setDataNotifyPending] = useState<MNotification.IRecord[]>([])
  const [dataNotifyConfirm, setDataNotifyConfirm] = useState<MNotification.IRecord[]>([])
  const [dataNotifyCancel, setDataNotifyCancel] = useState<MNotification.IRecord[]>([])
  const [tab, setTab] = useState<1 | 2 | 3>(1)
  const [isReload, setIsReaload] = useState<boolean>(false);
  const reloadKey = useReloadStore((state) => state.reloadKey);

  useEffect(() => {
    getNotifications().then(res => setDataNotify(res.data ? res.data : []))
    getNotificationsPending().then(res => setDataNotifyPending(res.data ? res.data : []))
    getNotificationsCancelled().then(res => setDataNotifyCancel(res.data ? res.data : []))
    getNotificationsConfirmed().then(res => setDataNotifyConfirm(res.data ? res.data : []))
  }, [isReload, reloadKey])


  return (
    <div>
      <Drawer
        visible={openNotify}
        onClose={() => setOpenNotify(false)}
        width={400}
      >
        <div style={{ padding: 20 }}>
          <h3>Thông tin đặt lịch</h3>
          <div
            style={{
              display: "flex",
              gap: 20,
              borderBottom: "1px solid #f0f0f0",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <div
              onClick={() => setTab(1)}
              style={{
                paddingBottom: 8,
                cursor: "pointer",
                color: tab === 1 ? "#1677ff" : "rgba(0,0,0,0.85)",
                borderBottom: tab === 1 ? "2px solid #1677ff" : "2px solid transparent",
                transition: "0.2s",
                fontSize: 16,
              }}
            >
              Chờ xử lý
            </div>

            <div
              onClick={() => setTab(2)}
              style={{
                paddingBottom: 8,
                cursor: "pointer",
                color: tab === 2 ? "#1677ff" : "rgba(0,0,0,0.85)",
                borderBottom: tab === 2 ? "2px solid #1677ff" : "2px solid transparent",
                transition: "0.2s",
                fontSize: 16,
              }}
            >
              Đã xác nhận
            </div>

            <div
              onClick={() => setTab(3)}
              style={{
                paddingBottom: 8,
                cursor: "pointer",
                color: tab === 3 ? "#1677ff" : "rgba(0,0,0,0.85)",
                borderBottom: tab === 3 ? "2px solid #1677ff" : "2px solid transparent",
                transition: "0.2s",
                fontSize: 16,
              }}
            >
              Đã bị hủy
            </div>
          </div>
          <div>
            {tab === 1
              ? <NotificationList isReload={isReload} setIsReaload={setIsReaload} list={dataNotifyPending} />
              : tab === 2
                ? <NotificationList isReload={isReload} setIsReaload={setIsReaload} list={dataNotifyConfirm} />
                : <NotificationList isReload={isReload} setIsReaload={setIsReaload} list={dataNotifyCancel} />
            }
          </div>
        </div>
      </Drawer>


      <div style={{ position: "relative", display: "inline-block" }}>
        <Button
          onClick={() => setOpenNotify(true)}
          style={{ borderRadius: "50px", margin: "0 10px" }}
        >
          <CalendarOutlined />
        </Button>
      </div>
    </div>
  )
}

export default NotificationSchedule