import React from 'react';
import { motion } from 'framer-motion';
import { useAppState, useDispatch } from '../store/store';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const SettingsDrawer: React.FC = () => {
  const { notSaved, savedLocations, darkTheme } = useAppState();
  const settingsDrawerOpen = notSaved?.settingsDrawerOpen;
  const dispatch = useDispatch();
  const y_state = settingsDrawerOpen ? 0 : '100%';
  const history = useHistory();
  const { t } =  useTranslation();

  function closeSettingsDrawer() {
    dispatch({ type: 'CLOSE_SETTINGS_DRAWER' });
  }

  const drawerClassList = classNames(
    'p-4',
    { 'bg-blue-700 text-white': darkTheme },
    { 'bg-blue-300': !darkTheme }
  );
  const drawerBtnClassList = classNames(
    'w-full rounded p-2',
    { 'hover:bg-blue-800': darkTheme },
    { 'hover:bg-blue-400': !darkTheme }
  );

  return (
    <motion.div
      className="absolute flex flex-col-reverse inset-0"
      animate={{ y: y_state }}
      transition={{ type: 'tween' }}
      style={{ transform: 'translateY(100%)', paddingBottom: '60px' }}
    >
      <div className={drawerClassList}>
        <div className="max-w-md mx-auto">
          <button
            onClick={e => {
              dispatch({ type: 'TOGGLE_THEME' });
            }}
            className={drawerBtnClassList}
          >
            <div className="flex justify-center items-center">
              {t('dark mode')}
              {darkTheme ? (
                <>
                  <div className="pl-1 pr-2">on</div>
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={faMoon}
                      className="text-yellow-300 text-xl"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="pl-1 pr-2">off</div>
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={faSun}
                      className="text-yellow-300 text-xl"
                    />
                  </div>
                </>
              )}
            </div>
          </button>
          {savedLocations?.length > 0 && (
            <button
              onClick={() => {
                closeSettingsDrawer();
                history.push('/delete-saved-location');
              }}
              className={drawerBtnClassList}
            >
              {t('delete saved location')}
            </button>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={closeSettingsDrawer}></div>
    </motion.div>
  );
};
