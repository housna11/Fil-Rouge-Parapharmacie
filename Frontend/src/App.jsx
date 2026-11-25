
import './App.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import Accueil from './Pages/Accueil';
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
import Catalogue from './Components/Catalogue';
import Dashboard from './Pages/Dashboard';
import Detail from './Pages/Detail';
import AdminLayout from '../src/layouts/AdminLayout';
import AvisManagement from './Pages/admin/AvisManagement';
import ProductCard from '../src/Components/ProductCard';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />

      <Routes>

        {/* Client */}
        <Route path="/" element={<><Navbar /><Accueil /></>} />
        <Route path="/connexion" element={<><Navbar /><Connexion /></>} />
        <Route path="/inscription" element={<><Navbar /><Inscription /></>} />
        <Route path="/catalogues" element={<><Navbar /><Catalogue /></>} />
        <Route path="/detail/:id" element={<><Navbar /><Detail /></>} />

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/avis" element={<AvisManagement />} />
          <Route path="/admin/produits" element={<ProductCard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
