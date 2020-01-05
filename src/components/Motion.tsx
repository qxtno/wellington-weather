import React from 'react';
import { motion } from 'framer-motion';

export const Motion: React.FC<{ open: boolean }> = ({ open = false }) => {
  const y_state = open ? 0 : '100%';

  return (
    <motion.div animate={{ y: y_state }}>
      <div className="bg-pink-200">hej</div>
    </motion.div>
  );
};
