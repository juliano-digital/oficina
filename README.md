# Centro Automotivo | Câmbio Automático

Site institucional responsivo para uma oficina especializada em câmbio automático, construído com React 18, Vite e TypeScript strict.

## Rodando localmente

```bash
npm install
copy .env.example .env.local
npm run dev
```

No macOS/Linux, use `cp .env.example .env.local`.

## Supabase

1. Crie um projeto no Supabase.
2. Execute o conteúdo de `supabase/schema.sql` no SQL Editor.
3. Preencha `.env.local` com:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

As políticas permitem inserir contatos publicamente, ler serviços e ler apenas avaliações aprovadas. Restrinja as políticas conforme a operação real antes de publicar.

## Scripts

- `npm run dev`: desenvolvimento
- `npm run build`: checagem TypeScript e build de produção
- `npm run preview`: pré-visualização do build
- `npm run lint`: lint

## Pendências de conteúdo

- Substituir a imagem remota do hero em `src/constants/site.ts` por uma foto real da fachada/oficina.
- Atualizar endereço, telefone, WhatsApp, Instagram e horários.
- Inserir avaliações reais aprovadas no Supabase.
- Revisar textos legais e dados definitivos da empresa.
- Trocar o mapa de exemplo pela localização real.
