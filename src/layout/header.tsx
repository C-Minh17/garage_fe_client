import { OpenAIOutlined } from '@ant-design/icons';
import { ColorStyle } from '../styles/colors';
import Button from '../components/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { deleteCookie, getCookie } from '../utils/cookie';
import { notify } from '../components/Notification';
import NotificationSchedule from '../pages/notifications';

const Header = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const screen = useBreakpoint()
  const isMobile = screen.sm
  const token = getCookie("refreshToken")

  const navigate = useNavigate()

  const styleLinkHover = {
    color: ColorStyle.SidebarAccent,
    fontWeight: 600,
  };

  const styleLinkActive = {
    color: ColorStyle.SidebarAccent,
    fontWeight: 600,
  };

  const logout = () => {
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
    notify({ title: "Success", type: "success", description: "Đăng xuất thành công" })
    navigate("/login")
  }

  const styleLink = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "8px",
    color: ColorStyle.SidebarForeground,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
    transition: ColorStyle.TransitionSmooth,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundScrolled = 'linear-gradient(135deg, hsl(221 83% 35% / 0.5), hsl(189 94% 43% / 0.5))';

  return (
    <>
      <div style={{
        height: 65,
        padding: "0 50px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? backgroundScrolled : ColorStyle.GradientPrimary,
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div ><OpenAIOutlined spin style={{
              color: ColorStyle.Accent,
              fontSize: 30
            }} /></div>
            <div style={{
              fontSize: 20,
              marginLeft: 5,
              fontWeight: 500
            }}>AutoPro</div>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center"
          }}>
            {[
              { to: "/", label: "Trang chủ" },
              { to: "/services", label: "Dịch vụ" },
              { to: "/parts", label: "Phụ tùng" },
              { to: "/bookcalendar", label: "Đặt lịch" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  ...styleLink,
                  ...(hovered === item.to ? styleLinkHover : {}),
                  ...(location.pathname === item.to ? styleLinkActive : {}),
                }}
                onMouseEnter={() => setHovered(item.to)}
                onMouseLeave={() => setHovered("")}
              >
                <span className="menu-label">{item.label}</span>
              </Link>
            ))}
          </div>
          <div style={{
            display: "flex"
          }}>
            <div>
              <NotificationSchedule />
            </div>
            <div>
              {token ? <Button onClick={logout}>Đăng Xuất</Button> : <Button onClick={() => navigate("/login")}>Đăng Nhập</Button>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 65 }}></div>
    </>
  )
}

export default Header