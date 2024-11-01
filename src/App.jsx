import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/NavbarPrestabanco';
import Register from './components/Register';
import Login from './components/Login';
import SimulateLoan from './components/SimulateLoan';
import ApplyForLoan from './components/applyForLoan';
import Home from './components/home';
import CreditEvaluation from './components/creditEvaluation';
import LoanForEvaluate from './components/LoanForEvaluate';
import MyLoans from './components/MyLoans';
import ModifyDocuments from './components/ModifyDocuments';
import LoanDetails from './components/LoanDetails';

function App() {
  const location = useLocation(); // Obtener la ubicación actual de la ruta

  // Verificar si la ruta actual es /login o /register
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {/* Condicionar la visualización del Navbar */}
      {!hideNavbar && <Navbar />}

      <div className='container'>
        <Routes>
          {/* Rutas para Login y Register */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas con Navbar */}
          <Route path="/simulate" element={<SimulateLoan />} />
          <Route path="/applyForLoan" element={<ApplyForLoan />} />
          <Route path="/home" element={<Home />} />
          <Route path="/creditEvaluation" element={<CreditEvaluation />} />
          <Route path="/loanForEvaluate" element={<LoanForEvaluate />} />
          <Route path="/myLoans" element={<MyLoans />} />
          <Route path="/modifyDocuments" element={<ModifyDocuments />} />
          <Route path="/loanDetails" element={<LoanDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}