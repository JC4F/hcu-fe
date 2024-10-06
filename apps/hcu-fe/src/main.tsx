import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { enableMocking } from './testing/mocks';
import { App } from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
