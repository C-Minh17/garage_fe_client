import { OpenAIOutlined } from '@ant-design/icons';
import { ColorStyle } from '../styles/colors';
import Button from '../components/Button';
import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const Header = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState("");
  const screen = useBreakpoint()
  const isMobile = screen.sm
  const styleLinkHover = {
    color: ColorStyle.SidebarAccent,
    fontWeight: 600,
  };

  const styleLinkActive = {
    color: ColorStyle.SidebarAccent,
    fontWeight: 600,
  };

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
  return (
    <>
      <div style={{
        height: 65,
        backgroundColor: "#ddd",
        padding: "0 50px",

        background: ColorStyle.GradientPrimary,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0
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
          <div>
            <Button>Đăng xuất</Button>
          </div>
        </div>
      </div>
      <div style={{ height: 65 }}></div>
    </>
  )
}

export default Header