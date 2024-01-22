import styles from './empty-state.module.scss'

export default function EmptyState({ message }: { message: string }) {
    return (
        <div className={styles.empty_state}>
            <p>{message}</p>
        </div>
    )
}