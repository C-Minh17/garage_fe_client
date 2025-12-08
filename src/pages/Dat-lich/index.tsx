import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Form, { FormContext } from '../../components/FormBase';
import Button from '../../components/Button';
import SelectServices from '../Dich-vu/components/selectService';
import { postRepairSchedule } from '../../services/api/repairSchedule';
import { notify } from '../../components/Notification';
import { useReloadStore } from '../../stores/useReloadStore';


const BookingForm = () => {
  // const { value, setFieldValue, resetForm } = useContext(FormContext)
  const [isReload, setIsReload] = useState<boolean>(false);
  const [formKey, setFormKey] = useState(Date.now());
  const reload = useReloadStore((state) => state.reload);

  const onSubmit = async (values: MRepairSchedule.IRecord) => {
    console.log("Submit values:", values);
    const res = await postRepairSchedule(values)
    if (res.success) {
      notify({ title: "Success", type: "success", description: "Đã thêm nhà cung cấp mới" })
      setIsReload?.(!isReload)
      setFormKey(Date.now())
      reload()
    } else {
      notify({ title: "Error", type: "error", description: res.message })
    }
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

      <Form key={formKey} onFinish={onSubmit}>
        <Row className="gy-2 gx-2">
          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Họ và tên</label>
            <Form.Input name="customerName" placeholder="Nhập họ tên" />
          </Col>

          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Số điện thoại</label>
            <Form.Input name="customerPhone" placeholder="Nhập số điện thoại" />
          </Col>

          <Col xs={12} sm={12}>
            <label className="form-label" style={{ margin: 5 }}>Email</label>
            <Form.Input name="customerEmail" placeholder="Nhập email" />
          </Col>

          <Col xs={12} style={{ marginTop: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
              <span></span> Chọn dịch vụ
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Dịch vụ</label>
            <SelectServices name='serviceIds' multiple={true} />
          </Col>

          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Chọn ngày</label>
            <Form.Input type='datetime-local' name='bookingTime' />
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
          display: "flex",
          justifyContent: "end",
          marginTop: 20
        }}>
          <Button
            type="gradientPrimary"
            style={{ margin: "10px 0", color: 'white', border: 'none' }}
            htmlType="submit"
          >
            Đặt lịch ngay
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;