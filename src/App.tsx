import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRCodeGenerator from './components/QRCodeGenerator';
import CodePage from './pages/code';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRCodeGenerator />} />
        <Route path="/code" element={<CodePage />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App