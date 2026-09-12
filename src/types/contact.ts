export interface ContactFormData {
  nome: string
  telefone: string
  carro_modelo: string
  mensagem: string
}

export interface ContactRecord extends ContactFormData {
  id: string
  criado_em: string
}
