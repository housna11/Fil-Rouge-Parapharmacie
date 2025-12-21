import './App.css'
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

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Accueil />} /> 
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/catalogues" element={<Catalogue />} />
      </Routes>
    </Router>
  )
}

export default App;
