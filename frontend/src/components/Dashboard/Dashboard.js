import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';


function Dashboard() {
    const [cardCount, setCardCount] = useState(0);
    const [averagePrice, setAveragePrice] = useState(0);

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    useEffect(() => {
        // Fetch card count
        fetch('http://localhost:5001/api/dashboard/cardCount')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => setCardCount(data.count))
            .catch(error => console.error('Error fetching card count:', error));

        // Fetch average price
        fetch('http://localhost:5001/api/dashboard/averagePrice')
            .then(response => response.json())
            .then(data => setAveragePrice(data.averagePrice))
            .catch(error => console.error('Error fetching average price:', error));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            <div className={styles.dashboard}>
                <div className={styles.widget}>
                    <h2>Card Count</h2>
                    <p className={styles.highlight}>{cardCount}</p>
                </div>
                <div className={styles.widget}>
                    <h2>Average Price</h2>
                    <p className={styles.highlight}>${averagePrice}</p>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
