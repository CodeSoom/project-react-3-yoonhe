import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import store from './store';

const isProduction = process.env.NODE_ENV === 'production';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter basename={isProduction ? 'https://yoonhe.github.io/project-react-3-yoonhe/' : '/'}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
