import { useState } from 'react'
import { z } from 'zod'
import { createContact } from '../services/contactService'
import type { ContactFormData } from '../types/contact'

export const contactSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome.'),
  telefone: z.string().min(10, 'Informe um telefone válido.'),
  carro_modelo: z.string().min(2, 'Informe o carro e o ano.'),
  mensagem: z.string().min(10, 'Conte brevemente o que está acontecendo.'),
})

export function useContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submitContact(data: ContactFormData) {
    const result = contactSchema.safeParse(data)
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Confira os campos.')
      setStatus('error')
      return false
    }
    setStatus('loading')
    setError(null)
    try {
      await createContact(result.data)
      setStatus('success')
      return true
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível enviar sua mensagem.')
      setStatus('error')
      return false
    }
  }

  return { submitContact, status, error }
}
