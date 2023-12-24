import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const [cardCount, setCardCount] = useState(0);
    const [averagePrice, setAveragePrice] = useState(0);

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    useEffect(() => {
        // Fetch card count
        fetch('/api/cardCount')
            .then(response => response.json())
            .then(data => setCardCount(data.count))
            .catch(error => console.error('Error fetching card count:', error));

        // Fetch average price
        fetch('/api/averagePrice')
            .then(response => response.json())
            .then(data => setAveragePrice(data.averagePrice))
            .catch(error => console.error('Error fetching average price:', error));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <button onClick={goBack}>Back to Main</button>
                <h2>Card Count: {cardCount}</h2>
                <h2>Average Price: {averagePrice.toFixed(2)}</h2>
            </div>
        </div>
    );
}

export default Dashboard;
