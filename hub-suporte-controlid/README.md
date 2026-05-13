# Hub de Suporte Control iD - mesmo visual + Supabase

Esta versão foi feita usando o ZIP original como base visual.
O HTML/CSS original foi preservado, e foram adicionados somente:

- login via Supabase Auth;
- perfil `admin` e `viewer`;
- painel Admin para cadastrar tópicos;
- editar/excluir conteúdo;
- conteúdos carregados do Supabase;
- favoritos por usuário;
- anotações por usuário;
- RLS no banco para bloquear alterações por usuário padrão.

## 1. Supabase

Crie um projeto no Supabase e execute o arquivo:

```txt
supabase.sql
```

no menu:

```txt
SQL Editor > New Query > Run
```

## 2. Criar usuários

No Supabase:

```txt
Authentication > Users > Add user
```

Crie, por exemplo:

```txt
admin@controlid.com
suporte@controlid.com
```

Depois rode:

```sql
update public.profiles
set role = 'admin'
where email = 'admin@controlid.com';

update public.profiles
set role = 'viewer'
where email = 'suporte.revendas@controlid.com';
```

## 3. Configurar script.js

No `script.js`, altere:

```js
const SUPABASE_URL = "COLE_AQUI_A_URL_DO_SUPABASE";
const SUPABASE_PUBLISHABLE_KEY = "COLE_AQUI_A_CHAVE_PUBLICA_SUPABASE";
```

A URL deve ser somente a base do projeto:

```js
https://xxxxxxxxxxxx.supabase.co
```

Não use `/rest/v1/`.

Use somente a chave pública/publishable/anon.
Nunca use `service_role` no frontend.

## 4. Hospedar

Pode publicar no Cloudflare Pages, Netlify, GitHub Pages ou Vercel.

Se usar Cloudflare Pages com GitHub:

```txt
Framework preset: None
Build command: vazio
Build output directory: /
```

## Observação

O botão Admin é escondido no frontend para usuário padrão, mas a segurança real está nas políticas RLS do Supabase.
Mesmo que alguém tente inserir dados pelo console, o banco bloqueia se o usuário não for `admin`.
