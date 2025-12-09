import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layout/header';
import Footer from './layout/footer';
import { ColorStyle } from './styles/colors';

const MainLayout = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: ColorStyle.BgLayout
    }}>
      <Header />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;