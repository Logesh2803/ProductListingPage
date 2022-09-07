import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';

import CartScreen from './CartScreen';

export default function Apps() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Apps />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
