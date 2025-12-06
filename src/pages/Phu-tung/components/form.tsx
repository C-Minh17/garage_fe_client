import React from 'react';
import { Modal, Button, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import { notify } from '../../../components/Notification';
import Form from '../../../components/FormBase';

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

const validateOrderForm = (values: IOrderFormValues) => {
  if (!values.customerName) {
    notify({
      title: "Thiếu họ tên",
      type: "warning",
      description: "Vui lòng nhập Họ tên khách hàng!",
      duration: 3000
    });
    return false;
  }

  if (!values.phoneNumber) {
    notify({
      title: "Thiếu số điện thoại",
      type: "warning",
      description: "Vui lòng nhập Số điện thoại khách hàng!",
      duration: 3000
    });
    return false;
  }

  if (!values.address) {
    notify({
      title: "Thiếu địa chỉ",
      type: "warning",
      description: "Vui lòng nhập Địa chỉ giao hàng!",
      duration: 3000
    });
    return false;
  }

  return true;
};

const OrderPart: React.FC<OrderPartModalProps> = ({ show, handleClose, part }) => {
  const initialValues: IOrderFormValues = {
    customerName: '',
    phoneNumber: '',
    address: '',
    quantity: 1,
    note: ''
  };

  const handleSubmit = async (values: IOrderFormValues) => {
    if (!validateOrderForm(values)) return;

    try {
      console.log("Submitting order:", { ...values, partId: part?.id });

      notify({
        title: "Đặt hàng thành công",
        type: "success",
        description: `Đã gửi yêu cầu đặt mua ${part?.name}`,
        duration: 3000
      });

      handleClose();
    } catch {
      notify({
        title: "Lỗi hệ thống",
        type: "error",
        description: "Không thể gửi đơn hàng, vui lòng thử lại sau.",
        duration: 3000
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Form<IOrderFormValues>
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Đặt mua phụ tùng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {part && (
            <div className="bg-light p-3 rounded mb-4 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">{part.name}</h6>
                <small className="text-muted">{part.partCode} - {part.supplier?.name}</small>
              </div>
              <div className="text-end">
                <div className="fw-bold text-primary fs-5">
                  {Number(part.price).toLocaleString('vi-VN')}đ
                </div>
                <small className={part.stock > 0 ? "text-success" : "text-danger"}>
                  {part.stock > 0 ? "Còn hàng" : "Hết hàng"}
                </small>
              </div>
            </div>
          )}

          <Row>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label className="fw-bold small">
                  Họ và tên <span className="text-danger">*</span>
                </BootstrapForm.Label>
                <Form.Input name="customerName" placeholder="Nguyễn Văn A" />
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label className="fw-bold small">
                  Số điện thoại <span className="text-danger">*</span>
                </BootstrapForm.Label>
                <Form.Input name="phoneNumber" placeholder="0912 345 678" />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label className="fw-bold small">Số lượng</BootstrapForm.Label>
            <Form.Input
              name="quantity"
              type="number"
              min={1}
              max={part?.stock}
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label className="fw-bold small">
              Địa chỉ giao hàng <span className="text-danger">*</span>
            </BootstrapForm.Label>
            <Form.Input name="address" placeholder="Số nhà, đường, phường/xã..." />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label className="fw-bold small">Ghi chú</BootstrapForm.Label>
            <Form.Input name="note" placeholder="Ghi chú thêm về đơn hàng..." />
          </BootstrapForm.Group>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" onClick={handleClose} className="px-4 rounded-pill">
            Hủy bỏ
          </Button>
          <Button variant="primary" type="submit" className="px-4 fw-bold rounded-pill">
            Xác nhận đặt hàng
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrderPart;
