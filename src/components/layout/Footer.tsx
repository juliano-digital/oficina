import { Instagram, MapPin, Phone } from 'lucide-react'
import { navigation } from '../../constants/navigation'
import { site } from '../../constants/site'

export function Footer() {
  return <footer className="border-t border-white/10 bg-surface px-5 py-12 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
      <div><div className="font-display text-2xl uppercase text-white">Centro Automotivo</div><p className="mt-4 max-w-xs text-sm leading-6 text-mist">Especialistas em câmbio automático. Diagnóstico honesto e reparo que dura.</p></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Navegue</p>{navigation.slice(0, 4).map((item) => <a className="mb-3 block text-sm text-mist hover:text-white" key={item.href} href={item.href}>{item.label}</a>)}</div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Contato</p><p className="mb-3 flex gap-2 text-sm text-mist"><MapPin size={16} className="text-signal" /> {site.address}</p><p className="mb-3 flex gap-2 text-sm text-mist"><Phone size={16} className="text-signal" /> {site.phone}</p><a className="flex gap-2 text-sm text-mist hover:text-white" href={site.instagram}><Instagram size={16} className="text-signal" /> Instagram</a></div>
    </div>
    <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-mist">© {new Date().getFullYear()} Centro Automotivo. Todos os direitos reservados.</div>
  </footer>
}
