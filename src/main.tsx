import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameHubPage } from './pages/GameHubPage';
import { PoketraderPage } from './pages/PoketraderPage';
import { PaperclipsPage } from './pages/PaperclipsPage';
import { ThriftQueenPage } from './pages/ThriftQueenPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/hub" replace />} />
        <Route path="/hub" element={<GameHubPage />} />
        <Route path="/poketrader" element={<PoketraderPage />} />
        <Route path="/thriftqueen" element={<ThriftQueenPage />} />
        <Route path="/paperclips" element={<PaperclipsPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
