import { useEffect, useState } from 'react'
import { fetchServices } from '../services/servicesService'
import type { Service } from '../types/service'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Não foi possível carregar os serviços.'))
      .finally(() => setLoading(false))
  }, [])

  return { services, loading, error }
}
