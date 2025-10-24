// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="navbar">
                    <h1>🍲 Cocina Baure - Recetas Tradicionales</h1>
                </div>
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/recipe/:id" element={<RecipeDetail />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;