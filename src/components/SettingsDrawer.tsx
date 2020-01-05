import React from 'react';
import { motion } from 'framer-motion';
import { useAppState, useDispatch } from '../store/store';

export const SettingsDrawer: React.FC = () => {
  const { notSaved } = useAppState();
  const settingsDrawerOpen = notSaved?.settingsDrawerOpen;
  const dispatch = useDispatch();
  const y_state = settingsDrawerOpen ? 0 : '100%';

  return (
    <motion.div
      className="absolute flex flex-col-reverse inset-0"
      animate={{ y: y_state }}
      transition={{ type: 'tween' }}
      style={{ transform: ' translateY(100%)', paddingBottom: '60px' }}
    >
      <div className="p-4 bg-blue-300">
        <p className="py-2">dark mode</p>
        <p className="py-2">remove locations</p>
      </div>
      <div
        className="flex-1"
        onClick={() => {
          dispatch({ type: 'CLOSE_SETTINGS_DRAWER' });
        }}
      ></div>
    </motion.div>
  );
};
