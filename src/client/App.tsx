import React, { FunctionComponent } from 'react';

const App: FunctionComponent = () => {
  // const test: string = "test";
  fetch('http://localhost:3000/test', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(async (res) => res.json())
    .then((data) => {
      console.log('frontend, data: ', data);
    })
    .catch((err) => err);
  return (
    <div>
      <h1>SOLO DOLO</h1>
    </div>
  );
};

export default App;
