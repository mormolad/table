import * as React from 'react';
import Main from './components/Main/Main';
import StoreProvider from './StoreProvider';

function App() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
}

export default App;
