import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'; // Ensure the path is correct
import Main from './components/Main/Main'; // Ensure the path is correct
import Header from './components/Header/Header'; // Ensure the path is correct
import Footer from './components/Footer/Footer'; // Ensure the path is correct


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}


function App() {
    return (
        <ErrorBoundary>
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
        </ErrorBoundary>
    );
}



export default App;
