import { supabase } from '../lib/supabaseClient'
import type { ContactRecord } from '../types/contact'

export async function fetchContacts(): Promise<ContactRecord[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('criado_em', { ascending: false })

  if (error) throw new Error(error.message)
  return data as ContactRecord[]
}
