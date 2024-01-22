import styles from './error-state.module.scss'

export default function ErrorState({ message }: { message: string }) {
    return (
        <div className={styles.error_state}>
            <p>{message}</p>
        </div>
    )
}