interface StatusMessageProps { message: string; tone?: 'error' | 'success' }
export function StatusMessage({ message, tone = 'error' }: StatusMessageProps) {
  return <p role="status" className={`mt-3 text-sm ${tone === 'success' ? 'text-emerald-400' : 'text-red-300'}`}>{message}</p>
}
