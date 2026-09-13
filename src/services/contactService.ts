import { supabase } from '../lib/supabaseClient'
import type { ContactFormData } from '../types/contact'

export async function createContact(contact: ContactFormData): Promise<void> {
  const { error } = await supabase.from('contacts').insert({
    ...contact,
    ano: Number(contact.ano),
    carro_modelo: `${contact.marca} ${contact.ano}`,
  })
  if (error) throw new Error(error.message)
}
