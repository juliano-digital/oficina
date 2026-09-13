import { MessageCircle, Send, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { getAssistantReply } from '../../constants/assistantKnowledge'
import { site } from '../../constants/site'

type Message = { author: 'assistant' | 'user'; text: string }

export function WhatsAppButton() {
	const [open, setOpen] = useState(false)
	const [question, setQuestion] = useState('')
	const [messages, setMessages] = useState<Message[]>([
		{ author: 'assistant', text: 'Olá! Posso ajudar com horários, endereço, serviços e agendamentos. O que você gostaria de saber?' },
	])

	const sendQuestion = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const trimmedQuestion = question.trim()
		if (!trimmedQuestion) return

		setMessages((current) => [
			...current,
			{ author: 'user', text: trimmedQuestion },
			{ author: 'assistant', text: getAssistantReply(trimmedQuestion) },
		])
		setQuestion('')
	}

	return <>
		{open && <section className="fixed bottom-24 right-5 z-40 flex w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden border border-white/10 bg-surface shadow-2xl shadow-black/50" aria-label="Assistente da oficina">
			<div className="flex items-center justify-between bg-[#25D366] px-4 py-3 text-white">
				<div><p className="text-sm font-bold">Assistente da oficina</p><p className="text-[11px] text-white/80">Resposta rápida para suas dúvidas</p></div>
				<button type="button" onClick={() => setOpen(false)} aria-label="Fechar assistente" className="rounded p-1 transition-colors hover:bg-black/10"><X size={18} /></button>
			</div>
			<div className="flex max-h-72 flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
				{messages.map((message, index) => <p key={`${message.author}-${index}`} className={`max-w-[88%] px-3 py-2 text-sm leading-relaxed ${message.author === 'user' ? 'self-end bg-signal text-white' : 'self-start bg-white/10 text-mist'}`}>{message.text}</p>)}
			</div>
			<form onSubmit={sendQuestion} className="border-t border-white/10 p-3">
				<div className="flex gap-2">
					<label htmlFor="assistant-question" className="sr-only">Digite sua dúvida</label>
					<input id="assistant-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Digite sua dúvida..." className="min-w-0 flex-1 border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]" />
					<button type="submit" aria-label="Enviar dúvida" className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#25D366] text-white transition-transform hover:scale-105"><Send size={16} /></button>
				</div>
				<a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="mt-3 block text-center text-xs font-bold text-[#25D366] hover:underline">Falar com a equipe pelo WhatsApp</a>
			</form>
		</section>}
		<button type="button" onClick={() => setOpen((current) => !current)} aria-label={open ? 'Fechar assistente' : 'Tirar dúvidas com o assistente'} aria-expanded={open} className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition-transform hover:scale-110"><MessageCircle size={25} /></button>
	</>
}
