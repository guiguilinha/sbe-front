import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import HistoricoDetailPage from './pages/HistoricoDetailPage';
import HistoricoPage from './pages/HistoricoPage';

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<HomePage />} />
      
      {/* Rotas protegidas */}
      <Route path="/quiz" element={<RequireAuth><QuizPage /></RequireAuth>} />
      <Route path="/results" element={<RequireAuth><ResultsPage /></RequireAuth>} />
      
      {/* Rota do Dashboard (sem autenticação) */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/historico" element={<HistoricoPage />} />
      <Route path="/historico/:id" element={<HistoricoDetailPage />} />
    </Routes>
  );
}

export default App;
