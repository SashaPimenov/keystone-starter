import { useState } from 'react'
import styles from './ChangedRating.module.css'

type RatingProps = {
  rating: number
  onRate: (newRating: number) => void
}

export const ChangedRating = ({ rating, onRate }: RatingProps) => {
  const roundedRating = Math.floor(rating * 2) / 2
  const cappedRating = Math.min(Math.max(roundedRating, 0), 5)
  const fullStars = Math.floor(cappedRating)
  const halfStar = cappedRating % 1 === 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index + 1)
  }

  const handleMouseLeave = () => {
    setHoveredRating(null)
  }

  const handleClick = (index: number) => {
    onRate(index + 1)
  }

  return (
    <div className={styles.ratingContainer}>
      {[...Array(5)].map((_, index) => {
        const isFilled = index < (hoveredRating !== null ? hoveredRating : cappedRating)
        return (
          <span
            key={index}
            className={`${isFilled ? styles.fullStar : styles.emptyStar} ${styles.star}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        )
      })}
      <p>&nbsp;({hoveredRating !== null ? hoveredRating : rating})</p>
    </div>
  )
}
