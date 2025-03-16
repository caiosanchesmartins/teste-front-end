import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.tsx'; // Importação correta
import Produtos from "./components/produtos.tsx"; // Importação do novo componente
import ErrorPage from './components/error.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="content"> {/* Adiciona margem para compensar a navbar fixa */}
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </div>
        
        
      </div>
    </Router>
  );
};

// Componente Home
const Home: React.FC = () => {
  return (
    <div>
      
    </div>
  );
};
 

export default App;
