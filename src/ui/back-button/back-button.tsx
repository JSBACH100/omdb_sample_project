"use client";

import { useRouter } from 'next/navigation';
import styles from './back-button.module.scss';

export default function BackButton({ path }: { path: string}) {
    const router = useRouter();

    return <button className={styles.back_button} onClick={() => router.push(path)}>
        <img src="/back_arrow.png" alt="Back" />
        <span>Back</span>
    </button>
}