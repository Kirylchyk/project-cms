import React from 'react';
import styles from './Footer.module.css'

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <p className={styles.footerText}>© 2023 Varvara Kirylchyk - CMS</p>
        </div>
    );
}

export default Footer;
