import { Link } from 'react-router-dom';
import {FacebookFilled, YoutubeFilled, InstagramFilled, EnvironmentOutlined, PhoneOutlined, MailOutlined,ClockCircleOutlined } from '@ant-design/icons';
import { ColorStyle } from '../styles/colors';

const Footer = () => {
  const columnStyle: React.CSSProperties = { 
    flex: '1 1 250px', 
    marginBottom: '20px', 
    padding: '0 15px' 
  };
  
  const titleStyle: React.CSSProperties = { 
    fontSize: '16px', 
    fontWeight: 700, 
    marginBottom: '20px', 
    color: ColorStyle.Foreground,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const linkStyle: React.CSSProperties = { 
    textDecoration: 'none', 
    color: ColorStyle.TextSecondary, 
    marginBottom: '10px', 
    display: 'block',
    fontSize: '14px',
    transition: ColorStyle.TransitionSmooth
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex', 
    alignItems: 'start', 
    gap: '10px', 
    color: ColorStyle.TextSecondary, 
    marginBottom: '12px',
    fontSize: '14px',
    lineHeight: '1.6'
  };

  return (
    <footer style={{ 
      backgroundColor: ColorStyle.BgBase, 
      borderTop: `1px solid ${ColorStyle.Border}`, 
      padding: '60px 50px 20px',
      marginTop: 'auto'
    }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        
        <div style={columnStyle}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            marginBottom: '15px' 
          }}>
            <div style={{ 
              color: ColorStyle.Accent, 
              fontSize: '28px' 
            }}>
              <EnvironmentOutlined/> 
            </div>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: ColorStyle.PrimaryUi 
            }}>AutoPro</span>
          </div>
          <p style={{ color: ColorStyle.TextTertiary, fontSize: '14px', lineHeight: '1.6' }}>
            Dịch vụ sửa chữa ô tô chuyên nghiệp, uy tín với đội ngũ kỹ thuật viên giàu kinh nghiệm.
          </p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <FacebookFilled style={{ fontSize: '24px', color: ColorStyle.TextTertiary, cursor: 'pointer' }} />
            <YoutubeFilled style={{ fontSize: '24px', color: ColorStyle.TextTertiary, cursor: 'pointer' }} />
            <InstagramFilled style={{ fontSize: '24px', color: ColorStyle.TextTertiary, cursor: 'pointer' }} />
          </div>
        </div>

        <div style={columnStyle}>
          <div style={titleStyle}>Dịch vụ</div>
          <Link to="/services" style={linkStyle}>Bảo dưỡng định kỳ</Link>
          <Link to="/services" style={linkStyle}>Sửa chữa máy - gầm</Link>
          <Link to="/services" style={linkStyle}>Đồng sơn ô tô</Link>
          <Link to="/services" style={linkStyle}>Chăm sóc xe Detailing</Link>
          <Link to="/parts" style={linkStyle}>Phụ tùng chính hãng</Link>
        </div>

        <div style={columnStyle}>
          <div style={titleStyle}>Liên hệ</div>
          <div style={itemStyle}>
            <EnvironmentOutlined style={{ color: ColorStyle.PrimaryUi, marginTop: '4px' }} /> 
            <span>Học viện CNBCVT</span>
          </div>
          <div style={itemStyle}>
            <PhoneOutlined style={{ color: ColorStyle.PrimaryUi, marginTop: '4px' }} /> 
            <span>Hotline: 0123 456 789</span>
          </div>
          <div style={itemStyle}>
            <MailOutlined style={{ color: ColorStyle.PrimaryUi, marginTop: '4px' }} /> 
            <span>cskh@autopro.vn</span>
          </div>
        </div>

        <div style={columnStyle}>
          <div style={titleStyle}>Giờ làm việc</div>
          <div style={itemStyle}>
            <ClockCircleOutlined style={{ color: ColorStyle.PrimaryUi, marginTop: '4px' }} />
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>T2 - T6:</span> 
                <span style={{ fontWeight: 600 }}>8:00 - 17:30</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Thứ 7:</span> 
                <span style={{ fontWeight: 600 }}>8:00 - 12:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: ColorStyle.Error }}>
                <span>Chủ nhật:</span> 
                <span>Nghỉ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        borderTop: `1px solid ${ColorStyle.Border}`, 
        marginTop: '40px', 
        paddingTop: '20px', 
        textAlign: 'center', 
        color: ColorStyle.TextQuaternary, 
        fontSize: '15px' 
      }}>
        @Visca varca
      </div>
    </footer>
  );
};

export default Footer;