import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Main />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
//test .gitignore works fine