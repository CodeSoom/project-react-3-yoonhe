import React from 'react';
import ReactDom from 'react-dom';

function App() {
  return (
    <div>
      <p>Hello, Room View</p>
    </div>
  );
}

ReactDom.render(
  <App />,
  document.getElementById('root'),
);
