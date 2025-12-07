import React, { useState, useEffect } from 'react';
import { Offcanvas, Badge, Button, Spinner, Modal } from 'react-bootstrap';
import { HistoryOutlined, ShoppingCartOutlined, DeleteOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getBookingById, deleteBooking } from '../../../services/api/partbookingApi';
import { notify } from '../../../components/Notification';

interface CartSidebarProps {
  show: boolean;
  handleClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ show, handleClose }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const fetchOrders = async () => {
    const savedIds = JSON.parse(localStorage.getItem('tracking_orders') || '[]');
    
    if (savedIds.length === 0) {
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      const promises = savedIds.map((id: string) => 
        getBookingById(id)
          .then((res: any) => {
             let data = res.data?.data || res.data;
             if (data && data.data && data.data.id) {
                 data = data.data;
             }
             // Đánh dấu là hợp lệ
             return data ? { ...data, isValid: true } : null;
          })
          .catch(() => {
             // Nếu lỗi (404 Not Found), đánh dấu là không hợp lệ để lọc bỏ
             return { id, isValid: false };
          }) 
      );

      const results = await Promise.all(promises);
      
      // Lọc lấy các đơn hàng tồn tại (isValid = true)
      const validOrders = results.filter(item => item && item.isValid);
      
      // Nếu số lượng đơn hợp lệ ít hơn số lượng ID trong cache -> Có đơn rác
      if (validOrders.length < savedIds.length) {
          const validIds = validOrders.map((o: any) => o.id);
          localStorage.setItem('tracking_orders', JSON.stringify(validIds));
          // Không cần thông báo lỗi cho người dùng, cứ âm thầm xóa
      }

      setOrders(validOrders.reverse());
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) fetchOrders();
  }, [show]);

  useEffect(() => {
    const handleUpdate = () => { if (show) fetchOrders(); };
    window.addEventListener('cart-updated', handleUpdate);
    return () => window.removeEventListener('cart-updated', handleUpdate);
  }, [show]);

  const onRequestDelete = (id: string) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    const targetOrder = orders.find(o => o.id === deleteId);
    if (!targetOrder) return;

    setProcessing(true);
    try {
        if (!targetOrder.isActive) {
            await deleteBooking(deleteId);
            notify({ 
                title: "Thành công", 
                type: "success", 
                description: "Đơn hàng đã được hủy thành công." 
            });
        } 
        else {
             notify({ 
                title: "Thành công", 
                type: "success", 
                description: "Đã xóa đơn hàng khỏi danh sách theo dõi." 
            });
        }

        const savedIds = JSON.parse(localStorage.getItem('tracking_orders') || '[]');
        const newIds = savedIds.filter((id: string) => id !== deleteId);
        localStorage.setItem('tracking_orders', JSON.stringify(newIds));
        
        fetchOrders();
        window.dispatchEvent(new Event('cart-updated'));
        setShowConfirm(false);
        setDeleteId(null);

    } catch (error: any) {
        notify({ 
            title: "Lỗi", 
            type: "error", 
            description: error?.response?.data?.message || "Không thể hủy đơn hàng." 
        });
    } finally {
        setProcessing(false);
    }
  };

  const renderStatus = (isActive: boolean) => {
      if (isActive) {
          return <Badge bg="success" className="position-absolute top-0 end-0 m-2">Đã xác nhận</Badge>
      } else {
          return <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">Chờ xác nhận</Badge>
      }
  }

  const targetItem = orders.find(o => o.id === deleteId);
  const isConfirmed = targetItem?.isActive;

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end" className="font-sans" style={{ width: '400px' }}>
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold d-flex align-items-center gap-2">
            <HistoryOutlined /> Đơn hàng đang theo dõi
          </Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="bg-light p-0">
          {loading ? (
             <div className="text-center py-5"><Spinner animation="border" variant="primary"/></div>
          ) : orders.length > 0 ? (
            <div className="p-3 d-flex flex-column gap-3">
              {orders.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded shadow-sm border position-relative">
                  
                  {renderStatus(item.isActive)}
                  
                  <h6 className="fw-bold text-primary mb-1 pe-5 text-truncate">{item.partName}</h6>
                  <div className="text-muted small mb-2">Mã: <span className="fw-bold text-dark">{item.bookingCode || '---'}</span></div>

                  <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
                    <span>Số lượng:</span>
                    <span className="fw-bold text-dark">x{item.quantity}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center small mb-2">
                      <span>Tổng tiền:</span>
                      <span className="fw-bold text-danger">
                        {item.price ? Number(Number(item.price) * item.quantity).toLocaleString('vi-VN') + 'đ' : '0đ'}
                      </span>
                  </div>

                  <div className="border-top pt-2 mt-2 d-flex justify-content-between align-items-center">
                    <small className="text-muted fst-italic" style={{fontSize: '0.75rem'}}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : ''}
                    </small>
                    
                    <Button 
                      variant={item.isActive ? "light" : "outline-danger"} 
                      size="sm" 
                      className={`border-0 ${item.isActive ? 'text-muted' : ''}`}
                      onClick={() => onRequestDelete(item.id)}
                      title={item.isActive ? "Xóa khỏi danh sách" : "Hủy đơn hàng"}
                    >
                        {item.isActive ? <DeleteOutlined /> : <span className="d-flex align-items-center gap-1"><CloseCircleOutlined /> Hủy đơn</span>}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 text-muted opacity-75">
              <ShoppingCartOutlined style={{ fontSize: 48 }} className="mb-3" />
              <p>Bạn chưa có đơn hàng nào.</p>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered size="sm">
        <Modal.Body className="text-center p-4">
          <ExclamationCircleOutlined className={isConfirmed ? "text-secondary mb-3" : "text-danger mb-3"} style={{ fontSize: '40px' }} />
          
          <h5 className="fw-bold mb-2">
              {isConfirmed ? "Xóa khỏi danh sách?" : "Hủy đơn hàng này?"}
          </h5>
          
          <p className="text-muted small mb-4">
            {isConfirmed 
                ? "Đơn hàng đã được xác nhận. Bạn chỉ xóa nó khỏi danh sách theo dõi của mình." 
                : "Đơn hàng chưa được xác nhận. Hành động này sẽ hủy yêu cầu đặt hàng vĩnh viễn."}
          </p>
          
          <div className="d-flex justify-content-center gap-2">
            <Button variant="light" onClick={() => setShowConfirm(false)} className="w-50 rounded-pill" disabled={processing}>
              Đóng
            </Button>
            <Button 
                variant={isConfirmed ? "secondary" : "danger"} 
                onClick={handleConfirmDelete} 
                className="w-50 rounded-pill fw-bold"
                disabled={processing}
            >
              {processing ? <Spinner size="sm" animation="border" /> : (isConfirmed ? "Xóa theo dõi" : "Xác nhận hủy")}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartSidebar;