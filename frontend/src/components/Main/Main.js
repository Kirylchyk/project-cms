import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './Main.module.css';
import ContentList from "../ContentList/ContentList";

function Main() {
    return (
        <main className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>Main Content Area</h2>
            <ContentList/>
            <div>
                <h1>Main Screen</h1>
                <Link to="/dashboard">
                    <button>Go to Dashboard</button>
                </Link>
            </div>
        </main>
    );
}

export default Main;
