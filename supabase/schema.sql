create extension if not exists "uuid-ossp";

create table if not exists contacts (
  id uuid primary key default uuid_generate_v4(),
  nome text not null check (char_length(trim(nome)) >= 2),
  telefone text not null check (char_length(trim(telefone)) >= 10),
  mensagem text not null check (char_length(trim(mensagem)) >= 10),
  carro_modelo text not null check (char_length(trim(carro_modelo)) >= 2),
  marca text,
  ano integer,
  criado_em timestamptz not null default now()
);

alter table contacts add column if not exists marca text;
alter table contacts add column if not exists ano integer;

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  nome_cliente text not null,
  nota integer not null check (nota between 1 and 5),
  comentario text not null,
  criado_em timestamptz not null default now(),
  aprovado boolean not null default false
);

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  titulo text not null,
  descricao text not null,
  icone text not null default 'Wrench',
  ordem integer not null default 0
);

alter table contacts enable row level security;
alter table reviews enable row level security;
alter table services enable row level security;

create policy "public can create contacts" on contacts for insert with check (true);
create policy "authenticated can read contacts" on contacts for select to authenticated using (true);
create policy "public can read approved reviews" on reviews for select using (aprovado = true);
create policy "public can read services" on services for select using (true);

insert into services (titulo, descricao, icone, ordem) values
('Diagnóstico eletrônico', 'Leitura completa dos módulos para encontrar a causa real do defeito.', 'ScanLine', 1),
('Troca de óleo ATF', 'Fluido correto, procedimento técnico e filtro novo para proteger seu câmbio.', 'Droplets', 2),
('Reparo de câmbio', 'Desmontagem, inspeção e montagem com peças selecionadas e garantia.', 'Cog', 3),
('Manutenção preventiva', 'Revisões programadas para evitar trancos, patinação e prejuízo.', 'ShieldCheck', 4)
on conflict do nothing;
