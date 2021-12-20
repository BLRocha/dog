import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { UserStorage } from './Contexts/UserContext';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
          <Footer />
          </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
