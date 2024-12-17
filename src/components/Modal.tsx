import React from "react";
import { FaX } from "react-icons/fa6";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, open, children }) => {
  return (
    <div
      className={`w-screen h-screen fixed inset-0 flex justify-center items-center z-50 bg-black/25 ${
        open ? "visible" : "invisible"
      }`}
    >
      <div className="bg-slate-500 shadow-md shadow-black pt-8 p-4 rounded-md flex flex-col justify-center items-center relative">
        <FaX onClick={() => onClose()} className=" absolute right-4 top-4" />
        {children}
      </div>
    </div>
  );
};

export default Modal;
