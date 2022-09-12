import React, { FunctionComponent } from 'react';

const App: FunctionComponent = () => {
  const test: string = "test";
  fetch('http://localhost:3000/test', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }})
    .then(res => res.json())
    .then(data => {
      console.log("frontend, data: ", data)
    })
  return (
    <div>
      <h1>SOLO DOLO</h1>
    </div>
  )
}

export default App;
