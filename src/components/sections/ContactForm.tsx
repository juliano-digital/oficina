import { useForm } from 'react-hook-form'
import type { ContactFormData } from '../../types/contact'
import { useContactForm } from '../../hooks/useContactForm'
import { Button } from '../ui/Button'
import { StatusMessage } from '../ui/StatusMessage'

const carBrands = [
	'Acura', 'Agrale', 'Alfa Romeo', 'Aston Martin', 'Audi', 'BMW', 'BYD',
	'Bentley', 'CAOA Chery', 'Chevrolet', 'Chrysler', 'Citroën', 'Dodge',
	'Effa', 'Ferrari', 'Fiat', 'Ford', 'Foton', 'GWM', 'Hafei', 'Honda',
	'Hyundai', 'Iveco', 'JAC', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini',
	'Land Rover', 'Lexus', 'Lifan', 'Maserati', 'McLaren', 'Mercedes-Benz',
	'Mitsubishi', 'Nissan', 'Peugeot', 'Porsche', 'RAM', 'Renault',
	'Rolls-Royce', 'Scania', 'Seat', 'Seres', 'Shineray', 'Smart', 'Subaru',
	'Suzuki', 'Tesla', 'Toyota', 'Troller', 'Volkswagen', 'Volvo',
]

const carYears = Array.from({ length: 126 }, (_, index) => String(new Date().getFullYear() - index))

function formatPhone(value: string) {
	const digits = value.replace(/\D/g, '').slice(0, 11)
	if (digits.length <= 2) return digits ? `(${digits}` : ''
	return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
}

export function ContactForm() {
	const { submitContact, status, error } = useContactForm()
	const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()
	const phoneField = register('telefone')
	const onSubmit = async (data: ContactFormData) => { if (await submitContact(data)) reset() }

	return <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-widest text-white">Nome *<input {...register('nome')} placeholder="Seu nome" className="form-input" />{errors.nome && <span className="field-error">{errors.nome.message}</span>}</label><label className="text-xs font-bold uppercase tracking-widest text-white">Telefone *<input {...phoneField} onChange={(event) => { event.target.value = formatPhone(event.target.value); phoneField.onChange(event) }} inputMode="numeric" maxLength={14} placeholder="(00) 00000-0000" className="form-input" />{errors.telefone && <span className="field-error">{errors.telefone.message}</span>}</label></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-widest text-white">Marca *<input {...register('marca')} list="marcas-de-carros" placeholder="Digite para filtrar" className="form-input" />{errors.marca && <span className="field-error">{errors.marca.message}</span>}<datalist id="marcas-de-carros">{carBrands.map((brand) => <option key={brand} value={brand} />)}</datalist></label><label className="text-xs font-bold uppercase tracking-widest text-white">Ano *<select {...register('ano')} className="form-input"><option value="">Selecione o ano</option>{carYears.map((year) => <option key={year} value={year}>{year}</option>)}</select>{errors.ano && <span className="field-error">{errors.ano.message}</span>}</label></div><label className="text-xs font-bold uppercase tracking-widest text-white">O que está acontecendo? *<textarea {...register('mensagem')} placeholder="Conte os sintomas do câmbio" rows={4} className="form-input resize-none" />{errors.mensagem && <span className="field-error">{errors.mensagem.message}</span>}</label><Button type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Enviando...' : 'Solicitar avaliação'}</Button>{status === 'success' && <StatusMessage tone="success" message="Mensagem enviada. Nossa equipe entrará em contato em breve." />}{status === 'error' && error && <StatusMessage message={error} />}</form>
}
