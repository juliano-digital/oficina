import { supabase } from '../lib/supabaseClient'
import type { Service } from '../types/service'

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*').order('ordem')
  if (error) throw new Error(error.message)
  return data as Service[]
}
