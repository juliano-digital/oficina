import { LogOut, RefreshCw, Search, ShieldCheck } from 'lucide-react'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { fetchContacts } from '../services/contactsService'
import { supabase } from '../lib/supabaseClient'
import type { ContactRecord } from '../types/contact'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function Contatos() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)
  const [contacts, setContacts] = useState<ContactRecord[]>([])
  const [search, setSearch] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadContacts() {
    setLoading(true)
    setError(null)
    try {
      setContacts(await fetchContacts())
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível carregar os contatos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null)
      if (data.session) void loadContacts()
      else setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSessionEmail(currentSession?.user.email ?? null)
      if (currentSession) void loadContacts()
    })

    const contactsChannel = supabase
      .channel('contacts-admin-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contacts' }, () => {
        if (sessionEmail) void loadContacts()
      })
      .subscribe()

    return () => {
      listener.subscription.unsubscribe()
      void supabase.removeChannel(contactsChannel)
    }
  }, [sessionEmail])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError) setError('E-mail ou senha inválidos.')
    setSubmitting(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setContacts([])
  }

  const filteredContacts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')
    if (!normalizedSearch) return contacts
    return contacts.filter((contact) => [
      contact.nome,
      contact.telefone,
      contact.marca ?? '',
      String(contact.ano ?? ''),
      contact.carro_modelo,
      contact.mensagem,
    ].some((value) => value.toLocaleLowerCase('pt-BR').includes(normalizedSearch)))
  }, [contacts, search])

  if (!sessionEmail) {
    return <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-12 text-white"><section className="w-full max-w-md border border-line bg-surface p-8 shadow-2xl"><div className="mb-8 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center bg-signal"><ShieldCheck size={23} /></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-signal">Área restrita</p><h1 className="font-display text-3xl uppercase">Contatos</h1></div></div><form onSubmit={handleLogin} className="grid gap-5"><label className="text-xs font-bold uppercase tracking-widest">E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="form-input" placeholder="admin@oficina.com" /></label><label className="text-xs font-bold uppercase tracking-widest">Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" className="form-input" placeholder="Sua senha" /></label>{error && <p className="field-error text-sm">{error}</p>}<button type="submit" disabled={submitting} className="bg-signal px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-signal-dark disabled:cursor-wait disabled:opacity-60">{submitting ? 'Entrando...' : 'Entrar'}</button></form></section></main>
  }

  return <main className="min-h-screen bg-ink px-5 py-8 text-white lg:px-10"><div className="mx-auto max-w-7xl"><header className="mb-8 flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-signal">Painel administrativo</p><h1 className="mt-2 font-display text-5xl uppercase">Contatos</h1><p className="mt-2 text-sm text-mist">Acompanhe as solicitações recebidas pelo formulário.</p></div><div className="flex items-center gap-3"><button type="button" onClick={() => void loadContacts()} title="Atualizar contatos" className="flex h-11 w-11 items-center justify-center border border-line text-mist transition-colors hover:border-white hover:text-white"><RefreshCw size={17} /></button><button type="button" onClick={() => void handleLogout()} className="flex items-center gap-2 border border-line px-4 py-3 text-xs font-bold uppercase tracking-widest text-mist transition-colors hover:border-white hover:text-white"><LogOut size={16} /> Sair</button></div></header><div className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><label className="relative block"><span className="sr-only">Filtrar contatos</span><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="form-input mt-0 pl-11" placeholder="Buscar por nome, telefone, marca ou mensagem" /></label><p className="text-sm text-mist">{filteredContacts.length} de {contacts.length} contato(s)</p></div>{error && <div className="mb-5 border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}{loading ? <p className="py-12 text-center text-mist">Carregando contatos...</p> : filteredContacts.length === 0 ? <div className="border border-line bg-surface px-6 py-16 text-center"><p className="font-display text-3xl uppercase text-white">Nenhum contato encontrado</p><p className="mt-2 text-sm text-mist">Os novos envios aparecerão aqui.</p></div> : <div className="overflow-x-auto border border-line"><table className="min-w-full divide-y divide-line text-left"><thead className="bg-surface"><tr><th className="px-5 py-4 text-[11px] font-bold uppercase tracking-widest text-mist">Data</th><th className="px-5 py-4 text-[11px] font-bold uppercase tracking-widest text-mist">Cliente</th><th className="px-5 py-4 text-[11px] font-bold uppercase tracking-widest text-mist">Telefone</th><th className="px-5 py-4 text-[11px] font-bold uppercase tracking-widest text-mist">Veículo</th><th className="px-5 py-4 text-[11px] font-bold uppercase tracking-widest text-mist">Mensagem</th></tr></thead><tbody className="divide-y divide-line">{filteredContacts.map((contact) => <tr key={contact.id} className="align-top transition-colors hover:bg-white/[.03]"><td className="whitespace-nowrap px-5 py-5 text-sm text-mist">{formatDate(contact.criado_em)}</td><td className="px-5 py-5"><p className="font-bold text-white">{contact.nome}</p></td><td className="whitespace-nowrap px-5 py-5 text-sm text-white">{contact.telefone}</td><td className="whitespace-nowrap px-5 py-5 text-sm text-white">{contact.marca ? `${contact.marca} ${contact.ano ?? ''}` : contact.carro_modelo}</td><td className="min-w-[280px] px-5 py-5 text-sm leading-6 text-mist">{contact.mensagem}</td></tr>)}</tbody></table></div>}</div></main>
}
