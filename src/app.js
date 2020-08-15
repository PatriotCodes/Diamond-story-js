import React from 'react';
import { Provider } from 'react-redux';
import GameScreen from './screens/GameScreen';
import configureStore from './store';

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <GameScreen />
    </Provider>
  );
};

export default App;
