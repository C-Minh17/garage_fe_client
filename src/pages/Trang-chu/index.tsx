import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { 
  ArrowRightOutlined, 
  ToolOutlined, 
  SafetyCertificateOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  PhoneOutlined
} from '@ant-design/icons';
import { getServices } from '../../services/api/servicesApi';

const convertBrokenObjectToArray = (res: any): MService.IRecord[] => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (res.data && typeof res.data === 'object') {
     return Object.values(res.data);
  }
  return [];
};

const HomePage = () => {
  const [services, setServices] = useState<MService.IRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await getServices();
        const data = convertBrokenObjectToArray(res);
        setServices(data.slice(0, 6));
      } catch (error) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 font-sans">
      
      <section className="bg-primary text-white py-5">
        <Container className="py-5 text-center">
          <h1 className="display-4 fw-bold mb-4">
            Dịch vụ sửa chữa ô tô <span className="text-info">chuyên nghiệp</span>
          </h1>
          <p className="lead mb-5 mx-auto opacity-75" style={{ maxWidth: '800px' }}>
            Hệ thống chăm sóc xe hơi hàng đầu với đội ngũ kỹ thuật viên giàu kinh nghiệm.
          </p>
          
          <div className="d-flex justify-content-center gap-3">
            <Link to="/bookcalendar" style={{textDecoration: 'none'}}>
              <Button variant="warning" size="lg" className="fw-bold d-flex align-items-center gap-2 rounded-pill px-4 shadow">
                Đặt lịch ngay <ArrowRightOutlined />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline-light" size="lg" className="fw-bold rounded-pill px-4">
                Dịch Vụ
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Tại sao chọn AutoPro?</h2>
            <p className="text-muted">Cam kết chất lượng dịch vụ hàng đầu</p>
          </div>
          
          <Row className="g-4">
            {[
              { icon: <ToolOutlined />, title: "Kỹ thuật giỏi", text: "Đội ngũ kỹ thuật viên tay nghề cao." },
              { icon: <SafetyCertificateOutlined />, title: "Bảo hành dài hạn", text: "Cam kết bảo hành lên đến 12 tháng." },
              { icon: <ClockCircleOutlined />, title: "Tiết kiệm thời gian", text: "Đặt lịch online, không phải chờ đợi." },
              { icon: <CheckCircleOutlined />, title: "Phụ tùng chính hãng", text: "100% nguồn gốc rõ ràng." }
            ].map((item, idx) => (
              <Col md={6} lg={3} key={idx}>
                <Card className="h-100 border-0 shadow-sm text-center p-4">
                  <div className="mx-auto mb-3 bg-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60, fontSize: 24 }}>
                    {item.icon}
                  </div>
                  <h5 className="fw-bold text-dark">{item.title}</h5>
                  <p className="text-muted small mb-0">{item.text}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Dịch vụ phổ biến</h2>
              <p className="text-muted mb-0">Bảng giá tham khảo các dịch vụ tại Garage</p>
            </div>
            <Link to="/services">
              <Button variant="outline-secondary" size="sm" className="rounded-pill px-3 fw-bold bg-white">
                Xem tất cả <ArrowRightOutlined className="ms-1"/>
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
               <Spinner animation="border" variant="primary" />
            </div>
          ) : services.length > 0 ? (
            <Row className="g-3">
              {services.map(service => (
                <Col lg={6} key={service.id || service.serviceCode}>
                  <Card className="border-0 shadow-sm h-100 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="flex-grow-1 pe-3">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="fw-bold text-dark mb-0 text-truncate" style={{maxWidth: '250px'}} title={service.name}>
                            {service.name}
                          </h6>
                          {service.price && service.price > 1000000 && (
                            <Badge bg="warning" text="dark" pill>Phổ biến</Badge>
                          )}
                        </div>
                        <div className="text-muted small">
                         {service.price ? 'Từ ' + Number(service.price).toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
                        </div>
                      </div>
                      <Link to="/bookcalendar">
                        <Button variant="primary" size="sm" className="rounded-pill px-3 fw-bold">
                          Đặt lịch
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5 text-muted">Không có dữ liệu dịch vụ</div>
          )}
        </Container>
      </section>

      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="fw-bold mb-3">Sẵn sàng chăm sóc xe của bạn?</h2>
          <p className="mb-4 opacity-75">Liên hệ ngay để được tư vấn miễn phí</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/bookcalendar">
              <Button variant="light" className="px-4 py-2 rounded-3 fw-bold text-primary border-0">
                Đặt lịch Online
              </Button>
            </Link>
            <Button variant="outline-light" className="px-4 py-2 rounded-3 d-flex align-items-center gap-2">
              <PhoneOutlined /> 0123 456 789
            </Button>
          </div>
        </Container>
      </section>

    </div>
  );
};

export default HomePage;