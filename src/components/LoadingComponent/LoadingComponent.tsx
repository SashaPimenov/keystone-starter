import React from 'react'
import styles from './LoadingComponent.module.css'

const LoadingComponent = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
      <p>Загрузка...</p>
    </div>
  )
}

export default LoadingComponent
