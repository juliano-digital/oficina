import { useEffect, useState } from 'react'
import { fetchApprovedReviews } from '../services/reviewsService'
import type { Review } from '../types/review'

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApprovedReviews()
      .then(setReviews)
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Não foi possível carregar as avaliações.'))
      .finally(() => setLoading(false))
  }, [])

  return { reviews, loading, error }
}
