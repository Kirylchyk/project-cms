import React from 'react';
import styles from './Main.module.css';
import ContentList from "../ContentList/ContentList";

function Main() {
    return (
        <main className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>Main Content Area</h2>
            <ContentList />
        </main>
    );
}

export default Main;
