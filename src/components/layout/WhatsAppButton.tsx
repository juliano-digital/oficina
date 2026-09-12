import { MessageCircle } from 'lucide-react'
import { site } from '../../constants/site'
export function WhatsAppButton() { return <a href={`https://wa.me/${site.whatsapp}`} aria-label="Falar pelo WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition-transform hover:scale-110"><MessageCircle size={25} /></a> }
