import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StepReviewer from './components/StepReviewer';
import Chirper from './components/Chirper'; // Imported Chirper component

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-semibold">
                    All Reffed Up
                </div>
                <div>
                    <Link to="/chirper" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Uncontrolled Chirper</Link>
                    <Link to="/stepreviewer" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Step Reviewer</Link>
                </div>
            </div>
        </nav>
    );
};

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto mt-8">
                <Routes>
                    <Route path="/chirper" element={<Chirper />} />
                    <Route path="/stepreviewer" element={<StepReviewer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
