import React from 'react';
import { ChakraProvider,theme} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value={theme}> 
    <App />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
