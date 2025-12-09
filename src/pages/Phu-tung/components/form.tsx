import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import { notify } from '../../../components/Notification';
import Form from '../../../components/FormBase';
import { createBooking } from '../../../services/api/partbookingApi';

interface OrderPartModalProps {
  show: boolean;
  handleClose: () => void;
  part: MPart.IRecord | null;
}

interface IOrderFormValues {
  customerName: string;
  phoneNumber: string;
  address: string;
  quantity: number;
  note: string;
}

const OrderPart: React.FC<OrderPartModalProps> = ({ show, handleClose, part }) => {
  const [initialValues, setInitialValues] = useState<IOrderFormValues>({
    customerName: '',
    phoneNumber: '',
    address: '',
    quantity: 1,
    note: ''
  });

  useEffect(() => {
    if (show) {
      const savedInfo = localStorage.getItem('user_info_cache');
      if (savedInfo) {
        setInitialValues({ ...JSON.parse(savedInfo), quantity: 1, note: '' });
      }
    }
  }, [show]);

  const handleSubmit = async (values: IOrderFormValues) => {
    if (!values.customerName?.trim()) {
      notify({ title: "Thiếu thông tin", type: "warning", description: "Vui lòng nhập Họ tên khách hàng!" });
      return;
    }
    if (!values.phoneNumber?.trim()) {
      notify({ title: "Thiếu thông tin", type: "warning", description: "Vui lòng nhập Số điện thoại!" });
      return;
    }
    if (!values.address?.trim()) {
      notify({ title: "Thiếu thông tin", type: "warning", description: "Vui lòng nhập Địa chỉ nhận hàng!" });
      return;
    }
    if (part && Number(values.quantity) > Number(part.stock)) {
      notify({ 
        title: "Số lượng không hợp lệ", 
        type: "warning", 
        description: `Số lượng đặt (${values.quantity}) vượt quá tồn kho hiện tại (${part.stock})!` 
      });
      return; 
    }
    try {
      const payload: MPartBooking.IRequest = {
        partId: part?.id || '',
        supplierId: part?.supplierId || 'DEFAULT',
        supplierCode: 'DEFAULT',
        quantity: Number(values.quantity),
        note: values.note,
        customerName: values.customerName,
        phone: values.phoneNumber,
        address: values.address,
        isActive: false,
      };
      const phoneRegex = /^(0)\d{9}$/;     
      if (!phoneRegex.test(values.phoneNumber.trim())) {
        notify({ 
          title: "Sai", 
          type: "warning", 
          description: "Số điện thoại không hợp lệ!" 
        });
        return;
      }

      const res: any = await createBooking(payload);

      if (res && res.data) {
        const bookingData = res.data.data || res.data;

        if (bookingData && bookingData.id) {
          const savedIds = JSON.parse(localStorage.getItem('tracking_orders') || '[]');
          savedIds.push(bookingData.id);
          localStorage.setItem('tracking_orders', JSON.stringify(savedIds));

          localStorage.setItem('user_info_cache', JSON.stringify({
            customerName: values.customerName,
            phoneNumber: values.phoneNumber,
            address: values.address
          }));

          window.dispatchEvent(new Event('cart-updated'));
        }
      }

      notify({ title: "Thành công", type: "success", description: "Đã gửi yêu cầu đặt hàng!" });
      handleClose();
    } catch (error: any) {
      notify({ title: "Thất bại", type: "error", description: error?.response?.data?.message || "Lỗi hệ thống" });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Form<IOrderFormValues> initialValues={initialValues} onFinish={handleSubmit}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Đặt mua phụ tùng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {part && (
            <div className="bg-light p-3 rounded mb-4 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">{part.name}</h6>
                <small className="text-muted">{part.partCode}</small>
              </div>
              <div className="text-end">
                <div className="fw-bold text-primary fs-5">
                  {Number(part.price).toLocaleString('vi-VN')}đ
                </div>
              </div>
            </div>
          )}

          <Row>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label className="small fw-bold">
                  Họ tên <span className="text-danger">*</span>
                </BootstrapForm.Label>
                <Form.Input name="customerName" placeholder="Nhập họ tên của bạn" />
              </BootstrapForm.Group>
            </Col>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label className="small fw-bold">
                  Số điện thoại <span className="text-danger">*</span>
                </BootstrapForm.Label>
                <Form.Input name="phoneNumber" placeholder="Nhập số điện thoại liên hệ" />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label className="small fw-bold">
              Số lượng <span className="text-danger">*</span>
            </BootstrapForm.Label>
            <Form.Input name="quantity" type="number" min={1} />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label className="small fw-bold">
              Địa chỉ <span className="text-danger">*</span>
            </BootstrapForm.Label>
            <Form.Input name="address" placeholder="Số nhà, đường, phường/xã..." />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label className="small fw-bold">Ghi chú</BootstrapForm.Label>
            <Form.Input name="note" placeholder="Yêu cầu thêm (nếu có)" />
          </BootstrapForm.Group>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" onClick={handleClose} className="rounded-pill px-4">
            Hủy
          </Button>
          <Button variant="primary" type="submit" className="rounded-pill px-4 fw-bold">
            Xác nhận
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrderPart;
