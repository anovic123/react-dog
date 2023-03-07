import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './core/query-client';
import { App } from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
