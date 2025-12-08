import React from 'react';
import ReactDOM from 'react-dom';
import './Drawer.scss';


interface DrawerProps {
  visible: boolean;
  width?: number | string;
  onClose?: () => void;
  maskClosable?: boolean;
  children?: React.ReactNode;
}


const Drawer: React.FC<DrawerProps> = ({
  visible,
  width = 360,
  onClose,
  maskClosable = true,
  children,
}) => {
  const portal = document.getElementById('drawer-root') || (() => {
    const el = document.createElement('div');
    el.id = 'drawer-root';
    document.body.appendChild(el);
    return el;
  })();


  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
  };


  const handleMaskClick = (e: React.MouseEvent) => {
    if (!maskClosable) return;
    if (e.target === e.currentTarget) onClose?.();
  };


  const drawer = (
    <div className={`drawer ${visible ? 'open' : ''}`}>
      <div className={`drawer-mask ${visible ? 'open' : ''}`} onMouseDown={handleMaskClick} />

      <div></div>
      <div className={`drawer-panel ${visible ? 'open' : ''}`} style={style}>
        {children}
      </div>
    </div>
  );


  return ReactDOM.createPortal(drawer, portal);
};


export default Drawer;