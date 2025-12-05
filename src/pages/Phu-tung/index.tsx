import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Spinner } from 'react-bootstrap';
import { SearchOutlined, ShoppingCartOutlined, CheckCircleOutlined,SafetyCertificateOutlined,RocketOutlined,PhoneOutlined,FilterOutlined} from '@ant-design/icons';
import { getPart, searchParts } from '../../services/api/partApi';
import { notify } from '../../components/Notification';
import OrderPartModal from './components/form';

const PartsPage = () => {
  const [parts, setParts] = useState<MPart.IRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState<MPart.IRecord | null>(null);

  const fetchData = async (keyword: string = '') => {
    setLoading(true);
    try {
      let res;
      if (keyword.trim()) {
        res = await searchParts(keyword);
      } else {
        res = await getPart();
      }
      
      if (res && res.data) {
        const data = Array.isArray(res.data) ? res.data : [];
        setParts(data);
      } else {
        setParts([]);
      }
    } catch (error) {
      setParts([]);
      notify({
        title: "Lỗi tải dữ liệu",
        type: "error",
        description: "Không thể lấy danh sách phụ tùng. Vui lòng kiểm tra kết nối!",
        duration: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOpenOrder = (part: MPart.IRecord) => {
    if (part.stock <= 0) {
      notify({
        title: "Hết hàng",
        type: "info",
        description: "Sản phẩm này hiện đang tạm hết hàng.",
      });
      return;
    }
    setSelectedPart(part);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPart(null);
  };

  return (
    <div className="min-vh-100 bg-light font-sans">
      <section className="bg-white py-5 text-center shadow-sm border-bottom">
        <Container>
          <h1 className="fw-bold text-primary mb-2">Phụ tùng ô tô chính hãng</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>Cung cấp phụ tùng uy tín, giá cả cạnh tranh và bảo hành dài hạn</p>
          
          <div className="d-flex justify-content-center mt-4">
             <InputGroup style={{ maxWidth: '600px' }} className="shadow-sm rounded-pill overflow-hidden">
                <InputGroup.Text className="bg-white border-0 ps-4"><SearchOutlined /></InputGroup.Text>
                <Form.Control 
                  placeholder="Tìm kiếm phụ tùng (Mã PT, Tên...)" 
                  className="border-0 shadow-none py-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button variant="primary" className="px-4 fw-bold" onClick={handleSearch}>Tìm kiếm</Button>
             </InputGroup>
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          {loading ? (
             <div className="text-center py-5"><Spinner animation="border" variant="primary"/></div>
          ) : parts.length > 0 ? (
            <Row className="g-4">
              {parts.map((part) => (
                <Col md={6} lg={3} key={part.id}>
                  <Card className="h-100 border-0 shadow-sm hover-top transition-all">
                    <Card.Body className="d-flex flex-column p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <Badge bg="light" text="dark" className="border">
                          {part.supplier?.name || 'NCC Khác'}
                        </Badge>
                        <Badge bg={part.stock > 0 ? "success" : "danger"} className="bg-opacity-10 text-success rounded-pill">
                          {part.stock > 0 ? "Còn hàng" : "Hết hàng"}
                        </Badge>
                      </div>
                      
                      <h6 className="fw-bold text-dark mb-1 text-truncate" title={part.name}>{part.name}</h6>
                      <small className="text-muted d-block mb-3">{part.partCode}</small>
                      
                      <p className="text-muted small mb-3 flex-grow-1 line-clamp-2">
                        {part.description || "Sản phẩm chính hãng chất lượng cao."}
                      </p>

                      <div className="d-flex align-items-center gap-2 text-primary small mb-3">
                        <CheckCircleOutlined /> Bảo hành chính hãng
                      </div>

                      <div className="pt-3 border-top d-flex justify-content-between align-items-center mt-auto">
                        <span className="fw-bold text-primary fs-5">
                          {Number(part.price).toLocaleString('vi-VN')}đ
                        </span>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="d-flex align-items-center gap-2 rounded-pill px-3"
                          disabled={part.stock <= 0}
                          onClick={() => handleOpenOrder(part)}
                        >
                           <ShoppingCartOutlined /> Đặt mua
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <FilterOutlined style={{ fontSize: '48px' }} className="text-muted opacity-50 mb-3" />
              <h5 className="text-muted">Không tìm thấy phụ tùng nào</h5>
            </div>
          )}
        </Container>
      </section>

      <section className="py-5 bg-white border-top">
        <Container>
           <Row className="text-center g-4">
              <Col md={4}>
                 <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{width: 60, height: 60}}>
                    <SafetyCertificateOutlined className="fs-3 text-primary"/>
                 </div>
                 <h6 className="fw-bold">100% Chính hãng</h6>
                 <p className="text-muted small">Cam kết phụ tùng chính hãng, nguồn gốc rõ ràng</p>
              </Col>
              <Col md={4}>
                 <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{width: 60, height: 60}}>
                    <RocketOutlined className="fs-3 text-primary"/>
                 </div>
                 <h6 className="fw-bold">Giao hàng nhanh</h6>
                 <p className="text-muted small">Giao hàng trong ngày và các tỉnh lân cận</p>
              </Col>
              <Col md={4}>
                 <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{width: 60, height: 60}}>
                    <PhoneOutlined className="fs-3 text-primary"/>
                 </div>
                 <h6 className="fw-bold">Hỗ trợ 24/7</h6>
                 <p className="text-muted small">Tư vấn miễn phí qua hotline 0123 456 789</p>
              </Col>
           </Row>
        </Container>
      </section>

      <OrderPartModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        part={selectedPart} 
      />
    </div>
  );
};

export default PartsPage;