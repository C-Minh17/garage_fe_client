import { useEffect, useState } from "react";
import "./modal.scss";

interface ICustomModalProps {
  isOpen: boolean;
  closeModal?: () => void;
  children?: React.ReactNode;
}

const BaseModal = ({ isOpen, closeModal, children }: ICustomModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setIsVisible(true);
    else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "open" : "close"}`}
      onClick={closeModal}
    >
      <div
        className={`modal-container ${isOpen ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-close">
          {/* <OutlineClose onClick={closeModal} /> */}
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
