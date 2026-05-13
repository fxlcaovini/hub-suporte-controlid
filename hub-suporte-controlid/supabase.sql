-- ==========================================================
-- Hub de Suporte Control iD - Supabase
-- Execute no Supabase: SQL Editor > New Query > Run
-- ==========================================================

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'viewer' check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    'viewer'
  )
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_admin_only" on public.profiles;
create policy "profiles_update_admin_only"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create table if not exists public.hub_contents (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  category text not null check (category in ('primeiros-passos','rhid','idclass','idface','nuvem','erros','procedimentos','faq')),
  type text not null default 'card' check (type in ('card','error','faq')),
  title text not null,
  description text not null,
  keywords text[] not null default '{}',
  tags text[] not null default '{}',
  causes text[] not null default '{}',
  steps text[] not null default '{}',
  analysis text[] not null default '{}',
  solution text not null default '',
  answer text not null default '',
  ready_answer text not null default '',
  published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.hub_contents enable row level security;

drop policy if exists "contents_select_published_or_admin" on public.hub_contents;
create policy "contents_select_published_or_admin"
on public.hub_contents
for select
to authenticated
using (published = true or public.is_admin());

drop policy if exists "contents_insert_admin_only" on public.hub_contents;
create policy "contents_insert_admin_only"
on public.hub_contents
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "contents_update_admin_only" on public.hub_contents;
create policy "contents_update_admin_only"
on public.hub_contents
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "contents_delete_admin_only" on public.hub_contents;
create policy "contents_delete_admin_only"
on public.hub_contents
for delete
to authenticated
using (public.is_admin());

create table if not exists public.hub_favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  content_id uuid not null references public.hub_contents(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, content_id)
);

alter table public.hub_favorites enable row level security;

drop policy if exists "favorites_select_own" on public.hub_favorites;
create policy "favorites_select_own"
on public.hub_favorites
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "favorites_insert_own" on public.hub_favorites;
create policy "favorites_insert_own"
on public.hub_favorites
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "favorites_delete_own" on public.hub_favorites;
create policy "favorites_delete_own"
on public.hub_favorites
for delete
to authenticated
using (user_id = auth.uid());

create table if not exists public.hub_notes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  note text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.hub_notes enable row level security;

drop policy if exists "notes_select_own" on public.hub_notes;
create policy "notes_select_own"
on public.hub_notes
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "notes_insert_own" on public.hub_notes;
create policy "notes_insert_own"
on public.hub_notes
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "notes_update_own" on public.hub_notes;
create policy "notes_update_own"
on public.hub_notes
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "notes_delete_own" on public.hub_notes;
create policy "notes_delete_own"
on public.hub_notes
for delete
to authenticated
using (user_id = auth.uid());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_hub_contents_updated_at on public.hub_contents;
create trigger set_hub_contents_updated_at
before update on public.hub_contents
for each row execute function public.set_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

