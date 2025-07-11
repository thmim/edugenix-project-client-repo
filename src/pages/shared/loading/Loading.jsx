import { motion } from "framer-motion";
import { FaCircleNotch } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <motion.div
        className="text-blue-600 text-5xl"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1.2,
        }}
      >
        <FaCircleNotch />
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 1], y: [5, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Loading magic...
      </motion.p>
    </div>
  );
};

export default Loading;
