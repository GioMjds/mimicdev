import { motion } from "framer-motion";
import { FC, useEffect } from "react"

interface ModalBoxProps {
  title: string;
  modalMsg: string;
  onClose: () => void;
  cancelBtn: string;
  primaryBtn: string;
  onPrimaryBtnClick: () => void;
}

const ModalBox: FC<ModalBoxProps> = ({ title, modalMsg, onClose, cancelBtn, primaryBtn, onPrimaryBtnClick }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    }
  }, [onClose]);

  if (!onClose) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md p-6 w-1/2"
      >
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-gray-500 mb-6">{modalMsg}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
          >
            {cancelBtn}
          </button>
          <button
            onClick={onPrimaryBtnClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            {primaryBtn}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ModalBox