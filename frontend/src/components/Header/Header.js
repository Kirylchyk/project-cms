import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.headerTitle}>Welcome to Content Management System (CMS)</h1>
        </div>
    );
}

export default Header;
