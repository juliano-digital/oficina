import { supabase } from '../lib/supabaseClient'
import type { ContactFormData } from '../types/contact'

export async function createContact(contact: ContactFormData): Promise<void> {
  const { error } = await supabase.from('contacts').insert(contact)
  if (error) throw new Error(error.message)
}
