export interface ContactFormData {
  nome: string
  telefone: string
  marca: string
  ano: string
  mensagem: string
}

export interface ContactRecord extends ContactFormData {
  id: string
  carro_modelo: string
  criado_em: string
}
