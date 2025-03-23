// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App'; // ✅ Correct component to render
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />  {/* ✅ Renders your app with state management */}
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // ✅ Import BrowserRouter
import './index.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>  {/* ✅ Wrap App in Router */}
      <App />  
    </Router>
  </React.StrictMode>
);

reportWebVitals();
