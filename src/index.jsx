import React from 'react';
import ReactDom from 'react-dom';

function App() {
  return (
    <div>
      <p>룸프리뷰 !</p>
      <p>더이상 속지마세요! 직접 보고 결정하세요</p>
      <p>test</p>
    </div>
  );
}

ReactDom.render(
  <App />,
  document.getElementById('root'),
);
