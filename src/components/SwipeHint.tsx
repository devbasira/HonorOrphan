import { motion } from 'framer-motion';

const SwipeHint = () => {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="fixed top-[2%] right-[5%] z-[9999] px-6 py-2 flex items-center gap-2"
    >
      <span className="text-[#1A6864] font-semibold text-sm">Swipe</span>
      <motion.span
        className="text-[#1A6864] text-lg"
        animate={{
          x: [0, 8, 0], 
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        →
      </motion.span>
    </motion.div>
  );
};

export default SwipeHint;
