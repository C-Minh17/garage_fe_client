import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TableBase, { Column } from '../../../components/BaseTable';
import { formatCurrency } from '../../../utils/formatCurrency';
import Tag from '../../../components/Tag';

const DetailNotify = ({ data }: { data: MNotification.IRecord | undefined }) => {
  if (!data) return <div>No data provided</div>;

  const columnsService: Column<any>[] = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render(value) {
        return (
          <div>
            {formatCurrency(value)}
          </div>
        )
      }
    },
  ];

  return (
    <div style={{ padding: '20px 10px', fontSize: '14px', color: '#333', maxHeight: "80vh", overflowY: "auto" }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #dee2e6', paddingBottom: '15px' }}>
        <h5 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Thông tin đặt hàng</h5>

        <Row style={{ marginBottom: '5px' }}>
          <Col xs={12} md={3} style={{ fontWeight: '600' }}>Title:</Col>
          <Col xs={12} md={9}>{data.title}</Col>
        </Row>

        <Row style={{ marginBottom: '5px' }}>
          <Col xs={12} md={3} style={{ fontWeight: '600' }}>Message:</Col>
          <Col xs={12} md={9}>{data.message}</Col>
        </Row>

        <Row style={{ marginBottom: '5px' }}>
          <Col xs={12} md={3} style={{ fontWeight: '600' }}>Trạng thái:</Col>
          <Col xs={12} md={9}>{data.status === "NEW" ? <Tag color={"gold"}>Đang xử lý</Tag> : data.status === "CONFIRMED" ? <Tag color={"green"}>Đặt lịch thành công</Tag> : <Tag color={"red"}>Lịch đã bị hủy</Tag>}</Col>
        </Row>

        <Row style={{ marginBottom: '5px' }}>
          <Col xs={12} md={3} style={{ fontWeight: '600' }}>Created At:</Col>
          <Col xs={12} md={9}>
            {new Date(data.createdAt).toLocaleString("vi-VN")}
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '20px', borderBottom: '1px solid #dee2e6', paddingBottom: '15px' }}>
        <h5 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#0d6efd' }}>Thông tin Booking</h5>

        <Row>
          <Col md={6}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Customer Name:</strong>
              <span style={{ marginLeft: '5px' }}>{data.booking.customerName}</span>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>Phone:</strong>
              <span style={{ marginLeft: '5px' }}>{data.booking.customerPhone}</span>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>Email:</strong>
              <span style={{ marginLeft: '5px' }}>{data.booking.customerEmail}</span>
            </div>
          </Col>

          <Col md={6}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Car:</strong>
              <span style={{ marginLeft: '5px' }}>{data.booking.carBrand} - {data.booking.carModel}</span>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>License Plate:</strong>
              <span style={{ marginLeft: '5px' }}>{data.booking.licensePlate}</span>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>Booking Time:</strong>
              <span style={{ marginLeft: '5px' }}>
                {new Date(data.booking.bookingTime).toLocaleString("vi-VN")}
              </span>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>Status:</strong>
              <span style={{ marginLeft: '5px' }}>{data.booking.status}</span>
            </div>
          </Col>

          <Col xs={12} style={{ marginTop: '8px' }}>
            <strong>Note:</strong>
            <span style={{ marginLeft: '5px' }}>{data.booking.note}</span>
          </Col>
        </Row>
      </div>

      <div>
        <h5 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#198754' }}>Danh sách Services đã chọn</h5>
        <TableBase
          columns={columnsService}
          dataSource={data.services}
        />
      </div>
    </div>
  );
};

export default DetailNotify;
