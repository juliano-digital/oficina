import { ArrowRight, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { site } from '../../constants/site'

export function Hero() {
  return <section id="inicio" className="relative isolate flex min-h-[720px] items-center overflow-hidden border-b border-white/10 pt-24">
    <img src={site.heroImage} alt="Mecânico trabalhando em um veículo na oficina" loading="eager" className="absolute inset-0 -z-20 h-full w-full scale-[1.04] object-cover object-center brightness-[0.72] contrast-110 saturate-110" />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0a0a0a_12%,rgba(10,10,10,.86)_44%,rgba(10,10,10,.3)),linear-gradient(0deg,#0a0a0a_0%,transparent_45%)]" />
    <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="max-w-3xl">
        <div className="mb-8 inline-flex items-center gap-2 border border-white/20 bg-black/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-white"><ShieldCheck size={15} className="text-signal" /> 15 anos dedicados ao câmbio automático</div>
        <h1 className="font-display text-6xl uppercase leading-[.88] text-white sm:text-8xl">Seu câmbio<br /><span className="text-signal underline decoration-white/30 decoration-4 underline-offset-8">merece</span> precisão.</h1>
        <p className="mt-8 max-w-lg text-base leading-7 text-gray-300">Diagnóstico transparente, tecnologia de ponta e especialistas que tratam seu carro como se fosse nosso.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Button href="#orcamento">Avaliar meu câmbio agora <ArrowRight size={16} /></Button><Button href="#servicos" variant="outline">Ver os serviços</Button></div>
      </motion.div>
    </div>
  </section>
}
