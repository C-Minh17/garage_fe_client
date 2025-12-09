import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { getBookingById } from '../../../services/api/partbookingApi';

interface FloatingCartProps {
  onClick: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onClick }) => {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  const updateCount = () => {
    const savedIds = JSON.parse(localStorage.getItem('tracking_orders') || '[]');
    const newCount = savedIds.length;
    
    setCount(prev => {
        if (newCount !== prev) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 300);
        }
        return newCount;
    });
  };

  const validateCart = async () => {
    const savedIds = JSON.parse(localStorage.getItem('tracking_orders') || '[]');
    if (savedIds.length === 0) return;

    try {
      const checks = savedIds.map((id: string) => 
        getBookingById(id)
          .then((res: any) => {

             let data = res.data?.data || res.data;
             return data ? true : false;
          })
          .catch(() => false) 
      );

      const results = await Promise.all(checks);
      
      const validIds = savedIds.filter((_: string, index: number) => results[index]);
      
      if (validIds.length !== savedIds.length) {
          localStorage.setItem('tracking_orders', JSON.stringify(validIds));
          window.dispatchEvent(new Event('cart-updated'));
      }
    } catch (error) {
      console.error("Lỗi kiểm tra giỏ hàng", error);
    }
  };

  useEffect(() => {
    updateCount();
    validateCart();

    window.addEventListener('cart-updated', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
        window.removeEventListener('cart-updated', updateCount);
        window.removeEventListener('storage', updateCount);
    };
  }, []);

  if (count === 0) return null;

  return (
    <div className="position-fixed" style={{ bottom: '30px', right: '30px', zIndex: 1050 }}>
      <Button
        variant="primary"
        className={`rounded-circle shadow-lg d-flex align-items-center justify-content-center position-relative ${animate ? 'cart-bounce' : ''}`}
        style={{ width: '60px', height: '60px', border: '2px solid #fff' }}
        onClick={onClick}
      >
        <ShoppingCartOutlined style={{ fontSize: '24px' }} />
        <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle border border-light rounded-circle">
          {count}
        </Badge>
      </Button>
      <style>{`
          .cart-bounce { animation: bounce 0.3s ease-in-out; }
          @keyframes bounce { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default FloatingCart;