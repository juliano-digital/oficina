import { supabase } from '../lib/supabaseClient'
import type { Review } from '../types/review'

export async function fetchApprovedReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('aprovado', true)
    .order('criado_em', { ascending: false })
  if (error) throw new Error(error.message)
  return data as Review[]
}
