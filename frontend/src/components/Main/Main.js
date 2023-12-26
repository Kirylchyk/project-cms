import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.module.css';
import ContentList from "../ContentList/ContentList";

function Main() {
    return (

        <main className={styles.mainContainer}>

            <div>
                {/*<h1>Main Screen</h1>*/}
                <Link to="/dashboard">
                    <button className={styles.dashboardButton}>Go to Dashboard</button>
                </Link>
            </div>

            <h2 className={styles.mainTitle}>Main Content Area</h2>
            <ContentList/>

        </main>
    );
}

export default Main;
