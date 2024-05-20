import { Analytics } from '@vercel/analytics/react';
import { MaterialUIProvider } from 'presentation/style/provider/material-provider';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import App from 'main/App';

const element = document.getElementById('root') as Element;
const root = createRoot(element);

root.render(
  <StrictMode>
    <Analytics />

    <Provider store={store}>
      <MaterialUIProvider>
        <App />
      </MaterialUIProvider>
    </Provider>
  </StrictMode>
);
