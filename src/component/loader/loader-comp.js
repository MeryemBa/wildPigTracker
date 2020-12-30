import React from 'react';
import styles from "./loader.module.css";

function Loader({message}) {
    return (
        <div className={styles.container}>
	<span className={styles.loader} data-text={message}>{message}</span>
</div>
    )
}

export default Loader
