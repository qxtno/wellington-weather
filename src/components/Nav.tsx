import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAppState, useDispatch } from '../store/store';

export const Nav: React.FC = () => {
  const { notSaved } = useAppState();
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

  function render() {
    return (
      <div className="flex justify-center items-center h-full">
        <button
          onClick={() => {
            dispatch({ type: 'CLOSE_SETTINGS_DRAWER' });
            history.push('/');
          }}
        >
          <div className="rounded hover:bg-blue-300 px-4 py-2">
            <span className="pr-2">
              <FontAwesomeIcon className="text-xl" icon={faHome} />
            </span>
            Home
          </div>
        </button>

        <button onClick={toggleSettingsDrawer}>
          <div className="rounded hover:bg-blue-300 px-4 py-2">
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
