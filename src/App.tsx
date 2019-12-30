import React from 'react';
import { Root } from './components/Root';
import { Provider } from './store/store';
import { useProviderValue } from './hooks/useProviderValue';

const App: React.FC = () => {
  const providerValue = useProviderValue();
  return (
    <Provider value={providerValue}>
      <Root />
    </Provider>
  );
};

export default App;