insert into public.hub_contents
(legacy_id, category, type, title, description, keywords, tags, causes, steps, analysis, solution, answer, ready_answer, published)
values
('pp-001', 'primeiros-passos', 'card', 'Como funciona o suporte técnico', 'O suporte técnico recebe demandas de clientes sobre equipamentos, sistema, rede, dúvidas operacionais e falhas de configuração.', array['suporte', 'atendimento', 'cliente', 'triagem', 'chamado'], array['Suporte', 'Atendimento', 'Triagem'], array[]::text[], array['Entenda o cenário do cliente antes de sugerir alterações.', 'Identifique se o problema envolve RHID, equipamento, rede local ou configuração.', 'Registre dados importantes: empresa, CNPJ, equipamento, IP, usuário afetado, horário e mensagem de erro.', 'Teste uma hipótese por vez para evitar mudanças desnecessárias.'], array[]::text[], '', '', 'Para analisarmos corretamente, preciso entender o cenário: qual equipamento está com problema, qual mensagem aparece, desde quando ocorre e se houve alguma alteração recente na rede, no RHID ou no cadastro.', true),
('pp-002', 'primeiros-passos', 'card', 'Como organizar o atendimento', 'Um atendimento organizado reduz retrabalho e facilita uma possível escalação para outro setor.', array['organização', 'chamado', 'evidência', 'histórico'], array['Boas práticas', 'Atendimento'], array[]::text[], array['Comece validando a solicitação principal do cliente.', 'Separe fatos de suposições: anote o que foi testado e o resultado.', 'Peça prints, logs, AFD ou dados do equipamento quando necessário.', 'Ao final, registre a causa provável, ação realizada e orientação passada.'], array[]::text[], '', '', 'Vou registrar as informações e validar por etapas para identificarmos se a causa está no equipamento, no RHID, na rede ou em alguma configuração.', true),
('pp-003', 'primeiros-passos', 'card', 'Como identificar o tipo de problema', 'A triagem deve separar problemas de equipamento, sistema, rede e configuração.', array['equipamento', 'sistema', 'rede', 'configuração', 'diagnóstico', 'triagem'], array['Diagnóstico', 'Rede', 'RHID'], array[]::text[], array['Problema no equipamento: falha física, tela, impressão, biometria, data/hora ou travamento.', 'Problema no sistema: erro no RHID, cadastro, jornada, relatório, tratamento ou acesso.', 'Problema de rede: sem internet, DNS, IP incorreto, gateway, firewall ou bloqueio de porta.', 'Problema de configuração: empresa, vínculo, funcionário, dispositivo, senha, jornada ou regras de ponto.'], array[]::text[], '', '', 'Pelo sintoma informado, vamos primeiro separar se a falha está no equipamento, sistema, rede ou configuração. Para isso, preciso validar comunicação, cadastro e mensagem exibida.', true),
('pp-004', 'primeiros-passos', 'card', 'Boas práticas de comunicação com o cliente', 'Comunicação clara evita ruído e aumenta a confiança do cliente durante o diagnóstico.', array['comunicação', 'cliente', 'orientação', 'postura', 'boas práticas'], array['Comunicação', 'Cliente'], array[]::text[], array['Explique o motivo de cada teste de forma simples.', 'Evite termos técnicos sem contexto.', 'Confirme se o cliente entendeu a orientação.', 'Não prometa solução sem diagnóstico.', 'Ao escalar, informe o que já foi validado.'], array[]::text[], '', '', 'Vou te orientar por etapas. Cada teste ajuda a eliminar uma possível causa, assim conseguimos chegar ao ponto correto com mais segurança.', true),
('rhid-001', 'rhid', 'card', 'O que é o RHID', 'O RHID é o sistema utilizado para gestão de ponto, cadastros, jornadas, tratamentos, espelho de ponto, relatórios e comunicação com equipamentos.', array['RHID', 'sistema', 'ponto', 'controle de ponto', 'relatórios'], array['RHID', 'Sistema'], array[]::text[], array['Centraliza empresas, departamentos, funcionários e regras de ponto.', 'Recebe marcações dos equipamentos quando há comunicação configurada.', 'Permite tratar inconsistências, gerar espelho de ponto e relatórios.', 'Depende de cadastros consistentes para processar corretamente as marcações.'], array[]::text[], '', '', 'O RHID é o sistema onde ficam os cadastros, jornadas, marcações, tratamentos e relatórios. Vamos validar se o cadastro e a comunicação do equipamento estão corretos.', true),
('rhid-002', 'rhid', 'card', 'Cadastro de empresas e funcionários', 'Cadastros corretos são essenciais para que o ponto seja processado e os colaboradores sincronizem.', array['cadastro', 'empresa', 'funcionário', 'colaborador', 'CPF', 'PIS', 'sincronização'], array['RHID', 'Cadastro'], array[]::text[], array['Verifique se a empresa está ativa e corretamente configurada.', 'Confira dados obrigatórios do funcionário, como nome, CPF e vínculo.', 'Valide se o funcionário está associado à empresa, departamento e jornada correta.', 'Confirme se o funcionário está habilitado para envio ao equipamento.'], array[]::text[], '', '', 'Vamos conferir o cadastro do colaborador no RHID, principalmente empresa, CPF, vínculo, jornada e habilitação para comunicação com o equipamento.', true),
('rhid-003', 'rhid', 'card', 'Configuração de jornadas', 'A jornada define como o RHID interpreta entradas, saídas, atrasos, extras, intervalo e faltas.', array['jornada', 'horário', 'escala', 'tratamento de ponto', 'espelho'], array['RHID', 'Jornada'], array[]::text[], array['Verifique o tipo de jornada utilizada pelo cliente.', 'Confira horários de entrada, saída, intervalo e tolerâncias.', 'Analise se há escala, folga, compensação ou banco de horas.', 'Após ajustes, reprocessar ou revisar o período impactado quando aplicável.'], array[]::text[], '', '', 'Para validar o espelho, preciso conferir a jornada vinculada ao colaborador, pois ela define como as marcações serão interpretadas pelo RHID.', true),
('rhid-004', 'rhid', 'card', 'Tratamento de ponto, espelho e relatórios', 'O tratamento ajusta ocorrências e o espelho consolida a leitura final do período.', array['tratamento', 'espelho', 'relatório', 'marcação', 'importação', 'ponto'], array['RHID', 'Espelho', 'Relatórios'], array[]::text[], array['Confira se as marcações foram importadas para o período correto.', 'Valide se o colaborador estava ativo no período.', 'Analise inconsistências, marcações ímpares e justificativas.', 'Gere o espelho após revisar jornadas e marcações.'], array[]::text[], '', '', 'Vamos validar se as marcações entraram no período correto e se a jornada do colaborador está adequada antes de gerar o espelho de ponto.', true),
('rhid-005', 'rhid', 'card', 'Comunicação com equipamentos no RHID', 'A comunicação depende do cadastro do equipamento, vínculo com a empresa, rede disponível e parâmetros corretos.', array['comunicação', 'equipamento', 'nuvem', 'rede', 'IP', 'porta', 'sincronização'], array['RHID', 'Comunicação', 'Rede'], array[]::text[], array['Verifique se o equipamento está cadastrado no RHID.', 'Confirme empresa vinculada e status de comunicação.', 'Valide internet, DNS e firewall no local do cliente.', 'Confira se a data e hora do equipamento estão corretas.'], array[]::text[], '', '', 'Para o equipamento comunicar com o RHID, ele precisa estar corretamente cadastrado, vinculado à empresa e com acesso à internet, DNS e portas liberadas.', true),
('idclass-001', 'idclass', 'card', 'O que é o REP iDClass', 'O REP iDClass é um registrador eletrônico de ponto usado para registrar marcações e gerar arquivos como AFD.', array['REP', 'iDClass', 'AFD', 'Portaria 671', 'registrador', 'ponto'], array['iDClass', 'REP', 'Portaria 671'], array[]::text[], array['Registra marcações dos colaboradores.', 'Permite coleta de AFD conforme o cenário do cliente.', 'Comunica com o RHID quando configurado corretamente.', 'Possui eventos sensíveis e configurações de rede, data e hora.'], array[]::text[], '', '', 'O REP iDClass registra as marcações de ponto e pode comunicar com o RHID. Também é possível coletar o AFD para análise quando necessário.', true),
('idclass-002', 'idclass', 'card', 'Configuração de rede no iDClass', 'A comunicação do equipamento depende de IP, máscara, gateway, DNS, internet e regras de firewall.', array['iDClass', 'IP', 'máscara', 'gateway', 'DNS', 'porta', 'rede', 'firewall'], array['iDClass', 'Rede', 'IP'], array[]::text[], array['Confirme se o equipamento está conectado à rede correta.', 'Valide IP, máscara, gateway e DNS.', 'Teste se a rede possui internet.', 'Verifique se não há bloqueio de firewall, proxy ou DNS.', 'Após ajuste, reinicie a comunicação ou sincronização.'], array[]::text[], '', '', 'Vamos conferir a rede do equipamento: IP, máscara, gateway e DNS. Sem esses dados corretos, o equipamento pode ficar sem comunicação com o RHID.', true),
('idclass-003', 'idclass', 'card', 'Coleta de AFD e Portaria 671', 'O AFD é usado para conferência de marcações e eventos do REP. Pode auxiliar na análise de divergências.', array['AFD', 'Portaria 671', 'NSR', 'marcação', 'arquivo', 'coleta'], array['AFD', 'Portaria 671', 'iDClass'], array[]::text[], array['Solicite o AFD do período analisado.', 'Confira se o arquivo corresponde ao equipamento correto.', 'Verifique NSR, datas, CPFs e tipos de registro.', 'Compare marcações do AFD com o que aparece no RHID.', 'Use o AFD como evidência antes de concluir que a marcação não existe.'], array[]::text[], '', '', 'Para confirmar se a marcação foi registrada no equipamento, podemos analisar o AFD do período. Ele ajuda a comparar o que está no REP com o que entrou no RHID.', true),
('idclass-004', 'idclass', 'card', 'Eventos sensíveis', 'Eventos sensíveis indicam ocorrências relevantes no REP, como manutenção, energia, porta fiscal, impressão e disponibilidade.', array['eventos sensíveis', 'REP', 'Portaria 671', 'energia', 'porta fiscal', 'impressão'], array['iDClass', 'Eventos', 'Portaria 671'], array[]::text[], array['Verifique o código do evento sensível no AFD ou relatório.', 'Analise data e hora da ocorrência.', 'Confirme se o evento impacta comunicação, impressão ou integridade.', 'Oriente o cliente conforme o tipo de ocorrência.'], array[]::text[], '', '', 'Os eventos sensíveis registram ocorrências importantes do REP. Vamos conferir o código, data e hora para entender se houve impacto em comunicação, energia, impressão ou operação.', true),
('idclass-005', 'idclass', 'card', 'Configuração de data e hora', 'Data e hora incorretas podem causar marcações fora do período, falha de sincronização ou divergências no espelho.', array['data', 'hora', 'NTP', 'marcação', 'sincronização', 'iDClass'], array['iDClass', 'Data e hora'], array[]::text[], array['Compare data e hora do equipamento com o horário oficial.', 'Verifique fuso horário e horário de verão, quando aplicável.', 'Corrija a data/hora conforme procedimento interno.', 'Após correção, realize novo teste de marcação ou comunicação.'], array[]::text[], '', '', 'Vamos validar a data e hora do equipamento, pois um horário incorreto pode fazer a marcação aparecer em outro período ou gerar divergência no RHID.', true),
('idface-001', 'idface', 'card', 'O que é o iDFace', 'O iDFace é um equipamento com reconhecimento facial usado para controle de ponto e/ou acesso, conforme o cenário.', array['iDFace', 'face', 'reconhecimento facial', 'usuário', 'sincronização'], array['iDFace', 'Face'], array[]::text[], array['Identifica usuários por reconhecimento facial.', 'Depende de cadastro correto do usuário e da face.', 'Pode comunicar com sistema quando a rede está configurada.', 'Exige boas condições de iluminação e posicionamento para cadastro.'], array[]::text[], '', '', 'O iDFace utiliza reconhecimento facial. Para funcionar bem, precisamos validar cadastro do usuário, cadastro da face, iluminação e comunicação com o sistema.', true),
('idface-002', 'idface', 'card', 'Boas práticas para cadastro facial', 'Um cadastro facial bem feito reduz falhas de reconhecimento e retrabalho.', array['cadastro facial', 'face', 'reconhecimento', 'iluminação', 'iDFace'], array['iDFace', 'Cadastro facial'], array[]::text[], array['Cadastre a face em local bem iluminado.', 'Evite contraluz, sombras fortes e rosto parcialmente coberto.', 'Oriente o usuário a olhar para o equipamento durante o cadastro.', 'Evite cadastrar com acessórios que não serão usados no dia a dia.', 'Teste o reconhecimento logo após o cadastro.'], array[]::text[], '', '', 'Para melhorar o reconhecimento, recomendo recadastrar a face em local bem iluminado, sem contraluz e com o rosto centralizado olhando para o equipamento.', true),
('idface-003', 'idface', 'card', 'Cadastro de usuários no iDFace', 'Usuários devem possuir dados consistentes no sistema e no equipamento para sincronizar corretamente.', array['usuários', 'cadastro', 'CPF', 'matrícula', 'sincronização', 'iDFace'], array['iDFace', 'Cadastro'], array[]::text[], array['Confira se o usuário existe no sistema.', 'Valide CPF, matrícula ou identificador usado no ambiente.', 'Confirme se o usuário foi enviado ao equipamento correto.', 'Verifique se há duplicidade de cadastro.', 'Após ajustar, force ou aguarde nova sincronização conforme o caso.'], array[]::text[], '', '', 'Vamos conferir se o usuário está cadastrado corretamente e se foi enviado ao iDFace certo. Duplicidade ou identificador incorreto pode impedir a sincronização.', true),
('idface-004', 'idface', 'card', 'Problemas comuns de reconhecimento facial', 'Falhas podem envolver cadastro ruim, iluminação, posicionamento, câmera suja ou usuário não sincronizado.', array['reconhecimento', 'face', 'erro', 'câmera', 'iluminação', 'sincronização'], array['iDFace', 'Erro', 'Face'], array[]::text[], array['Confirme se o usuário está sincronizado no equipamento.', 'Teste com outro usuário para separar falha geral de falha individual.', 'Verifique iluminação e reflexos no local.', 'Limpe a região da câmera se necessário.', 'Recadastre a face seguindo boas práticas.'], array[]::text[], '', '', 'Se apenas um usuário falha, o ideal é validar o cadastro facial dele. Se vários usuários falham, vamos analisar iluminação, câmera e sincronização do equipamento.', true),
('nuvem-001', 'nuvem', 'card', 'Como os equipamentos se comunicam com o RHID', 'A comunicação depende da configuração do equipamento, acesso à internet, DNS, firewall e cadastro correto no sistema.', array['nuvem', 'RHID', 'comunicação', 'internet', 'DNS', 'firewall', 'porta'], array['Nuvem', 'RHID', 'Rede'], array[]::text[], array['O equipamento precisa estar conectado à rede local.', 'A rede deve permitir saída para a internet.', 'DNS precisa resolver os endereços necessários.', 'Firewall ou proxy não podem bloquear a comunicação.', 'O equipamento deve estar vinculado corretamente no RHID.'], array[]::text[], '', '', 'A comunicação com o RHID depende da rede local permitir acesso à internet, resolução DNS e saída nas portas necessárias, além do equipamento estar cadastrado corretamente.', true),
('nuvem-002', 'nuvem', 'card', 'Checklist de diagnóstico de comunicação', 'Use este checklist para analisar equipamentos que não comunicam com a nuvem.', array['checklist', 'comunicação', 'nuvem', 'IP', 'gateway', 'DNS', 'porta', 'firewall'], array['Checklist', 'Rede', 'Nuvem'], array[]::text[], array['Validar cabo de rede ou Wi-Fi, conforme o modelo.', 'Conferir IP, máscara, gateway e DNS.', 'Confirmar se a rede tem internet.', 'Verificar firewall, proxy, VLAN ou bloqueios.', 'Conferir data e hora do equipamento.', 'Validar cadastro e vínculo do equipamento no RHID.'], array[]::text[], '', '', 'Para diagnosticar a comunicação, vamos conferir cabo ou Wi-Fi, IP, máscara, gateway, DNS, internet, firewall e cadastro do equipamento no RHID.', true),
('nuvem-003', 'nuvem', 'card', 'Diferença entre rede local e servidor', 'Nem toda falha de comunicação indica problema no servidor. Primeiro valide se a rede do cliente permite saída.', array['rede local', 'servidor', 'nuvem', 'diagnóstico', 'bloqueio', 'firewall'], array['Rede', 'Servidor', 'Diagnóstico'], array[]::text[], array['Se somente um cliente ou local falha, suspeite primeiro de rede local ou configuração.', 'Se vários equipamentos do mesmo local falham, verifique firewall, DNS ou internet.', 'Se múltiplos clientes reportam o mesmo sintoma simultaneamente, avalie possibilidade de instabilidade geral.', 'Registre evidências antes de escalar como possível servidor.'], array[]::text[], '', '', 'Antes de considerar instabilidade no servidor, precisamos validar se a rede local do cliente permite a comunicação. Se apenas esse local falha, normalmente a causa está na rede ou configuração.', true),
('nuvem-004', 'nuvem', 'card', 'Campos importantes de rede', 'IP, máscara, gateway, DNS e porta são informações essenciais em qualquer diagnóstico de comunicação.', array['IP', 'máscara', 'gateway', 'DNS', 'porta', 'rede', 'configuração'], array['IP', 'DNS', 'Gateway'], array[]::text[], array['IP: endereço do equipamento na rede local.', 'Máscara: define o tamanho da rede.', 'Gateway: rota de saída para outras redes e internet.', 'DNS: traduz domínios em endereços IP.', 'Porta: canal usado para comunicação com serviços.'], array[]::text[], '', '', 'Preciso confirmar os dados de rede do equipamento: IP, máscara, gateway e DNS. Esses campos determinam se ele consegue sair para a internet.', true),
('proc-001', 'procedimentos', 'card', 'Atendimento inicial', 'Checklist para iniciar o chamado com contexto suficiente.', array['atendimento inicial', 'checklist', 'cliente', 'chamado'], array['Checklist', 'Atendimento'], array[]::text[], array['Cumprimente e confirme o nome do cliente.', 'Identifique empresa, unidade e equipamento envolvido.', 'Pergunte desde quando ocorre e se houve mudança recente.', 'Solicite mensagem de erro, print ou evidência.', 'Classifique o problema: RHID, equipamento, rede ou configuração.'], array[]::text[], '', '', 'Para iniciar a análise, preciso confirmar empresa, equipamento, desde quando ocorre, mensagem de erro e se houve alguma alteração recente no ambiente.', true),
('proc-002', 'procedimentos', 'card', 'Coleta de informações do cliente', 'Dados que devem ser coletados para evitar diagnóstico incompleto.', array['coleta', 'informações', 'cliente', 'dados', 'diagnóstico'], array['Checklist', 'Cliente'], array[]::text[], array['Modelo do equipamento.', 'Número de série ou identificação interna.', 'IP do equipamento e tipo de conexão.', 'Empresa e funcionário afetado.', 'Período do problema.', 'Prints, mensagens ou arquivos como AFD, se aplicável.'], array[]::text[], '', '', 'Para prosseguir, poderia me enviar modelo do equipamento, IP, empresa afetada, período do problema e um print da mensagem exibida?', true),
('proc-003', 'procedimentos', 'card', 'Diagnóstico de comunicação', 'Sequência recomendada para analisar equipamento sem comunicação.', array['diagnóstico', 'comunicação', 'nuvem', 'rede', 'firewall', 'DNS'], array['Rede', 'Nuvem', 'Checklist'], array[]::text[], array['Confirmar se o equipamento está ligado e conectado à rede.', 'Verificar IP, máscara, gateway e DNS.', 'Testar internet na mesma rede, quando possível.', 'Validar se firewall/proxy não bloqueia a comunicação.', 'Conferir cadastro do equipamento no RHID.', 'Registrar evidências antes de escalar.'], array[]::text[], '', '', 'Vamos seguir o diagnóstico de comunicação: primeiro rede local, depois DNS/gateway/firewall e por fim cadastro do equipamento no RHID.', true),
('proc-004', 'procedimentos', 'card', 'Quando escalar para outro setor', 'Escalação deve acontecer com evidências e testes já realizados.', array['escalar', 'setor', 'evidência', 'chamado', 'suporte'], array['Escalação', 'Atendimento'], array[]::text[], array['Escalar quando há indício de falha sistêmica, bug, indisponibilidade ou necessidade de acesso interno.', 'Anexar prints, logs, AFD, horários e descrição do impacto.', 'Informar testes já realizados e resultados.', 'Evitar escalar sem validar cenário básico de rede e cadastro.'], array[]::text[], '', '', 'Vou escalar o caso com as evidências coletadas e os testes realizados para que o próximo setor tenha contexto completo da análise.', true),
('proc-005', 'procedimentos', 'card', 'Como finalizar o atendimento', 'Encerramento claro ajuda o cliente e mantém histórico útil para futuros contatos.', array['finalizar', 'encerramento', 'chamado', 'histórico', 'orientação'], array['Atendimento', 'Registro'], array[]::text[], array['Explique a causa identificada ou hipótese mais provável.', 'Informe a ação realizada.', 'Passe orientação preventiva, se houver.', 'Confirme se o cliente precisa de mais alguma ajuda.', 'Registre o resumo do atendimento.'], array[]::text[], '', '', 'O atendimento foi concluído com a seguinte ação: [descrever ação]. Recomendo manter [orientação preventiva] para evitar nova ocorrência.', true),
('err-001', 'erros', 'error', 'Equipamento não comunica', 'O equipamento aparece offline ou não envia dados ao RHID.', array['equipamento', 'não comunica', 'offline', 'nuvem', 'rede', 'IP', 'DNS'], array['Rede', 'Nuvem', 'RHID'], array['Equipamento sem internet.', 'IP, gateway, máscara ou DNS incorretos.', 'Firewall, proxy ou porta bloqueada.', 'Equipamento não vinculado corretamente no RHID.', 'Data e hora incorretas.'], array['Validar conexão física ou Wi-Fi.', 'Conferir dados de rede.', 'Testar internet na mesma rede.', 'Verificar cadastro do equipamento no RHID.', 'Conferir data e hora.'], array['Validar conexão física ou Wi-Fi.', 'Conferir dados de rede.', 'Testar internet na mesma rede.', 'Verificar cadastro do equipamento no RHID.', 'Conferir data e hora.'], 'Corrigir parâmetros de rede, liberar comunicação no firewall/proxy e validar vínculo do equipamento no RHID.', '', '', true),
('err-002', 'erros', 'error', 'Funcionário não sincroniza', 'Colaborador cadastrado no RHID não aparece no equipamento.', array['funcionário', 'colaborador', 'não sincroniza', 'cadastro', 'CPF', 'equipamento'], array['RHID', 'Cadastro', 'Sincronização'], array['Cadastro incompleto ou com CPF incorreto.', 'Funcionário não habilitado para envio.', 'Equipamento sem comunicação.', 'Vínculo incorreto com empresa ou dispositivo.', 'Duplicidade de cadastro.'], array['Conferir cadastro do funcionário.', 'Verificar se está ativo e vinculado corretamente.', 'Checar se o equipamento comunica.', 'Analisar se há duplicidade ou erro de identificador.'], array['Conferir cadastro do funcionário.', 'Verificar se está ativo e vinculado corretamente.', 'Checar se o equipamento comunica.', 'Analisar se há duplicidade ou erro de identificador.'], 'Corrigir cadastro/vínculo e reenviar ou aguardar sincronização após restabelecer a comunicação.', '', '', true),
('err-003', 'erros', 'error', 'AFD não aparece', 'Cliente informa que não consegue localizar ou coletar o AFD.', array['AFD', 'não aparece', 'coleta', 'Portaria 671', 'arquivo'], array['AFD', 'Portaria 671', 'iDClass'], array['Período selecionado incorreto.', 'Equipamento errado.', 'Marcações não realizadas no período.', 'Falha de coleta ou arquivo salvo em local diferente.'], array['Confirmar equipamento e período.', 'Verificar se houve marcações no período.', 'Orientar nova coleta.', 'Comparar arquivo coletado com dados do RHID.'], array['Confirmar equipamento e período.', 'Verificar se houve marcações no período.', 'Orientar nova coleta.', 'Comparar arquivo coletado com dados do RHID.'], 'Realizar nova coleta do AFD no equipamento correto e conferir período, NSR e registros existentes.', '', '', true),
('err-004', 'erros', 'error', 'Erro ao cadastrar funcionário', 'Sistema ou equipamento não aceita o cadastro do colaborador.', array['erro', 'cadastro', 'funcionário', 'CPF', 'PIS', 'matrícula'], array['Cadastro', 'RHID', 'iDClass'], array['Campo obrigatório ausente.', 'CPF ou identificador inválido.', 'Colaborador já cadastrado.', 'Empresa ou departamento não vinculado.', 'Permissão insuficiente do usuário.'], array['Ler a mensagem de erro completa.', 'Validar campos obrigatórios.', 'Pesquisar duplicidade.', 'Conferir vínculo com empresa/departamento.'], array['Ler a mensagem de erro completa.', 'Validar campos obrigatórios.', 'Pesquisar duplicidade.', 'Conferir vínculo com empresa/departamento.'], 'Corrigir campos obrigatórios, remover duplicidade quando aplicável e revisar permissões/vínculos.', '', '', true),
('err-005', 'erros', 'error', 'Equipamento sem internet', 'Equipamento possui rede local, mas não acessa a internet.', array['sem internet', 'rede', 'gateway', 'DNS', 'firewall', 'IP'], array['Rede', 'Internet'], array['Gateway incorreto.', 'DNS inválido ou bloqueado.', 'Firewall bloqueando saída.', 'Rede sem acesso externo.', 'Cabo ou porta de rede com falha.'], array['Conferir cabo, switch ou Wi-Fi.', 'Validar IP, máscara, gateway e DNS.', 'Testar outro dispositivo na mesma rede.', 'Acionar TI do cliente para liberar acesso.'], array['Conferir cabo, switch ou Wi-Fi.', 'Validar IP, máscara, gateway e DNS.', 'Testar outro dispositivo na mesma rede.', 'Acionar TI do cliente para liberar acesso.'], 'Corrigir gateway/DNS ou solicitar à TI do cliente a liberação de internet para o equipamento.', '', '', true),
('err-006', 'erros', 'error', 'Data e hora incorretas', 'Marcações entram em data errada ou equipamento mostra horário divergente.', array['data', 'hora', 'NTP', 'marcação', 'período', 'espelho'], array['Data e hora', 'Marcação'], array['Configuração manual incorreta.', 'Fuso horário inadequado.', 'Sem sincronização NTP.', 'Falha após queda de energia.'], array['Comparar horário do equipamento com o horário atual.', 'Verificar fuso horário.', 'Checar se houve queda de energia.', 'Analisar marcações do período.'], array['Comparar horário do equipamento com o horário atual.', 'Verificar fuso horário.', 'Checar se houve queda de energia.', 'Analisar marcações do período.'], 'Corrigir data/hora e orientar nova validação das marcações após o ajuste.', '', '', true),
('err-007', 'erros', 'error', 'Biometria ou face não reconhece', 'Usuário não consegue registrar ponto por biometria ou reconhecimento facial.', array['biometria', 'face', 'não reconhece', 'iDFace', 'digital', 'cadastro facial'], array['iDFace', 'Biometria'], array['Cadastro de biometria ou face ruim.', 'Usuário não sincronizado.', 'Iluminação inadequada.', 'Sensor/câmera sujo.', 'Mudança física ou uso de acessórios.'], array['Testar com outro usuário.', 'Verificar se o usuário está no equipamento.', 'Avaliar iluminação e câmera/sensor.', 'Recadastrar biometria ou face.'], array['Testar com outro usuário.', 'Verificar se o usuário está no equipamento.', 'Avaliar iluminação e câmera/sensor.', 'Recadastrar biometria ou face.'], 'Recadastrar a biometria/face seguindo boas práticas e confirmar sincronização do usuário.', '', '', true),
('err-008', 'erros', 'error', 'RHID não importa marcações', 'Marcações existem no equipamento, mas não aparecem no RHID.', array['RHID', 'não importa', 'marcações', 'AFD', 'comunicação', 'sincronização'], array['RHID', 'AFD', 'Comunicação'], array['Equipamento sem comunicação.', 'Marcações em período diferente por data/hora incorreta.', 'Funcionário não vinculado corretamente.', 'Falha de importação ou processamento.', 'AFD ainda não coletado/importado.'], array['Confirmar marcação no equipamento ou AFD.', 'Conferir comunicação com o RHID.', 'Validar cadastro do funcionário.', 'Verificar período e data/hora.', 'Analisar mensagens de importação.'], array['Confirmar marcação no equipamento ou AFD.', 'Conferir comunicação com o RHID.', 'Validar cadastro do funcionário.', 'Verificar período e data/hora.', 'Analisar mensagens de importação.'], 'Restabelecer comunicação, corrigir cadastro/período e importar ou processar novamente as marcações.', '', '', true),
('err-009', 'erros', 'error', 'Cliente não consegue acessar o sistema', 'Usuário não consegue entrar no RHID ou relata erro de login.', array['acesso', 'login', 'senha', 'usuário', 'RHID', 'sistema'], array['Acesso', 'RHID'], array['Senha incorreta.', 'Usuário bloqueado ou inativo.', 'Permissão insuficiente.', 'E-mail ou login incorreto.', 'Problema de navegador/cache.'], array['Confirmar usuário/login utilizado.', 'Verificar mensagem de erro.', 'Validar status e permissões do usuário.', 'Orientar teste em aba anônima ou outro navegador.', 'Quando aplicável, redefinir senha.'], array['Confirmar usuário/login utilizado.', 'Verificar mensagem de erro.', 'Validar status e permissões do usuário.', 'Orientar teste em aba anônima ou outro navegador.', 'Quando aplicável, redefinir senha.'], 'Regularizar usuário, permissões ou senha e orientar novo acesso em navegador atualizado.', '', '', true),
('faq-001', 'faq', 'faq', 'Como saber se o problema é de rede?', 'Analise se o equipamento está sem internet, sem DNS, com gateway incorreto ou bloqueado por firewall.', array['rede', 'internet', 'DNS', 'gateway', 'firewall'], array['Rede', 'Diagnóstico'], array[]::text[], array[]::text[], array[]::text[], 'Comece validando IP, máscara, gateway e DNS. Depois confirme se outro dispositivo na mesma rede acessa a internet. Se somente o equipamento falha, revise a configuração dele. Se vários equipamentos falham, acione a TI do cliente para avaliar rede, firewall, proxy ou VLAN.', 'Comece validando IP, máscara, gateway e DNS. Depois confirme se outro dispositivo na mesma rede acessa a internet. Se somente o equipamento falha, revise a configuração dele. Se vários equipamentos falham, acione a TI do cliente para avaliar rede, firewall, proxy ou VLAN.', 'Comece validando IP, máscara, gateway e DNS. Depois confirme se outro dispositivo na mesma rede acessa a internet. Se somente o equipamento falha, revise a configuração dele. Se vários equipamentos falham, acione a TI do cliente para avaliar rede, firewall, proxy ou VLAN.', true),
('faq-002', 'faq', 'faq', 'Como verificar se o equipamento está comunicando?', 'Confira status no RHID, cadastro do equipamento e conectividade local.', array['comunicando', 'equipamento', 'RHID', 'status', 'nuvem'], array['Comunicação', 'RHID'], array[]::text[], array[]::text[], array[]::text[], 'Verifique o status do equipamento no RHID, confirme se ele está cadastrado na empresa correta e valide se a rede local possui internet, DNS e portas liberadas. Também confira data e hora do equipamento.', 'Verifique o status do equipamento no RHID, confirme se ele está cadastrado na empresa correta e valide se a rede local possui internet, DNS e portas liberadas. Também confira data e hora do equipamento.', 'Verifique o status do equipamento no RHID, confirme se ele está cadastrado na empresa correta e valide se a rede local possui internet, DNS e portas liberadas. Também confira data e hora do equipamento.', true),
('faq-003', 'faq', 'faq', 'O que pedir ao cliente no início do atendimento?', 'Peça informações que permitam classificar o problema e evitar retrabalho.', array['início', 'cliente', 'atendimento', 'dados', 'coleta'], array['Atendimento'], array[]::text[], array[]::text[], array[]::text[], 'Solicite empresa, contato, modelo do equipamento, IP, mensagem de erro, desde quando ocorre, usuário/funcionário afetado e se houve alteração recente na rede, no sistema ou no cadastro.', 'Solicite empresa, contato, modelo do equipamento, IP, mensagem de erro, desde quando ocorre, usuário/funcionário afetado e se houve alteração recente na rede, no sistema ou no cadastro.', 'Solicite empresa, contato, modelo do equipamento, IP, mensagem de erro, desde quando ocorre, usuário/funcionário afetado e se houve alteração recente na rede, no sistema ou no cadastro.', true),
('faq-004', 'faq', 'faq', 'Como orientar um cliente que não sabe configurar rede?', 'Explique de forma simples e envolva a TI do cliente quando necessário.', array['configurar rede', 'cliente', 'TI', 'IP', 'DNS'], array['Rede', 'Cliente'], array[]::text[], array[]::text[], array[]::text[], 'Explique que a configuração de rede depende de dados fornecidos pela TI local: IP, máscara, gateway e DNS. Oriente o cliente a acionar o responsável pela rede para confirmar essas informações e liberar a comunicação.', 'Explique que a configuração de rede depende de dados fornecidos pela TI local: IP, máscara, gateway e DNS. Oriente o cliente a acionar o responsável pela rede para confirmar essas informações e liberar a comunicação.', 'Explique que a configuração de rede depende de dados fornecidos pela TI local: IP, máscara, gateway e DNS. Oriente o cliente a acionar o responsável pela rede para confirmar essas informações e liberar a comunicação.', true),
('faq-005', 'faq', 'faq', 'Quando solicitar acesso remoto?', 'Solicite acesso remoto quando a orientação verbal não for suficiente ou quando for necessário validar configurações em tela.', array['acesso remoto', 'suporte', 'cliente', 'diagnóstico'], array['Atendimento', 'Acesso remoto'], array[]::text[], array[]::text[], array[]::text[], 'Solicite acesso remoto quando precisar conferir telas do RHID, mensagens de erro, cadastro, configurações de equipamento ou quando o cliente tiver dificuldade em seguir o passo a passo sozinho.', 'Solicite acesso remoto quando precisar conferir telas do RHID, mensagens de erro, cadastro, configurações de equipamento ou quando o cliente tiver dificuldade em seguir o passo a passo sozinho.', 'Solicite acesso remoto quando precisar conferir telas do RHID, mensagens de erro, cadastro, configurações de equipamento ou quando o cliente tiver dificuldade em seguir o passo a passo sozinho.', true),
('faq-006', 'faq', 'faq', 'Quando escalar o chamado?', 'Escalone após validar o básico e reunir evidências.', array['escalar', 'chamado', 'evidência', 'suporte'], array['Escalação'], array[]::text[], array[]::text[], array[]::text[], 'Escale quando houver indício de bug, indisponibilidade, limitação de permissão, necessidade de análise interna ou quando todos os testes básicos já foram realizados. Inclua prints, logs, AFD, horários e resumo dos testes.', 'Escale quando houver indício de bug, indisponibilidade, limitação de permissão, necessidade de análise interna ou quando todos os testes básicos já foram realizados. Inclua prints, logs, AFD, horários e resumo dos testes.', 'Escale quando houver indício de bug, indisponibilidade, limitação de permissão, necessidade de análise interna ou quando todos os testes básicos já foram realizados. Inclua prints, logs, AFD, horários e resumo dos testes.', true)
on conflict (legacy_id) do update
set
  category = excluded.category,
  type = excluded.type,
  title = excluded.title,
  description = excluded.description,
  keywords = excluded.keywords,
  tags = excluded.tags,
  causes = excluded.causes,
  steps = excluded.steps,
  analysis = excluded.analysis,
  solution = excluded.solution,
  answer = excluded.answer,
  ready_answer = excluded.ready_answer,
  published = excluded.published;

-- ==========================================================
-- Depois de criar usuários em Authentication > Users,
-- defina quem será admin:
-- ==========================================================
-- update public.profiles
-- set role = 'admin'
-- where email = 'admin@controlid.com';

-- update public.profiles
-- set role = 'viewer'
-- where email = 'suporte@controlid.com';

-- select email, role from public.profiles order by created_at desc;
