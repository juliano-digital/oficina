import { site } from './site'

export type AssistantTopic = {
  keywords: string[]
  answer: string
}

// Escreva aqui informações livres. Separe assuntos diferentes com uma linha em branco.
// O assistente usa o parágrafo mais relacionado quando não encontrar um tópico abaixo.
export const assistantInformation = `
Atendemos carros nacionais e importados, com diagnóstico e orçamento antes da execução do serviço.

Para solicitar um orçamento, informe a marca, o modelo, o ano do veículo e descreva o problema percebido.

Aceitamos atendimento com hora marcada e recomendamos entrar em contato pelo WhatsApp para confirmar a disponibilidade.

 A troca de óleo custa 200,00 reais.
`
// Edite esta lista para respostas rápidas e específicas.

export const assistantKnowledge: AssistantTopic[] = [
  {
    keywords: ['horario', 'hora', 'abre', 'fecha', 'funcionamento'],
    answer: `Nosso horário é ${site.hours}.`,
  },
  {
    keywords: ['endereco', 'localizacao', 'onde', 'local'],
    answer: `Estamos em ${site.address}.`,
  },
  {
    keywords: ['servico', 'servicos', 'fazem', 'conserto', 'manutencao'],
    answer: 'Realizamos diagnóstico, manutenção preventiva e reparos automotivos. Descreva o problema do seu veículo para orientarmos você.',
  },
  {
    keywords: ['preco', 'valor', 'orcamento', 'custa'],
    answer: 'O valor depende do diagnóstico e do modelo do veículo. Envie marca, modelo, ano e o que está acontecendo para solicitar uma avaliação.',
  },
  {
    keywords: ['agendar', 'agenda', 'marcar', 'agendamento'],
    answer: 'Posso encaminhar você para o WhatsApp da oficina para agendar. Clique em “Falar com a equipe” abaixo.',
  },
]

const normalize = (value: string) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')

const getInformationReply = (question: string) => {
  const questionWords = normalize(question).split(/\s+/).filter((word) => word.length > 3)
  const paragraphs = assistantInformation.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
  const bestParagraph = paragraphs
    .map((paragraph) => ({ paragraph, score: questionWords.filter((word) => normalize(paragraph).includes(word)).length }))
    .sort((first, second) => second.score - first.score)[0]

  return bestParagraph?.score ? bestParagraph.paragraph : undefined
}

export function getAssistantReply(question: string) {
  const normalizedQuestion = normalize(question)
  const topic = assistantKnowledge.find(({ keywords }) => keywords.some((keyword) => normalizedQuestion.includes(keyword)))

  return topic?.answer ?? getInformationReply(question) ?? 'Ainda não tenho essa informação. Posso encaminhar você para a equipe da oficina pelo WhatsApp para responderem sua dúvida.'
}