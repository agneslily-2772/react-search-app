import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';

function App() {
  return (
    <>   
         <Router>
         <Header/>
        <Routes>
        <Route exact path="/" element={<Home/>}/>        
        </Routes>
        </Router>
        </>
  );
}

export default App;
