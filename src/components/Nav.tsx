import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAppState, useDispatch } from '../store/store';
import classNames from 'classnames';

export const Nav: React.FC = () => {
  const { notSaved, darkTheme } = useAppState();
  const settingsDrawerOpen = notSaved?.settingsDrawerOpen;
  const dispatch = useDispatch();
  const history = useHistory();

  function toggleSettingsDrawer() {
    if (settingsDrawerOpen) {
      dispatch({ type: 'CLOSE_SETTINGS_DRAWER' });
    } else {
      dispatch({ type: 'OPEN_SETTINGS_DRAWER' });
    }
  }

  const navBtnClassList = classNames(
    'rounded px-4 py-2',
    { 'hover:bg-blue-700 ': darkTheme },
    { 'hover:bg-blue-300': !darkTheme }
  );

  function render() {
    return (
      <div className="flex justify-center items-center h-full">
        <button
          onClick={() => {
            dispatch({ type: 'CLOSE_SETTINGS_DRAWER' });
            history.push('/');
          }}
        >
          <div className={navBtnClassList}>
            <span className="pr-2">
              <FontAwesomeIcon className="text-xl" icon={faHome} />
            </span>
            Home
          </div>
        </button>

        <button onClick={toggleSettingsDrawer}>
          <div className={navBtnClassList}>
            <span className="pr-2">
              <FontAwesomeIcon className="text-xl" icon={faCog} />
            </span>
            Settings
          </div>
        </button>
      </div>
    );
  }
  return render();
};
