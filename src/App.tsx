import * as React from 'react';
import Main from './Main/Main';
import StoreProvider from './StoreProvider';

function App() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
}

export default App;
