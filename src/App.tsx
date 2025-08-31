// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Work from './pages/Work.tsx';
import Contact from './pages/Contact.tsx';

const App = () => {
  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/">Home</Link>
        <Link to="/work">Work</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        {/* You can add more routes here for other pages */}
      </Routes>
    </>
  );
};

export default App;