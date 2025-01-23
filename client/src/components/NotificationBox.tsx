import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface NotificationProps {
  type: string;
  message: string;    
  isVisible: boolean;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ type, message, isVisible, onClose }) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) onClose();

    return () => clearInterval(intervalId);
  }, [timer, onClose]);

  

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-5 right-5 min-w-md p-4 rounded-lg bg-white shadow-md z-1000 flex items-center justify-between ${type === 'success' ? 'border-l-4 border-l-green-500' : type === 'error' ? 'border-l-4 border-l-red-500' : ''}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-3xl flex items-center justify-center min-w-9">
              {type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
            </span>
            <p className="text-gray-600 text-base leading-5 m-0 py-0.5">{message}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <motion.div 
              className="bg-green-500 h-1"
              initial={{ width: '100%' }}
              animate={{ width: `${(timer / 5) * 100}%` }}
              transition={{ duration: 5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;