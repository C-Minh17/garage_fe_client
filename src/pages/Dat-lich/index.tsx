import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Form from '../../components/FormBase';
import Button from '../../components/Button';
import SelectServices from '../Dich-vu/components/selectService';


const BookingForm = () => {

  const onSubmit = (values: any) => {
    console.log("Submit values:", values);
  };

  return (
    <div style={{
      background: '#fff',
      padding: 24,
      borderRadius: 8,
      border: '1px solid #e5e7eb',
      maxWidth: 800,
      margin: '40px auto'
    }}>
      <h4 style={{ fontWeight: 600, marginBottom: 5 }}>Thông tin khách hàng và xe</h4>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>Xác nhận thông tin của bạn</p>

      <Form onFinish={onSubmit}>
        <Row className="gy-2 gx-2">
          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Họ và tên</label>
            <Form.Input name="fullName" placeholder="Nhập họ tên" />
          </Col>

          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Số điện thoại</label>
            <Form.Input name="phone" placeholder="Nhập số điện thoại" />
          </Col>

          <Col xs={12} sm={12}>
            <label className="form-label" style={{ margin: 5 }}>Email</label>
            <Form.Input name="email" placeholder="Nhập email" />
          </Col>

          <Col xs={12} style={{ marginTop: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
              <span></span> Chọn dịch vụ
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Dịch vụ</label>
            <SelectServices name='' />
          </Col>

          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Chọn ngày</label>
            <Form.Input type='date' name='' />
          </Col>

          <Col xs={12} style={{ marginTop: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
              <span>🚗</span> Thông tin xe
            </div>
          </Col>

          <Col xs={12} sm={4}>
            <label className="form-label required" style={{ margin: 5 }}>Biển số xe</label>
            <Form.Input name="licensePlate" placeholder="51A-XXXXX" />
          </Col>

          <Col xs={12} sm={4}>
            <label className="form-label" style={{ margin: 5 }}>Hãng xe</label>
            <Form.Input
              name="carBrand"
              style={{ display: 'block', width: '100%' }}
            >

            </Form.Input>
          </Col>

          <Col xs={12} sm={4}>
            <label className="form-label" style={{ margin: 5 }}>Dòng xe</label>
            <Form.Input name="carModel" placeholder="Ví dụ: Camry" />
          </Col>

          <Col xs={12} sm={12}>
            <label className="form-label" style={{ margin: 5 }}>Ghi chú</label>
            <Form.Input
              name="note"
              placeholder="Mô tả tình trạng xe hoặc yêu cầu đặc biệt..."
              style={{ minHeight: 80 }}
            />
          </Col>
        </Row>

        <div style={{
          backgroundColor: "#f9fafb",
          padding: 16,
          borderRadius: 8,
          marginTop: 20,
          border: '1px solid #f3f4f6'
        }}>
          <h5 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Tóm tắt đặt lịch</h5>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8, color: '#4b5563' }}>
            <span>Ngày giờ</span>
            <span>24/12/2025 - 14:00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8, color: '#4b5563' }}>
            <span>Dịch vụ</span>
            <span>1 dịch vụ</span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 12, paddingTop: 12, borderTop: '1px solid #e5e7eb',
            fontWeight: 600, color: '#111827'
          }}>
            <span>Tổng cộng</span>
            <span style={{ color: '#2563eb', fontSize: 16 }}>100.000đ</span>
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20
        }}>
          <Button
            type="default"
            onClick={() => console.log('Back')}
            style={{ margin: "10px 0", background: '#fff', border: '1px solid #d9d9d9' }}
          >
            quay lai
          </Button>

          <Button
            type="orangeStyle"
            style={{ margin: "10px 0", backgroundColor: '#3b82f6', color: 'white', border: 'none' }}
            htmlType="submit"
          >
            dat lịch
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default BookingForm;