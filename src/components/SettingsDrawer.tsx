import React from 'react';
import { motion } from 'framer-motion';
import { useAppState, useDispatch } from '../store/store';
import { useHistory } from 'react-router-dom';

export const SettingsDrawer: React.FC = () => {
  const { notSaved, savedLocations } = useAppState();
  const settingsDrawerOpen = notSaved?.settingsDrawerOpen;
  const dispatch = useDispatch();
  const y_state = settingsDrawerOpen ? 0 : '100%';
  const history = useHistory();

  function closeSettingsDrawer() {
    dispatch({ type: 'CLOSE_SETTINGS_DRAWER' });
  }

  return (
    <motion.div
      className="absolute flex flex-col-reverse inset-0"
      animate={{ y: y_state }}
      transition={{ type: 'tween' }}
      style={{ transform: ' translateY(100%)', paddingBottom: '60px' }}
    >
      <div className="p-4 bg-blue-300">
        <div className="max-w-md mx-auto">
          <button className="w-full rounded p-2 hover:bg-blue-400">
            TODO: Dark mode: on/off
          </button>
          {savedLocations?.length > 0 && (
            <button
              onClick={() => {
                closeSettingsDrawer();
                history.push('/delete-saved-location');
              }}
              className="w-full rounded p-2 hover:bg-blue-400"
            >
              Delete saved location
            </button>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={closeSettingsDrawer}></div>
    </motion.div>
  );
};
