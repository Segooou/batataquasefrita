import 'presentation/style/tailwind.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { dimensions } from './config';
import { ptBR } from 'date-fns/locale';
import { queryClient } from 'infra/lib';
import { useWindowDimensions } from 'data/hooks';
import Router from './routes';
import type { FC } from 'react';

const App: FC = () => {
  const { width } = useWindowDimensions();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
        <Router />
      </LocalizationProvider>

      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar={false}
        limit={4}
        pauseOnHover
        position={width >= dimensions.laptop ? 'bottom-right' : 'top-right'}
        style={{
          padding: '12px'
        }}
        theme={'dark'}
      />
    </QueryClientProvider>
  );
};

export default App;
