import styles from './ErrorComponent.module.css'

export const ErrorComponent = () => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>Ошибка</p>
    </div>
  )
}
