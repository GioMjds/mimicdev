import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LoadingProps {
    text?: string;
    timeout?: number;
    onTimeout?: () => void;
}

const Loading: FC<LoadingProps> = ({ text, timeout, onTimeout }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onTimeout) onTimeout();
        }, timeout);
        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);
    return (
        <motion.div
            className="flex justify-center items-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading && (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="text-black text-center mt-4">{text}</p>
                </div>
            )}
        </motion.div>
    )
}

export default Loading