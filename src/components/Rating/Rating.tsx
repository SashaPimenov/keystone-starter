import React from 'react'
import styles from './Rating.module.css'

type RatingProps = {
  rating: number
}

export const Rating = ({ rating }: RatingProps) => {
  const roundedRating = Math.floor(rating * 2) / 2
  const cappedRating = Math.min(Math.max(roundedRating, 0), 5)
  const fullStars = Math.floor(cappedRating)
  const halfStar = cappedRating % 1 === 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  return (
    <div className={styles.ratingContainer}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className={styles.fullStar} />
      ))}
      {halfStar && <span key='half' className={styles.halfStar} />}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i + fullStars + (halfStar ? 1 : 0)} className={styles.emptyStar} />
      ))}
      {rating ? <p>&nbsp;({rating.toFixed(1)}) </p> : <p>&nbsp;(Не оценено)</p>}
    </div>
  )
}
