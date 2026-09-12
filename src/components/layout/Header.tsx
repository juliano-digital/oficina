import { Menu, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { navigation } from '../../constants/navigation'
import { site } from '../../constants/site'
import { Button } from '../ui/Button'
import logo from '../img/logo.png'

export function Header() {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-lg">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <a href="#inicio" className="flex items-center gap-3" aria-label="Voltar ao início">
        <img src={logo} alt="Centro Automotivo" className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 object-contain p-1 shadow-sm" />
        <span className="font-display text-xl uppercase tracking-wide text-white">Centro Automotivo</span>
      </a>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
        {navigation.map((item) => <a key={item.href} href={item.href} className="text-[11px] font-bold uppercase tracking-widest text-mist transition-colors hover:text-white">{item.label}</a>)}
      </nav>
      <Button href={`https://wa.me/${site.whatsapp}`} className="hidden sm:inline-flex"><MessageCircle size={16} /> Falar no WhatsApp</Button>
      <button className="text-white lg:hidden" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="border-t border-white/10 bg-surface px-5 py-4 lg:hidden" aria-label="Menu mobile">
      {navigation.map((item) => <a onClick={() => setOpen(false)} key={item.href} href={item.href} className="block border-b border-white/10 py-3 text-xs font-bold uppercase tracking-widest text-white">{item.label}</a>)}
      <a href={`https://wa.me/${site.whatsapp}`} className="mt-4 block bg-signal px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white">Falar no WhatsApp</a>
    </nav>}
  </header>
}
