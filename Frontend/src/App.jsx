import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Accueil from './Pages/Accueil'; 
import Connexion from './Pages/Connexion'; 
import Inscription from './Pages/Inscription';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/Accueil" element={<Accueil />} /> 
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </Router>
  )
}

export default App;
