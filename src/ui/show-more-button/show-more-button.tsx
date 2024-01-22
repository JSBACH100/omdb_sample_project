"use client";

import styles from './show-more-button.module.scss';

export default function ShowMoreButton({ callback }: { callback: () => void }) {

    return <button className={styles.back_button} onClick={() => callback()}>
        <span>Show more</span>
    </button>
}