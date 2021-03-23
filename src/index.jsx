import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/project-react-3-yoonhe">
      <div>
        <p>Hello, Room View</p>
      </div>
    </BrowserRouter>
  );
}

ReactDom.render(
  <App />,
  document.getElementById('app'),
);
