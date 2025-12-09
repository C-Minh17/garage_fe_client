import React, { useState, useEffect, use } from 'react';
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
                        return data ? { ...data, isValid: true } : null;
                    })
                    .catch(() => {
                        return { id, isValid: false };
                    }) 
            );

            const results = await Promise.all(promises);
            const validOrders = results.filter(item => item && item.isValid);
            
            if (validOrders.length < savedIds.length) {
                const validIds = validOrders.map((o: any) => o.id);
                localStorage.setItem('tracking_orders', JSON.stringify(validIds));
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

    useEffect(() => {
        if (!show) return;
        const interval = setInterval(() => {
            fetchOrders();
            }, 10000);
        return () => clearInterval(interval);
    }, [show]);

    const onRequestDelete = (id: string) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return;

        const targetOrder = orders.find(o => o.id === deleteId);
        
        setProcessing(true);
        try {
            if (!targetOrder.isActive && targetOrder.status !== 'CONFIRMED' && targetOrder.status !== 'CANCELLED') {
                await deleteBooking(deleteId);
                notify({ title: "Đã hủy", type: "success", description: "Đơn hàng đã được hủy thành công." });
            } else {
                notify({ title: "Đã ẩn", type: "success", description: "Đã xóa đơn hàng khỏi danh sách theo dõi." });
            }

            const savedIds = JSON.parse(localStorage.getItem('tracking_orders') || '[]');
            const newIds = savedIds.filter((id: string) => id !== deleteId);
            localStorage.setItem('tracking_orders', JSON.stringify(newIds));
            
            fetchOrders();
            window.dispatchEvent(new Event('cart-updated'));
            setShowConfirm(false);
            setDeleteId(null);

        } catch {
            notify({ title: "Lỗi", type: "error", description: "Không thể thực hiện hành động." });
        } finally {
            setProcessing(false);
        }
    };

    const renderStatus = (item: any) => {
        if (item.status === 'CANCELLED') {
            return <Badge bg="danger" className="position-absolute top-0 end-0 m-2">Đã bị từ chối</Badge>;
        }
        if (item.isActive || item.status === 'CONFIRMED') {
            return <Badge bg="success" className="position-absolute top-0 end-0 m-2">Đã xác nhận</Badge>;
        }
        return <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">Chờ xác nhận</Badge>;
    };

    const renderActionBtn = (item: any) => {
        if (item.status === 'CANCELLED') {
            return (
                <Button 
                    variant="outline-secondary" size="sm" className="border-0 text-danger"
                    onClick={() => onRequestDelete(item.id)}
                >
                    <span className="d-flex align-items-center gap-1"><DeleteOutlined /> Xóa đơn</span>
                </Button>
            );
        }
        if (item.isActive || item.status === 'CONFIRMED') {
            return (
                <Button 
                    variant="light" size="sm" className="border-0 text-muted"
                    onClick={() => onRequestDelete(item.id)}
                >
                    <DeleteOutlined />
                </Button>
            );
        }
        return (
            <Button 
                variant="outline-danger" size="sm" className="border-0"
                onClick={() => onRequestDelete(item.id)}
            >
                <span className="d-flex align-items-center gap-1"><CloseCircleOutlined /> Hủy đơn</span>
            </Button>
        );
    };

    const targetItem = orders.find(o => o.id === deleteId);
    const isLocalDeleteOnly = targetItem?.isActive || targetItem?.status === 'CONFIRMED' || targetItem?.status === 'CANCELLED';

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '400px' }}>
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
                                    
                                    {renderStatus(item)}
                                    
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
                                        
                                        {renderActionBtn(item)}
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
                    <ExclamationCircleOutlined className={isLocalDeleteOnly ? "text-secondary mb-3" : "text-danger mb-3"} style={{ fontSize: '40px' }} />
                    
                    <h5 className="fw-bold mb-2">
                        {isLocalDeleteOnly ? "Xóa khỏi danh sách?" : "Hủy đơn hàng này?"}
                    </h5>
                    
                    <p className="text-muted small mb-4">
                        {isLocalDeleteOnly 
                            ? "Đơn hàng đã được xử lý (Duyệt/Từ chối). Bạn chỉ xóa nó khỏi danh sách theo dõi của mình." 
                            : "Hành động này sẽ hủy đơn hàng vĩnh viễn."}
                    </p>
                    
                    <div className="d-flex justify-content-center gap-2">
                        <Button variant="light" onClick={() => setShowConfirm(false)} className="w-50 rounded-pill" disabled={processing}>
                            Đóng
                        </Button>
                        <Button 
                            variant={isLocalDeleteOnly ? "secondary" : "danger"} 
                            onClick={handleConfirmDelete} 
                            className="w-50 rounded-pill fw-bold"
                            disabled={processing}
                        >
                            {processing ? <Spinner size="sm" animation="border" /> : (isLocalDeleteOnly ? "Xóa theo dõi" : "Xác nhận hủy")}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CartSidebar;
