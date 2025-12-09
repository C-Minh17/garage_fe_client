import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Form, InputGroup, Pagination } from 'react-bootstrap';
import { SearchOutlined, FilterOutlined,PlusCircleOutlined} from '@ant-design/icons';
import { getServices, searchServices } from '../../services/api/servicesApi';

const convertData = (res: any): any[] => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (res.data && typeof res.data === 'object') return Object.values(res.data);
  return [];
};

const ServicesPage = () => {
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [displayedServices, setDisplayedServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchData = async (query: string = '') => {
    setLoading(true);
    try {
      let res;
      if (!query.trim()) {
        res = await getServices();
      } else {
        res = await searchServices(query);
      }
      const data = convertData(res);
      setServicesList(data);
      setCurrentPage(1);
    } catch (error) {
      setServicesList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedServices(servicesList.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, servicesList]);

  const handleSearch = () => {
    fetchData(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    fetchData('');
  };

  const totalPages = Math.ceil(servicesList.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light font-sans">
      <section className="bg-white py-5 border-bottom">
        <Container>
          <div className="text-center mb-5">
            <h1 className="fw-bold text-primary mb-2">Dịch Vụ Chuyên Nghiệp</h1>
            <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
              Chúng tôi cung cấp đầy đủ các dịch vụ sửa chữa, bảo dưỡng ô tô với đội ngũ kỹ thuật viên chuyên nghiệp
            </p>
          </div>

          <Card className="border-0 shadow-sm p-2 rounded-pill mx-auto" style={{ maxWidth: '700px' }}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0 ps-4">
                <SearchOutlined className="text-dark" />
              </InputGroup.Text>
              <Form.Control 
                placeholder="Tìm kiếm dịch vụ (Ví dụ: Thay dầu, Lốp xe...)" 
                className="border-0 shadow-none py-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                variant="primary" 
                className="rounded-pill px-5 fw-bold m-1"
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </InputGroup>
          </Card>
        </Container>
      </section>

      <section className="py-5 flex-grow-1">
        <Container>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary"/>
            </div>
          ) : displayedServices.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                {/* <h5 className="fw-bold text-dark m-0">
                  Tìm thấy {servicesList.length} kết quả
                </h5> */}
                <div className="d-flex gap-2">
                  <Badge bg="primary" className="px-3 py-2 rounded-pill">Tất cả Dịch vụ</Badge>
                  {/* <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill border">Phổ biến</Badge> */}
                </div>
              </div>

              <Row className="g-4 mb-5">
                {displayedServices.map((service, index) => (
                  <Col md={6} lg={4} key={service.id || index}>
                    <Card className="h-100 border-0 shadow-sm hover-top transition-all overflow-hidden rounded-3">                      
                      <Card.Body className="d-flex flex-column p-4">
                        <Card.Title className="fw-bold fs-5 mb-3 text-dark text-truncate">
                          {service.name}
                        </Card.Title>

                        <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                          <Card.Text className="d-flex align-items-center gap-3 fw-bold">
                            <PlusCircleOutlined />{service.description}
                          </Card.Text>
                        </div>

                        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-muted small">Chi phí từ: </div>
                            <div className="fw-bold text-primary fs-5">
                              {service.price ? Number(service.price).toLocaleString('vi-VN') : 'Liên hệ'} đ
                            </div>
                          </div>
                          <Link to={`/bookcalendar`}>
                            <Button variant="outline-primary" className="rounded-pill px-4 fw-bold">
                              Đặt lịch
                            </Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center pt-3">
                  <Pagination size="lg">
                    <Pagination.Prev 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, idx) => (
                      <Pagination.Item 
                        key={idx + 1} 
                        active={idx + 1 === currentPage}
                        onClick={() => handlePageChange(idx + 1)}
                      >
                        {idx + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <div className="mb-3 opacity-25">
                <FilterOutlined style={{ fontSize: '64px' }} />
              </div>
              <h4 className="fw-bold text-muted">Không tìm thấy dịch vụ nào</h4>
              <p className="text-muted">Vui lòng thử lại với từ khóa khác</p>
              <Button variant="link" onClick={handleReset}>Xem tất cả dịch vụ</Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;