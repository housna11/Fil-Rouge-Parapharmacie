import './App.css'
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Accueil from './Pages/Accueil'; 
import Nouveauxproduits from './Components/Nouveauxproduits';
import Apropos from './Components/Apropos';
import Footer from './Components/Footer';
import Connexion from './Pages/Connexion'; 
import Inscription from './Pages/Inscription';
import Catalogue from './Components/Catalogue';
import Catalogues from './Pages/Catalogues';
import Dashboard from './Pages/Dashboard';
import ProductCard from './Components/ProductCard';
import Detail from './Pages/Detail';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Accueil />} /> 
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/catalogues" element={<Catalogue />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detail/:id" element={<Detail />} />

      </Routes>
    </Router>
  )
}

export default App;
