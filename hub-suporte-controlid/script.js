/* ==========================================================
   Hub de Suporte Control iD
   Visual original preservado + Supabase Auth/Banco/Admin.
   ========================================================== */

// Configure com os dados do seu projeto Supabase.
// Use somente Project URL e publishable/anon public key.
// Nunca coloque service_role ou secret key no frontend.
const SUPABASE_URL = "COLE_AQUI_A_URL_DO_SUPABASE";
const SUPABASE_PUBLISHABLE_KEY = "COLE_AQUI_A_CHAVE_PUBLICA_SUPABASE";

const STORAGE_KEYS = {
  theme: "controlid_hub_theme"
};

const modules = [
  {
    "id": "primeiros-passos",
    "icon": "🚀",
    "title": "Primeiros Passos",
    "description": "Fluxo de suporte, organização do atendimento, identificação de problemas e boas práticas."
  },
  {
    "id": "rhid",
    "icon": "🕒",
    "title": "RHID",
    "description": "Cadastros, jornadas, tratamento de ponto, espelho, relatórios e comunicação."
  },
  {
    "id": "idclass",
    "icon": "🧾",
    "title": "REP iDClass",
    "description": "Configuração, AFD, eventos sensíveis, rede, data/hora e comunicação com RHID."
  },
  {
    "id": "idface",
    "icon": "🙂",
    "title": "iDFace",
    "description": "Cadastro facial, usuários, sincronização, rede e reconhecimento facial."
  },
  {
    "id": "nuvem",
    "icon": "☁️",
    "title": "Comunicação com a Nuvem",
    "description": "Rede, DNS, firewall, portas, IP, gateway, máscara, DNS e diagnóstico."
  },
  {
    "id": "erros",
    "icon": "⚠️",
    "title": "Erros Comuns",
    "description": "Base de troubleshooting com possíveis causas, análise e soluções."
  },
  {
    "id": "procedimentos",
    "icon": "✅",
    "title": "Procedimentos de Atendimento",
    "description": "Checklists para conduzir, diagnosticar, escalar e finalizar chamados."
  },
  {
    "id": "faq",
    "icon": "❓",
    "title": "FAQ",
    "description": "Perguntas frequentes para consulta rápida durante o atendimento."
  }
];

const fallbackContents = [
  {
    "id": "pp-001",
    "category": "primeiros-passos",
    "type": "card",
    "title": "Como funciona o suporte técnico",
    "description": "O suporte técnico recebe demandas de clientes sobre equipamentos, sistema, rede, dúvidas operacionais e falhas de configuração.",
    "keywords": [
      "suporte",
      "atendimento",
      "cliente",
      "triagem",
      "chamado"
    ],
    "tags": [
      "Suporte",
      "Atendimento",
      "Triagem"
    ],
    "steps": [
      "Entenda o cenário do cliente antes de sugerir alterações.",
      "Identifique se o problema envolve RHID, equipamento, rede local ou configuração.",
      "Registre dados importantes: empresa, CNPJ, equipamento, IP, usuário afetado, horário e mensagem de erro.",
      "Teste uma hipótese por vez para evitar mudanças desnecessárias."
    ],
    "readyAnswer": "Para analisarmos corretamente, preciso entender o cenário: qual equipamento está com problema, qual mensagem aparece, desde quando ocorre e se houve alguma alteração recente na rede, no RHID ou no cadastro."
  },
  {
    "id": "pp-002",
    "category": "primeiros-passos",
    "type": "card",
    "title": "Como organizar o atendimento",
    "description": "Um atendimento organizado reduz retrabalho e facilita uma possível escalação para outro setor.",
    "keywords": [
      "organização",
      "chamado",
      "evidência",
      "histórico"
    ],
    "tags": [
      "Boas práticas",
      "Atendimento"
    ],
    "steps": [
      "Comece validando a solicitação principal do cliente.",
      "Separe fatos de suposições: anote o que foi testado e o resultado.",
      "Peça prints, logs, AFD ou dados do equipamento quando necessário.",
      "Ao final, registre a causa provável, ação realizada e orientação passada."
    ],
    "readyAnswer": "Vou registrar as informações e validar por etapas para identificarmos se a causa está no equipamento, no RHID, na rede ou em alguma configuração."
  },
  {
    "id": "pp-003",
    "category": "primeiros-passos",
    "type": "card",
    "title": "Como identificar o tipo de problema",
    "description": "A triagem deve separar problemas de equipamento, sistema, rede e configuração.",
    "keywords": [
      "equipamento",
      "sistema",
      "rede",
      "configuração",
      "diagnóstico",
      "triagem"
    ],
    "tags": [
      "Diagnóstico",
      "Rede",
      "RHID"
    ],
    "steps": [
      "Problema no equipamento: falha física, tela, impressão, biometria, data/hora ou travamento.",
      "Problema no sistema: erro no RHID, cadastro, jornada, relatório, tratamento ou acesso.",
      "Problema de rede: sem internet, DNS, IP incorreto, gateway, firewall ou bloqueio de porta.",
      "Problema de configuração: empresa, vínculo, funcionário, dispositivo, senha, jornada ou regras de ponto."
    ],
    "readyAnswer": "Pelo sintoma informado, vamos primeiro separar se a falha está no equipamento, sistema, rede ou configuração. Para isso, preciso validar comunicação, cadastro e mensagem exibida."
  },
  {
    "id": "pp-004",
    "category": "primeiros-passos",
    "type": "card",
    "title": "Boas práticas de comunicação com o cliente",
    "description": "Comunicação clara evita ruído e aumenta a confiança do cliente durante o diagnóstico.",
    "keywords": [
      "comunicação",
      "cliente",
      "orientação",
      "postura",
      "boas práticas"
    ],
    "tags": [
      "Comunicação",
      "Cliente"
    ],
    "steps": [
      "Explique o motivo de cada teste de forma simples.",
      "Evite termos técnicos sem contexto.",
      "Confirme se o cliente entendeu a orientação.",
      "Não prometa solução sem diagnóstico.",
      "Ao escalar, informe o que já foi validado."
    ],
    "readyAnswer": "Vou te orientar por etapas. Cada teste ajuda a eliminar uma possível causa, assim conseguimos chegar ao ponto correto com mais segurança."
  },
  {
    "id": "rhid-001",
    "category": "rhid",
    "type": "card",
    "title": "O que é o RHID",
    "description": "O RHID é o sistema utilizado para gestão de ponto, cadastros, jornadas, tratamentos, espelho de ponto, relatórios e comunicação com equipamentos.",
    "keywords": [
      "RHID",
      "sistema",
      "ponto",
      "controle de ponto",
      "relatórios"
    ],
    "tags": [
      "RHID",
      "Sistema"
    ],
    "steps": [
      "Centraliza empresas, departamentos, funcionários e regras de ponto.",
      "Recebe marcações dos equipamentos quando há comunicação configurada.",
      "Permite tratar inconsistências, gerar espelho de ponto e relatórios.",
      "Depende de cadastros consistentes para processar corretamente as marcações."
    ],
    "readyAnswer": "O RHID é o sistema onde ficam os cadastros, jornadas, marcações, tratamentos e relatórios. Vamos validar se o cadastro e a comunicação do equipamento estão corretos."
  },
  {
    "id": "rhid-002",
    "category": "rhid",
    "type": "card",
    "title": "Cadastro de empresas e funcionários",
    "description": "Cadastros corretos são essenciais para que o ponto seja processado e os colaboradores sincronizem.",
    "keywords": [
      "cadastro",
      "empresa",
      "funcionário",
      "colaborador",
      "CPF",
      "PIS",
      "sincronização"
    ],
    "tags": [
      "RHID",
      "Cadastro"
    ],
    "steps": [
      "Verifique se a empresa está ativa e corretamente configurada.",
      "Confira dados obrigatórios do funcionário, como nome, CPF e vínculo.",
      "Valide se o funcionário está associado à empresa, departamento e jornada correta.",
      "Confirme se o funcionário está habilitado para envio ao equipamento."
    ],
    "readyAnswer": "Vamos conferir o cadastro do colaborador no RHID, principalmente empresa, CPF, vínculo, jornada e habilitação para comunicação com o equipamento."
  },
  {
    "id": "rhid-003",
    "category": "rhid",
    "type": "card",
    "title": "Configuração de jornadas",
    "description": "A jornada define como o RHID interpreta entradas, saídas, atrasos, extras, intervalo e faltas.",
    "keywords": [
      "jornada",
      "horário",
      "escala",
      "tratamento de ponto",
      "espelho"
    ],
    "tags": [
      "RHID",
      "Jornada"
    ],
    "steps": [
      "Verifique o tipo de jornada utilizada pelo cliente.",
      "Confira horários de entrada, saída, intervalo e tolerâncias.",
      "Analise se há escala, folga, compensação ou banco de horas.",
      "Após ajustes, reprocessar ou revisar o período impactado quando aplicável."
    ],
    "readyAnswer": "Para validar o espelho, preciso conferir a jornada vinculada ao colaborador, pois ela define como as marcações serão interpretadas pelo RHID."
  },
  {
    "id": "rhid-004",
    "category": "rhid",
    "type": "card",
    "title": "Tratamento de ponto, espelho e relatórios",
    "description": "O tratamento ajusta ocorrências e o espelho consolida a leitura final do período.",
    "keywords": [
      "tratamento",
      "espelho",
      "relatório",
      "marcação",
      "importação",
      "ponto"
    ],
    "tags": [
      "RHID",
      "Espelho",
      "Relatórios"
    ],
    "steps": [
      "Confira se as marcações foram importadas para o período correto.",
      "Valide se o colaborador estava ativo no período.",
      "Analise inconsistências, marcações ímpares e justificativas.",
      "Gere o espelho após revisar jornadas e marcações."
    ],
    "readyAnswer": "Vamos validar se as marcações entraram no período correto e se a jornada do colaborador está adequada antes de gerar o espelho de ponto."
  },
  {
    "id": "rhid-005",
    "category": "rhid",
    "type": "card",
    "title": "Comunicação com equipamentos no RHID",
    "description": "A comunicação depende do cadastro do equipamento, vínculo com a empresa, rede disponível e parâmetros corretos.",
    "keywords": [
      "comunicação",
      "equipamento",
      "nuvem",
      "rede",
      "IP",
      "porta",
      "sincronização"
    ],
    "tags": [
      "RHID",
      "Comunicação",
      "Rede"
    ],
    "steps": [
      "Verifique se o equipamento está cadastrado no RHID.",
      "Confirme empresa vinculada e status de comunicação.",
      "Valide internet, DNS e firewall no local do cliente.",
      "Confira se a data e hora do equipamento estão corretas."
    ],
    "readyAnswer": "Para o equipamento comunicar com o RHID, ele precisa estar corretamente cadastrado, vinculado à empresa e com acesso à internet, DNS e portas liberadas."
  },
  {
    "id": "idclass-001",
    "category": "idclass",
    "type": "card",
    "title": "O que é o REP iDClass",
    "description": "O REP iDClass é um registrador eletrônico de ponto usado para registrar marcações e gerar arquivos como AFD.",
    "keywords": [
      "REP",
      "iDClass",
      "AFD",
      "Portaria 671",
      "registrador",
      "ponto"
    ],
    "tags": [
      "iDClass",
      "REP",
      "Portaria 671"
    ],
    "steps": [
      "Registra marcações dos colaboradores.",
      "Permite coleta de AFD conforme o cenário do cliente.",
      "Comunica com o RHID quando configurado corretamente.",
      "Possui eventos sensíveis e configurações de rede, data e hora."
    ],
    "readyAnswer": "O REP iDClass registra as marcações de ponto e pode comunicar com o RHID. Também é possível coletar o AFD para análise quando necessário."
  },
  {
    "id": "idclass-002",
    "category": "idclass",
    "type": "card",
    "title": "Configuração de rede no iDClass",
    "description": "A comunicação do equipamento depende de IP, máscara, gateway, DNS, internet e regras de firewall.",
    "keywords": [
      "iDClass",
      "IP",
      "máscara",
      "gateway",
      "DNS",
      "porta",
      "rede",
      "firewall"
    ],
    "tags": [
      "iDClass",
      "Rede",
      "IP"
    ],
    "steps": [
      "Confirme se o equipamento está conectado à rede correta.",
      "Valide IP, máscara, gateway e DNS.",
      "Teste se a rede possui internet.",
      "Verifique se não há bloqueio de firewall, proxy ou DNS.",
      "Após ajuste, reinicie a comunicação ou sincronização."
    ],
    "readyAnswer": "Vamos conferir a rede do equipamento: IP, máscara, gateway e DNS. Sem esses dados corretos, o equipamento pode ficar sem comunicação com o RHID."
  },
  {
    "id": "idclass-003",
    "category": "idclass",
    "type": "card",
    "title": "Coleta de AFD e Portaria 671",
    "description": "O AFD é usado para conferência de marcações e eventos do REP. Pode auxiliar na análise de divergências.",
    "keywords": [
      "AFD",
      "Portaria 671",
      "NSR",
      "marcação",
      "arquivo",
      "coleta"
    ],
    "tags": [
      "AFD",
      "Portaria 671",
      "iDClass"
    ],
    "steps": [
      "Solicite o AFD do período analisado.",
      "Confira se o arquivo corresponde ao equipamento correto.",
      "Verifique NSR, datas, CPFs e tipos de registro.",
      "Compare marcações do AFD com o que aparece no RHID.",
      "Use o AFD como evidência antes de concluir que a marcação não existe."
    ],
    "readyAnswer": "Para confirmar se a marcação foi registrada no equipamento, podemos analisar o AFD do período. Ele ajuda a comparar o que está no REP com o que entrou no RHID."
  },
  {
    "id": "idclass-004",
    "category": "idclass",
    "type": "card",
    "title": "Eventos sensíveis",
    "description": "Eventos sensíveis indicam ocorrências relevantes no REP, como manutenção, energia, porta fiscal, impressão e disponibilidade.",
    "keywords": [
      "eventos sensíveis",
      "REP",
      "Portaria 671",
      "energia",
      "porta fiscal",
      "impressão"
    ],
    "tags": [
      "iDClass",
      "Eventos",
      "Portaria 671"
    ],
    "steps": [
      "Verifique o código do evento sensível no AFD ou relatório.",
      "Analise data e hora da ocorrência.",
      "Confirme se o evento impacta comunicação, impressão ou integridade.",
      "Oriente o cliente conforme o tipo de ocorrência."
    ],
    "readyAnswer": "Os eventos sensíveis registram ocorrências importantes do REP. Vamos conferir o código, data e hora para entender se houve impacto em comunicação, energia, impressão ou operação."
  },
  {
    "id": "idclass-005",
    "category": "idclass",
    "type": "card",
    "title": "Configuração de data e hora",
    "description": "Data e hora incorretas podem causar marcações fora do período, falha de sincronização ou divergências no espelho.",
    "keywords": [
      "data",
      "hora",
      "NTP",
      "marcação",
      "sincronização",
      "iDClass"
    ],
    "tags": [
      "iDClass",
      "Data e hora"
    ],
    "steps": [
      "Compare data e hora do equipamento com o horário oficial.",
      "Verifique fuso horário e horário de verão, quando aplicável.",
      "Corrija a data/hora conforme procedimento interno.",
      "Após correção, realize novo teste de marcação ou comunicação."
    ],
    "readyAnswer": "Vamos validar a data e hora do equipamento, pois um horário incorreto pode fazer a marcação aparecer em outro período ou gerar divergência no RHID."
  },
  {
    "id": "idface-001",
    "category": "idface",
    "type": "card",
    "title": "O que é o iDFace",
    "description": "O iDFace é um equipamento com reconhecimento facial usado para controle de ponto e/ou acesso, conforme o cenário.",
    "keywords": [
      "iDFace",
      "face",
      "reconhecimento facial",
      "usuário",
      "sincronização"
    ],
    "tags": [
      "iDFace",
      "Face"
    ],
    "steps": [
      "Identifica usuários por reconhecimento facial.",
      "Depende de cadastro correto do usuário e da face.",
      "Pode comunicar com sistema quando a rede está configurada.",
      "Exige boas condições de iluminação e posicionamento para cadastro."
    ],
    "readyAnswer": "O iDFace utiliza reconhecimento facial. Para funcionar bem, precisamos validar cadastro do usuário, cadastro da face, iluminação e comunicação com o sistema."
  },
  {
    "id": "idface-002",
    "category": "idface",
    "type": "card",
    "title": "Boas práticas para cadastro facial",
    "description": "Um cadastro facial bem feito reduz falhas de reconhecimento e retrabalho.",
    "keywords": [
      "cadastro facial",
      "face",
      "reconhecimento",
      "iluminação",
      "iDFace"
    ],
    "tags": [
      "iDFace",
      "Cadastro facial"
    ],
    "steps": [
      "Cadastre a face em local bem iluminado.",
      "Evite contraluz, sombras fortes e rosto parcialmente coberto.",
      "Oriente o usuário a olhar para o equipamento durante o cadastro.",
      "Evite cadastrar com acessórios que não serão usados no dia a dia.",
      "Teste o reconhecimento logo após o cadastro."
    ],
    "readyAnswer": "Para melhorar o reconhecimento, recomendo recadastrar a face em local bem iluminado, sem contraluz e com o rosto centralizado olhando para o equipamento."
  },
  {
    "id": "idface-003",
    "category": "idface",
    "type": "card",
    "title": "Cadastro de usuários no iDFace",
    "description": "Usuários devem possuir dados consistentes no sistema e no equipamento para sincronizar corretamente.",
    "keywords": [
      "usuários",
      "cadastro",
      "CPF",
      "matrícula",
      "sincronização",
      "iDFace"
    ],
    "tags": [
      "iDFace",
      "Cadastro"
    ],
    "steps": [
      "Confira se o usuário existe no sistema.",
      "Valide CPF, matrícula ou identificador usado no ambiente.",
      "Confirme se o usuário foi enviado ao equipamento correto.",
      "Verifique se há duplicidade de cadastro.",
      "Após ajustar, force ou aguarde nova sincronização conforme o caso."
    ],
    "readyAnswer": "Vamos conferir se o usuário está cadastrado corretamente e se foi enviado ao iDFace certo. Duplicidade ou identificador incorreto pode impedir a sincronização."
  },
  {
    "id": "idface-004",
    "category": "idface",
    "type": "card",
    "title": "Problemas comuns de reconhecimento facial",
    "description": "Falhas podem envolver cadastro ruim, iluminação, posicionamento, câmera suja ou usuário não sincronizado.",
    "keywords": [
      "reconhecimento",
      "face",
      "erro",
      "câmera",
      "iluminação",
      "sincronização"
    ],
    "tags": [
      "iDFace",
      "Erro",
      "Face"
    ],
    "steps": [
      "Confirme se o usuário está sincronizado no equipamento.",
      "Teste com outro usuário para separar falha geral de falha individual.",
      "Verifique iluminação e reflexos no local.",
      "Limpe a região da câmera se necessário.",
      "Recadastre a face seguindo boas práticas."
    ],
    "readyAnswer": "Se apenas um usuário falha, o ideal é validar o cadastro facial dele. Se vários usuários falham, vamos analisar iluminação, câmera e sincronização do equipamento."
  },
  {
    "id": "nuvem-001",
    "category": "nuvem",
    "type": "card",
    "title": "Como os equipamentos se comunicam com o RHID",
    "description": "A comunicação depende da configuração do equipamento, acesso à internet, DNS, firewall e cadastro correto no sistema.",
    "keywords": [
      "nuvem",
      "RHID",
      "comunicação",
      "internet",
      "DNS",
      "firewall",
      "porta"
    ],
    "tags": [
      "Nuvem",
      "RHID",
      "Rede"
    ],
    "steps": [
      "O equipamento precisa estar conectado à rede local.",
      "A rede deve permitir saída para a internet.",
      "DNS precisa resolver os endereços necessários.",
      "Firewall ou proxy não podem bloquear a comunicação.",
      "O equipamento deve estar vinculado corretamente no RHID."
    ],
    "readyAnswer": "A comunicação com o RHID depende da rede local permitir acesso à internet, resolução DNS e saída nas portas necessárias, além do equipamento estar cadastrado corretamente."
  },
  {
    "id": "nuvem-002",
    "category": "nuvem",
    "type": "card",
    "title": "Checklist de diagnóstico de comunicação",
    "description": "Use este checklist para analisar equipamentos que não comunicam com a nuvem.",
    "keywords": [
      "checklist",
      "comunicação",
      "nuvem",
      "IP",
      "gateway",
      "DNS",
      "porta",
      "firewall"
    ],
    "tags": [
      "Checklist",
      "Rede",
      "Nuvem"
    ],
    "steps": [
      "Validar cabo de rede ou Wi-Fi, conforme o modelo.",
      "Conferir IP, máscara, gateway e DNS.",
      "Confirmar se a rede tem internet.",
      "Verificar firewall, proxy, VLAN ou bloqueios.",
      "Conferir data e hora do equipamento.",
      "Validar cadastro e vínculo do equipamento no RHID."
    ],
    "readyAnswer": "Para diagnosticar a comunicação, vamos conferir cabo ou Wi-Fi, IP, máscara, gateway, DNS, internet, firewall e cadastro do equipamento no RHID."
  },
  {
    "id": "nuvem-003",
    "category": "nuvem",
    "type": "card",
    "title": "Diferença entre rede local e servidor",
    "description": "Nem toda falha de comunicação indica problema no servidor. Primeiro valide se a rede do cliente permite saída.",
    "keywords": [
      "rede local",
      "servidor",
      "nuvem",
      "diagnóstico",
      "bloqueio",
      "firewall"
    ],
    "tags": [
      "Rede",
      "Servidor",
      "Diagnóstico"
    ],
    "steps": [
      "Se somente um cliente ou local falha, suspeite primeiro de rede local ou configuração.",
      "Se vários equipamentos do mesmo local falham, verifique firewall, DNS ou internet.",
      "Se múltiplos clientes reportam o mesmo sintoma simultaneamente, avalie possibilidade de instabilidade geral.",
      "Registre evidências antes de escalar como possível servidor."
    ],
    "readyAnswer": "Antes de considerar instabilidade no servidor, precisamos validar se a rede local do cliente permite a comunicação. Se apenas esse local falha, normalmente a causa está na rede ou configuração."
  },
  {
    "id": "nuvem-004",
    "category": "nuvem",
    "type": "card",
    "title": "Campos importantes de rede",
    "description": "IP, máscara, gateway, DNS e porta são informações essenciais em qualquer diagnóstico de comunicação.",
    "keywords": [
      "IP",
      "máscara",
      "gateway",
      "DNS",
      "porta",
      "rede",
      "configuração"
    ],
    "tags": [
      "IP",
      "DNS",
      "Gateway"
    ],
    "steps": [
      "IP: endereço do equipamento na rede local.",
      "Máscara: define o tamanho da rede.",
      "Gateway: rota de saída para outras redes e internet.",
      "DNS: traduz domínios em endereços IP.",
      "Porta: canal usado para comunicação com serviços."
    ],
    "readyAnswer": "Preciso confirmar os dados de rede do equipamento: IP, máscara, gateway e DNS. Esses campos determinam se ele consegue sair para a internet."
  },
  {
    "id": "proc-001",
    "category": "procedimentos",
    "type": "card",
    "title": "Atendimento inicial",
    "description": "Checklist para iniciar o chamado com contexto suficiente.",
    "keywords": [
      "atendimento inicial",
      "checklist",
      "cliente",
      "chamado"
    ],
    "tags": [
      "Checklist",
      "Atendimento"
    ],
    "steps": [
      "Cumprimente e confirme o nome do cliente.",
      "Identifique empresa, unidade e equipamento envolvido.",
      "Pergunte desde quando ocorre e se houve mudança recente.",
      "Solicite mensagem de erro, print ou evidência.",
      "Classifique o problema: RHID, equipamento, rede ou configuração."
    ],
    "readyAnswer": "Para iniciar a análise, preciso confirmar empresa, equipamento, desde quando ocorre, mensagem de erro e se houve alguma alteração recente no ambiente."
  },
  {
    "id": "proc-002",
    "category": "procedimentos",
    "type": "card",
    "title": "Coleta de informações do cliente",
    "description": "Dados que devem ser coletados para evitar diagnóstico incompleto.",
    "keywords": [
      "coleta",
      "informações",
      "cliente",
      "dados",
      "diagnóstico"
    ],
    "tags": [
      "Checklist",
      "Cliente"
    ],
    "steps": [
      "Modelo do equipamento.",
      "Número de série ou identificação interna.",
      "IP do equipamento e tipo de conexão.",
      "Empresa e funcionário afetado.",
      "Período do problema.",
      "Prints, mensagens ou arquivos como AFD, se aplicável."
    ],
    "readyAnswer": "Para prosseguir, poderia me enviar modelo do equipamento, IP, empresa afetada, período do problema e um print da mensagem exibida?"
  },
  {
    "id": "proc-003",
    "category": "procedimentos",
    "type": "card",
    "title": "Diagnóstico de comunicação",
    "description": "Sequência recomendada para analisar equipamento sem comunicação.",
    "keywords": [
      "diagnóstico",
      "comunicação",
      "nuvem",
      "rede",
      "firewall",
      "DNS"
    ],
    "tags": [
      "Rede",
      "Nuvem",
      "Checklist"
    ],
    "steps": [
      "Confirmar se o equipamento está ligado e conectado à rede.",
      "Verificar IP, máscara, gateway e DNS.",
      "Testar internet na mesma rede, quando possível.",
      "Validar se firewall/proxy não bloqueia a comunicação.",
      "Conferir cadastro do equipamento no RHID.",
      "Registrar evidências antes de escalar."
    ],
    "readyAnswer": "Vamos seguir o diagnóstico de comunicação: primeiro rede local, depois DNS/gateway/firewall e por fim cadastro do equipamento no RHID."
  },
  {
    "id": "proc-004",
    "category": "procedimentos",
    "type": "card",
    "title": "Quando escalar para outro setor",
    "description": "Escalação deve acontecer com evidências e testes já realizados.",
    "keywords": [
      "escalar",
      "setor",
      "evidência",
      "chamado",
      "suporte"
    ],
    "tags": [
      "Escalação",
      "Atendimento"
    ],
    "steps": [
      "Escalar quando há indício de falha sistêmica, bug, indisponibilidade ou necessidade de acesso interno.",
      "Anexar prints, logs, AFD, horários e descrição do impacto.",
      "Informar testes já realizados e resultados.",
      "Evitar escalar sem validar cenário básico de rede e cadastro."
    ],
    "readyAnswer": "Vou escalar o caso com as evidências coletadas e os testes realizados para que o próximo setor tenha contexto completo da análise."
  },
  {
    "id": "proc-005",
    "category": "procedimentos",
    "type": "card",
    "title": "Como finalizar o atendimento",
    "description": "Encerramento claro ajuda o cliente e mantém histórico útil para futuros contatos.",
    "keywords": [
      "finalizar",
      "encerramento",
      "chamado",
      "histórico",
      "orientação"
    ],
    "tags": [
      "Atendimento",
      "Registro"
    ],
    "steps": [
      "Explique a causa identificada ou hipótese mais provável.",
      "Informe a ação realizada.",
      "Passe orientação preventiva, se houver.",
      "Confirme se o cliente precisa de mais alguma ajuda.",
      "Registre o resumo do atendimento."
    ],
    "readyAnswer": "O atendimento foi concluído com a seguinte ação: [descrever ação]. Recomendo manter [orientação preventiva] para evitar nova ocorrência."
  }
];

const fallbackErrors = [
  {
    "id": "err-001",
    "title": "Equipamento não comunica",
    "description": "O equipamento aparece offline ou não envia dados ao RHID.",
    "keywords": [
      "equipamento",
      "não comunica",
      "offline",
      "nuvem",
      "rede",
      "IP",
      "DNS"
    ],
    "tags": [
      "Rede",
      "Nuvem",
      "RHID"
    ],
    "causes": [
      "Equipamento sem internet.",
      "IP, gateway, máscara ou DNS incorretos.",
      "Firewall, proxy ou porta bloqueada.",
      "Equipamento não vinculado corretamente no RHID.",
      "Data e hora incorretas."
    ],
    "analysis": [
      "Validar conexão física ou Wi-Fi.",
      "Conferir dados de rede.",
      "Testar internet na mesma rede.",
      "Verificar cadastro do equipamento no RHID.",
      "Conferir data e hora."
    ],
    "solution": "Corrigir parâmetros de rede, liberar comunicação no firewall/proxy e validar vínculo do equipamento no RHID."
  },
  {
    "id": "err-002",
    "title": "Funcionário não sincroniza",
    "description": "Colaborador cadastrado no RHID não aparece no equipamento.",
    "keywords": [
      "funcionário",
      "colaborador",
      "não sincroniza",
      "cadastro",
      "CPF",
      "equipamento"
    ],
    "tags": [
      "RHID",
      "Cadastro",
      "Sincronização"
    ],
    "causes": [
      "Cadastro incompleto ou com CPF incorreto.",
      "Funcionário não habilitado para envio.",
      "Equipamento sem comunicação.",
      "Vínculo incorreto com empresa ou dispositivo.",
      "Duplicidade de cadastro."
    ],
    "analysis": [
      "Conferir cadastro do funcionário.",
      "Verificar se está ativo e vinculado corretamente.",
      "Checar se o equipamento comunica.",
      "Analisar se há duplicidade ou erro de identificador."
    ],
    "solution": "Corrigir cadastro/vínculo e reenviar ou aguardar sincronização após restabelecer a comunicação."
  },
  {
    "id": "err-003",
    "title": "AFD não aparece",
    "description": "Cliente informa que não consegue localizar ou coletar o AFD.",
    "keywords": [
      "AFD",
      "não aparece",
      "coleta",
      "Portaria 671",
      "arquivo"
    ],
    "tags": [
      "AFD",
      "Portaria 671",
      "iDClass"
    ],
    "causes": [
      "Período selecionado incorreto.",
      "Equipamento errado.",
      "Marcações não realizadas no período.",
      "Falha de coleta ou arquivo salvo em local diferente."
    ],
    "analysis": [
      "Confirmar equipamento e período.",
      "Verificar se houve marcações no período.",
      "Orientar nova coleta.",
      "Comparar arquivo coletado com dados do RHID."
    ],
    "solution": "Realizar nova coleta do AFD no equipamento correto e conferir período, NSR e registros existentes."
  },
  {
    "id": "err-004",
    "title": "Erro ao cadastrar funcionário",
    "description": "Sistema ou equipamento não aceita o cadastro do colaborador.",
    "keywords": [
      "erro",
      "cadastro",
      "funcionário",
      "CPF",
      "PIS",
      "matrícula"
    ],
    "tags": [
      "Cadastro",
      "RHID",
      "iDClass"
    ],
    "causes": [
      "Campo obrigatório ausente.",
      "CPF ou identificador inválido.",
      "Colaborador já cadastrado.",
      "Empresa ou departamento não vinculado.",
      "Permissão insuficiente do usuário."
    ],
    "analysis": [
      "Ler a mensagem de erro completa.",
      "Validar campos obrigatórios.",
      "Pesquisar duplicidade.",
      "Conferir vínculo com empresa/departamento."
    ],
    "solution": "Corrigir campos obrigatórios, remover duplicidade quando aplicável e revisar permissões/vínculos."
  },
  {
    "id": "err-005",
    "title": "Equipamento sem internet",
    "description": "Equipamento possui rede local, mas não acessa a internet.",
    "keywords": [
      "sem internet",
      "rede",
      "gateway",
      "DNS",
      "firewall",
      "IP"
    ],
    "tags": [
      "Rede",
      "Internet"
    ],
    "causes": [
      "Gateway incorreto.",
      "DNS inválido ou bloqueado.",
      "Firewall bloqueando saída.",
      "Rede sem acesso externo.",
      "Cabo ou porta de rede com falha."
    ],
    "analysis": [
      "Conferir cabo, switch ou Wi-Fi.",
      "Validar IP, máscara, gateway e DNS.",
      "Testar outro dispositivo na mesma rede.",
      "Acionar TI do cliente para liberar acesso."
    ],
    "solution": "Corrigir gateway/DNS ou solicitar à TI do cliente a liberação de internet para o equipamento."
  },
  {
    "id": "err-006",
    "title": "Data e hora incorretas",
    "description": "Marcações entram em data errada ou equipamento mostra horário divergente.",
    "keywords": [
      "data",
      "hora",
      "NTP",
      "marcação",
      "período",
      "espelho"
    ],
    "tags": [
      "Data e hora",
      "Marcação"
    ],
    "causes": [
      "Configuração manual incorreta.",
      "Fuso horário inadequado.",
      "Sem sincronização NTP.",
      "Falha após queda de energia."
    ],
    "analysis": [
      "Comparar horário do equipamento com o horário atual.",
      "Verificar fuso horário.",
      "Checar se houve queda de energia.",
      "Analisar marcações do período."
    ],
    "solution": "Corrigir data/hora e orientar nova validação das marcações após o ajuste."
  },
  {
    "id": "err-007",
    "title": "Biometria ou face não reconhece",
    "description": "Usuário não consegue registrar ponto por biometria ou reconhecimento facial.",
    "keywords": [
      "biometria",
      "face",
      "não reconhece",
      "iDFace",
      "digital",
      "cadastro facial"
    ],
    "tags": [
      "iDFace",
      "Biometria"
    ],
    "causes": [
      "Cadastro de biometria ou face ruim.",
      "Usuário não sincronizado.",
      "Iluminação inadequada.",
      "Sensor/câmera sujo.",
      "Mudança física ou uso de acessórios."
    ],
    "analysis": [
      "Testar com outro usuário.",
      "Verificar se o usuário está no equipamento.",
      "Avaliar iluminação e câmera/sensor.",
      "Recadastrar biometria ou face."
    ],
    "solution": "Recadastrar a biometria/face seguindo boas práticas e confirmar sincronização do usuário."
  },
  {
    "id": "err-008",
    "title": "RHID não importa marcações",
    "description": "Marcações existem no equipamento, mas não aparecem no RHID.",
    "keywords": [
      "RHID",
      "não importa",
      "marcações",
      "AFD",
      "comunicação",
      "sincronização"
    ],
    "tags": [
      "RHID",
      "AFD",
      "Comunicação"
    ],
    "causes": [
      "Equipamento sem comunicação.",
      "Marcações em período diferente por data/hora incorreta.",
      "Funcionário não vinculado corretamente.",
      "Falha de importação ou processamento.",
      "AFD ainda não coletado/importado."
    ],
    "analysis": [
      "Confirmar marcação no equipamento ou AFD.",
      "Conferir comunicação com o RHID.",
      "Validar cadastro do funcionário.",
      "Verificar período e data/hora.",
      "Analisar mensagens de importação."
    ],
    "solution": "Restabelecer comunicação, corrigir cadastro/período e importar ou processar novamente as marcações."
  },
  {
    "id": "err-009",
    "title": "Cliente não consegue acessar o sistema",
    "description": "Usuário não consegue entrar no RHID ou relata erro de login.",
    "keywords": [
      "acesso",
      "login",
      "senha",
      "usuário",
      "RHID",
      "sistema"
    ],
    "tags": [
      "Acesso",
      "RHID"
    ],
    "causes": [
      "Senha incorreta.",
      "Usuário bloqueado ou inativo.",
      "Permissão insuficiente.",
      "E-mail ou login incorreto.",
      "Problema de navegador/cache."
    ],
    "analysis": [
      "Confirmar usuário/login utilizado.",
      "Verificar mensagem de erro.",
      "Validar status e permissões do usuário.",
      "Orientar teste em aba anônima ou outro navegador.",
      "Quando aplicável, redefinir senha."
    ],
    "solution": "Regularizar usuário, permissões ou senha e orientar novo acesso em navegador atualizado."
  }
];

const fallbackFaqItems = [
  {
    "id": "faq-001",
    "title": "Como saber se o problema é de rede?",
    "description": "Analise se o equipamento está sem internet, sem DNS, com gateway incorreto ou bloqueado por firewall.",
    "keywords": [
      "rede",
      "internet",
      "DNS",
      "gateway",
      "firewall"
    ],
    "tags": [
      "Rede",
      "Diagnóstico"
    ],
    "answer": "Comece validando IP, máscara, gateway e DNS. Depois confirme se outro dispositivo na mesma rede acessa a internet. Se somente o equipamento falha, revise a configuração dele. Se vários equipamentos falham, acione a TI do cliente para avaliar rede, firewall, proxy ou VLAN."
  },
  {
    "id": "faq-002",
    "title": "Como verificar se o equipamento está comunicando?",
    "description": "Confira status no RHID, cadastro do equipamento e conectividade local.",
    "keywords": [
      "comunicando",
      "equipamento",
      "RHID",
      "status",
      "nuvem"
    ],
    "tags": [
      "Comunicação",
      "RHID"
    ],
    "answer": "Verifique o status do equipamento no RHID, confirme se ele está cadastrado na empresa correta e valide se a rede local possui internet, DNS e portas liberadas. Também confira data e hora do equipamento."
  },
  {
    "id": "faq-003",
    "title": "O que pedir ao cliente no início do atendimento?",
    "description": "Peça informações que permitam classificar o problema e evitar retrabalho.",
    "keywords": [
      "início",
      "cliente",
      "atendimento",
      "dados",
      "coleta"
    ],
    "tags": [
      "Atendimento"
    ],
    "answer": "Solicite empresa, contato, modelo do equipamento, IP, mensagem de erro, desde quando ocorre, usuário/funcionário afetado e se houve alteração recente na rede, no sistema ou no cadastro."
  },
  {
    "id": "faq-004",
    "title": "Como orientar um cliente que não sabe configurar rede?",
    "description": "Explique de forma simples e envolva a TI do cliente quando necessário.",
    "keywords": [
      "configurar rede",
      "cliente",
      "TI",
      "IP",
      "DNS"
    ],
    "tags": [
      "Rede",
      "Cliente"
    ],
    "answer": "Explique que a configuração de rede depende de dados fornecidos pela TI local: IP, máscara, gateway e DNS. Oriente o cliente a acionar o responsável pela rede para confirmar essas informações e liberar a comunicação."
  },
  {
    "id": "faq-005",
    "title": "Quando solicitar acesso remoto?",
    "description": "Solicite acesso remoto quando a orientação verbal não for suficiente ou quando for necessário validar configurações em tela.",
    "keywords": [
      "acesso remoto",
      "suporte",
      "cliente",
      "diagnóstico"
    ],
    "tags": [
      "Atendimento",
      "Acesso remoto"
    ],
    "answer": "Solicite acesso remoto quando precisar conferir telas do RHID, mensagens de erro, cadastro, configurações de equipamento ou quando o cliente tiver dificuldade em seguir o passo a passo sozinho."
  },
  {
    "id": "faq-006",
    "title": "Quando escalar o chamado?",
    "description": "Escalone após validar o básico e reunir evidências.",
    "keywords": [
      "escalar",
      "chamado",
      "evidência",
      "suporte"
    ],
    "tags": [
      "Escalação"
    ],
    "answer": "Escale quando houver indício de bug, indisponibilidade, limitação de permissão, necessidade de análise interna ou quando todos os testes básicos já foram realizados. Inclua prints, logs, AFD, horários e resumo dos testes."
  }
];

const categoryNames = {
  "primeiros-passos": "Primeiros Passos",
  rhid: "RHID",
  idclass: "REP iDClass",
  idface: "iDFace",
  nuvem: "Comunicação com a Nuvem",
  erros: "Erros Comuns",
  procedimentos: "Procedimentos",
  faq: "FAQ"
};

let supabaseClient = null;
let currentUser = null;
let currentProfile = null;
let contents = [];
let errors = [];
let faqItems = [];
let allSearchable = [];
let favorites = [];
let contentRows = [];
let initialized = false;

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  applySavedTheme();
  setupThemeToggle();
  setupBackToTop();
  setupMobileMenu();
  bindGlobalEvents();

  if (!isSupabaseConfigured()) {
    showLoginMessage("Configure SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY no script.js.", true);
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    showLoginMessage("Erro ao verificar sessão: " + error.message, true);
    return;
  }

  if (data.session?.user) {
    await enterApp(data.session.user);
  }

  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      currentUser = null;
      currentProfile = null;
      getById("appShell").classList.add("hidden");
      getById("loginView").classList.remove("hidden");
      showLoginMessage("", false);
    }

    if (event === "SIGNED_IN" && session?.user) {
      await enterApp(session.user);
    }
  });
}

function isSupabaseConfigured() {
  return SUPABASE_URL.startsWith("https://")
    && !SUPABASE_URL.includes("COLE_AQUI")
    && SUPABASE_PUBLISHABLE_KEY.length > 25
    && !SUPABASE_PUBLISHABLE_KEY.includes("COLE_AQUI");
}

async function enterApp(user) {
  currentUser = user;
  await loadProfile();
  await loadAllData();

  getById("loginView").classList.add("hidden");
  getById("appShell").classList.remove("hidden");

  applyRoleUi();

  if (!initialized) {
    renderCategoryFilter();
    setupNavigation();
    setupSearch();
    setupQuickTags();
    setupNotes();
    initialized = true;
  }

  renderEverything();
  navigateTo("dashboard");
}

async function loadProfile() {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", currentUser.id)
    .maybeSingle();

  if (error) {
    showToast("Erro ao carregar perfil: " + error.message);
  }

  currentProfile = data || {
    id: currentUser.id,
    email: currentUser.email,
    full_name: currentUser.email,
    role: "viewer"
  };
}

function isAdmin() {
  return currentProfile?.role === "admin";
}

function applyRoleUi() {
  const badge = getById("userRoleBadge");
  badge.textContent = isAdmin() ? "Admin" : "Padrão";
  badge.title = currentProfile?.email || currentUser?.email || "";

  document.querySelectorAll(".admin-only").forEach(element => {
    element.classList.toggle("hidden", !isAdmin());
  });
}

async function loadAllData() {
  await Promise.all([
    loadContentsFromDatabase(),
    loadFavorites(),
    loadNotesFromDatabase()
  ]);
}

async function loadContentsFromDatabase() {
  const { data, error } = await supabaseClient
    .from("hub_contents")
    .select("*")
    .order("category", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    showToast("Erro ao carregar conteúdos: " + error.message);
    contentRows = [];
    contents = [];
    errors = [];
    faqItems = [];
    allSearchable = [];
    return;
  }

  contentRows = (data || []).filter(item => isAdmin() || item.published);
  contents = contentRows
    .filter(item => item.category !== "erros" && item.category !== "faq")
    .map(mapDatabaseItemToCard);

  errors = contentRows
    .filter(item => item.category === "erros" || item.type === "error")
    .map(mapDatabaseItemToError);

  faqItems = contentRows
    .filter(item => item.category === "faq" || item.type === "faq")
    .map(mapDatabaseItemToFaq);

  allSearchable = [...contents, ...errors, ...faqItems];
}

function mapDatabaseItemToCard(item) {
  return {
    id: item.id,
    category: item.category,
    type: item.type || "card",
    title: item.title,
    description: item.description,
    keywords: item.keywords || [],
    tags: item.tags || [],
    steps: item.steps || item.analysis || [],
    readyAnswer: item.ready_answer || item.readyAnswer || item.solution || "",
    solution: item.solution || "",
    published: item.published
  };
}

function mapDatabaseItemToError(item) {
  return {
    id: item.id,
    category: "erros",
    type: "error",
    title: item.title,
    description: item.description,
    keywords: item.keywords || [],
    tags: item.tags || [],
    causes: item.causes || [],
    analysis: item.analysis || item.steps || [],
    solution: item.solution || "",
    readyAnswer: item.ready_answer || "",
    published: item.published
  };
}

function mapDatabaseItemToFaq(item) {
  return {
    id: item.id,
    category: "faq",
    type: "faq",
    title: item.title,
    description: item.description,
    keywords: item.keywords || [],
    tags: item.tags || [],
    steps: item.steps || [],
    answer: item.answer || item.solution || item.ready_answer || "",
    readyAnswer: item.ready_answer || item.answer || item.solution || "",
    published: item.published
  };
}

function renderEverything() {
  renderModuleCards();
  renderContentSections();
  renderErrorAccordions();
  renderFaqAccordions();
  renderFavorites();
  renderAdminList();
}

function getById(id) {
  return document.getElementById(id);
}

function showLoginMessage(message, isError = false) {
  const status = getById("loginStatus");
  if (!status) return;
  status.textContent = message;
  status.style.color = isError ? "var(--danger)" : "var(--text-muted)";
}

function showAdminMessage(message, isError = false) {
  const status = getById("adminStatus");
  if (!status) return;
  status.textContent = message;
  status.style.color = isError ? "var(--danger)" : "var(--success)";
}

function showToast(message) {
  const toast = getById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function renderCategoryFilter() {
  const select = getById("categoryFilter");
  if (select.dataset.rendered === "true") return;

  Object.entries(categoryNames).forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  });

  select.dataset.rendered = "true";
}

function renderModuleCards() {
  const container = getById("moduleCards");
  container.innerHTML = modules.map(module => `
    <article class="module-card">
      <div class="module-icon">${module.icon}</div>
      <h3>${module.title}</h3>
      <p>${module.description}</p>
      <button class="stretched-button" data-section-target="${module.id}" aria-label="Abrir ${module.title}"></button>
    </article>
  `).join("");

  container.querySelectorAll("[data-section-target]").forEach(button => {
    button.addEventListener("click", () => navigateTo(button.dataset.sectionTarget));
  });
}

function renderContentSections() {
  const mapping = {
    "primeiros-passos": "primeirosPassosContent",
    rhid: "rhidContent",
    idclass: "idclassContent",
    idface: "idfaceContent",
    nuvem: "nuvemContent",
    procedimentos: "procedimentosContent"
  };

  Object.entries(mapping).forEach(([category, elementId]) => {
    const items = contents.filter(item => item.category === category);
    const container = getById(elementId);
    container.innerHTML = items.length
      ? items.map(createContentCard).join("")
      : createEmptyState(isAdmin() ? "Nenhum conteúdo cadastrado." : "Nenhum conteúdo publicado.", isAdmin() ? "Use o painel Admin para cadastrar." : "Aguarde a publicação de novos materiais.");
  });

  bindCardActions(document);
}

function createContentCard(item) {
  return `
    <article class="content-card" data-content-id="${item.id}">
      <div class="card-meta">
        <span class="tag">${categoryNames[item.category] || item.category}</span>
        ${(item.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        ${isAdmin() && item.published === false ? `<span class="tag admin-draft-label">Rascunho</span>` : ""}
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      ${item.steps?.length ? `<ul class="card-list">${item.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ul>` : ""}
      ${item.readyAnswer ? `<div class="answer-box"><strong>Orientação pronta:</strong><br>${escapeHtml(item.readyAnswer)}</div>` : ""}
      <div class="card-actions">
        ${item.readyAnswer ? `<button class="copy-button" data-copy="${escapeAttribute(item.readyAnswer)}">Copiar orientação</button>` : ""}
        <button class="favorite-button ${favorites.includes(item.id) ? "active" : ""}" data-favorite="${item.id}">
          ${favorites.includes(item.id) ? "⭐ Favoritado" : "☆ Favoritar"}
        </button>
        ${renderAdminCardActions(item.id)}
      </div>
    </article>
  `;
}

function renderErrorAccordions() {
  const container = getById("errosContent");
  container.innerHTML = errors.length
    ? errors.map(item => `
    <article class="accordion-item" data-content-id="${item.id}">
      <button class="accordion-header" aria-expanded="false">
        <span class="accordion-title">
          <span class="module-icon">⚠️</span>
          <span>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.description)}</span>
          </span>
        </span>
        <span class="accordion-arrow">⌄</span>
      </button>
      <div class="accordion-body">
        <div class="card-meta">
          ${item.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          ${isAdmin() && item.published === false ? `<span class="tag admin-draft-label">Rascunho</span>` : ""}
        </div>
        <div class="accordion-columns">
          <div class="info-block">
            <h4>Possíveis causas</h4>
            <ul class="card-list">${item.causes.map(cause => `<li>${escapeHtml(cause)}</li>`).join("")}</ul>
          </div>
          <div class="info-block">
            <h4>Passo a passo de análise</h4>
            <ul class="card-list">${item.analysis.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ul>
          </div>
          <div class="info-block">
            <h4>Solução recomendada</h4>
            <p>${escapeHtml(item.solution)}</p>
          </div>
        </div>
        <div class="answer-box"><strong>Resposta pronta:</strong><br>${escapeHtml(buildErrorReadyAnswer(item))}</div>
        <div class="card-actions">
          <button class="copy-button" data-copy="${escapeAttribute(buildErrorReadyAnswer(item))}">Copiar orientação</button>
          <button class="favorite-button ${favorites.includes(item.id) ? "active" : ""}" data-favorite="${item.id}">
            ${favorites.includes(item.id) ? "⭐ Favoritado" : "☆ Favoritar"}
          </button>
          ${renderAdminCardActions(item.id)}
        </div>
      </div>
    </article>
  `).join("")
    : createEmptyState(isAdmin() ? "Nenhum erro cadastrado." : "Nenhum erro publicado.", isAdmin() ? "Use o painel Admin para cadastrar erros comuns." : "Aguarde a publicação de novos materiais.");

  bindAccordions(container);
  bindCardActions(container);
}

function renderFaqAccordions() {
  const container = getById("faqContent");
  container.innerHTML = faqItems.length
    ? faqItems.map(item => `
    <article class="accordion-item" data-content-id="${item.id}">
      <button class="accordion-header" aria-expanded="false">
        <span class="accordion-title">
          <span class="module-icon">❓</span>
          <span>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.description)}</span>
          </span>
        </span>
        <span class="accordion-arrow">⌄</span>
      </button>
      <div class="accordion-body">
        <div class="card-meta">
          ${item.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          ${isAdmin() && item.published === false ? `<span class="tag admin-draft-label">Rascunho</span>` : ""}
        </div>
        ${item.steps?.length ? `<ul class="card-list">${item.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ul>` : ""}
        <p>${escapeHtml(item.answer)}</p>
        <div class="answer-box"><strong>Resposta pronta:</strong><br>${escapeHtml(item.readyAnswer || item.answer)}</div>
        <div class="card-actions">
          <button class="copy-button" data-copy="${escapeAttribute(item.readyAnswer || item.answer)}">Copiar resposta</button>
          <button class="favorite-button ${favorites.includes(item.id) ? "active" : ""}" data-favorite="${item.id}">
            ${favorites.includes(item.id) ? "⭐ Favoritado" : "☆ Favoritar"}
          </button>
          ${renderAdminCardActions(item.id)}
        </div>
      </div>
    </article>
  `).join("")
    : createEmptyState(isAdmin() ? "Nenhuma FAQ cadastrada." : "Nenhuma FAQ publicada.", isAdmin() ? "Use o painel Admin para cadastrar perguntas frequentes." : "Aguarde a publicação de novos materiais.");

  bindAccordions(container);
  bindCardActions(container);
}

function renderAdminCardActions(id) {
  if (!isAdmin()) return "";
  return `
    <span class="admin-card-actions">
      <button class="card-action" data-edit-content="${id}">Editar</button>
      <button class="ghost-button danger" data-delete-content="${id}">Excluir</button>
    </span>
  `;
}

function createEmptyState(title, text) {
  return `<div class="empty-state"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></div>`;
}

function buildErrorReadyAnswer(item) {
  if (item.readyAnswer) return item.readyAnswer;
  return `Vamos analisar o caso "${item.title}" por etapas. Primeiro vou validar as possíveis causas principais: ${item.causes.join("; ")}. Depois aplicamos a solução recomendada: ${item.solution}`;
}

function bindAccordions(scope) {
  scope.querySelectorAll(".accordion-header").forEach(header => {
    if (header.dataset.bound === "true") return;
    header.dataset.bound = "true";

    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      const isOpen = item.classList.toggle("open");
      header.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function bindCardActions(scope) {
  scope.querySelectorAll(".copy-button").forEach(button => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    button.addEventListener("click", async event => {
      event.stopPropagation();
      const text = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        showToast("Orientação copiada.");
      } catch {
        fallbackCopy(text);
        showToast("Orientação copiada.");
      }
    });
  });

  scope.querySelectorAll(".favorite-button").forEach(button => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    button.addEventListener("click", async event => {
      event.stopPropagation();
      await toggleFavorite(button.dataset.favorite);
    });
  });
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function loadFavorites() {
  const { data, error } = await supabaseClient
    .from("hub_favorites")
    .select("content_id")
    .eq("user_id", currentUser.id);

  if (error) {
    showToast("Erro ao carregar favoritos: " + error.message);
    favorites = [];
    return;
  }

  favorites = (data || []).map(item => item.content_id);
}

async function toggleFavorite(id) {
  if (favorites.includes(id)) {
    const { error } = await supabaseClient
      .from("hub_favorites")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("content_id", id);

    if (error) {
      showToast("Erro ao remover favorito: " + error.message);
      return;
    }

    favorites = favorites.filter(itemId => itemId !== id);
    showToast("Removido dos favoritos.");
  } else {
    const { error } = await supabaseClient
      .from("hub_favorites")
      .insert({ user_id: currentUser.id, content_id: id });

    if (error) {
      showToast("Erro ao favoritar: " + error.message);
      return;
    }

    favorites.push(id);
    showToast("Adicionado aos favoritos.");
  }

  updateFavoriteButtons();
  renderFavorites();
}

function updateFavoriteButtons() {
  document.querySelectorAll(".favorite-button").forEach(button => {
    const isFavorite = favorites.includes(button.dataset.favorite);
    button.classList.toggle("active", isFavorite);
    button.textContent = isFavorite ? "⭐ Favoritado" : "☆ Favoritar";
  });
}

function renderFavorites() {
  const container = getById("favoritosContent");
  const empty = getById("favoritesEmpty");

  const favoriteItems = favorites
    .map(id => allSearchable.find(item => item.id === id))
    .filter(Boolean);

  empty.classList.toggle("hidden", favoriteItems.length > 0);

  container.innerHTML = favoriteItems.map(item => {
    if (item.type === "error") {
      return createSearchResultCard({
        ...item,
        description: item.description,
        readyAnswer: buildErrorReadyAnswer(item)
      });
    }

    if (item.type === "faq") {
      return createSearchResultCard({
        ...item,
        readyAnswer: item.readyAnswer || item.answer
      });
    }

    return createContentCard(item);
  }).join("");

  bindCardActions(container);
}

function setupNavigation() {
  document.querySelectorAll("[data-section-target]").forEach(button => {
    button.addEventListener("click", () => navigateTo(button.dataset.sectionTarget));
  });

  document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.section === "admin" && !isAdmin()) {
        showToast("Seu usuário não possui acesso ao Admin.");
        return;
      }
      navigateTo(button.dataset.section);
      closeMobileSidebar();
    });
  });
}

function navigateTo(sectionId) {
  if (sectionId === "admin" && !isAdmin()) return;

  getById("searchResultsSection").classList.add("hidden");

  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.toggle("active", section.id === sectionId);
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupSearch() {
  const input = getById("globalSearch");
  const filter = getById("categoryFilter");
  const clear = getById("clearSearch");

  input.addEventListener("input", () => performSearch());
  filter.addEventListener("change", () => performSearch());

  clear.addEventListener("click", () => {
    input.value = "";
    filter.value = "todos";
    getById("searchResultsSection").classList.add("hidden");
    getById("searchResults").innerHTML = "";
    getById("searchSummary").textContent = "";
    navigateTo("dashboard");
  });
}

function performSearch() {
  const term = normalizeText(getById("globalSearch").value);
  const selectedCategory = getById("categoryFilter").value;
  const resultsSection = getById("searchResultsSection");
  const resultsContainer = getById("searchResults");
  const summary = getById("searchSummary");

  if (!term && selectedCategory === "todos") {
    resultsSection.classList.add("hidden");
    return;
  }

  document.querySelectorAll(".page-section").forEach(section => section.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
  resultsSection.classList.remove("hidden");

  const results = allSearchable.filter(item => {
    const matchesCategory = selectedCategory === "todos" || item.category === selectedCategory;
    const searchableText = normalizeText([
      item.title,
      item.description,
      item.category,
      ...(item.keywords || []),
      ...(item.tags || []),
      ...(item.steps || []),
      ...(item.causes || []),
      ...(item.analysis || []),
      item.solution || "",
      item.answer || "",
      item.readyAnswer || ""
    ].join(" "));

    const matchesTerm = !term || searchableText.includes(term);
    return matchesCategory && matchesTerm;
  });

  summary.textContent = results.length
    ? `${results.length} resultado(s) encontrado(s).`
    : "Nenhum resultado encontrado. Tente buscar por RHID, AFD, IP, nuvem, cadastro, comunicação ou erro.";

  resultsContainer.innerHTML = results.length
    ? results.map(item => createSearchResultCard(item)).join("")
    : `<div class="empty-state"><strong>Nenhum resultado encontrado.</strong><p>Tente outra palavra-chave ou altere o filtro de categoria.</p></div>`;

  bindCardActions(resultsContainer);
}

function createSearchResultCard(item) {
  let readyAnswer = item.readyAnswer || item.answer || "";
  if (item.type === "error") readyAnswer = buildErrorReadyAnswer(item);

  const steps = item.steps || item.analysis || [];
  const categoryLabel = categoryNames[item.category] || item.category;

  return `
    <article class="content-card" data-content-id="${item.id}">
      <div class="card-meta">
        <span class="tag">${categoryLabel}</span>
        ${(item.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description || "")}</p>
      ${steps.length ? `<ul class="card-list">${steps.slice(0, 5).map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ul>` : ""}
      ${item.solution ? `<div class="answer-box"><strong>Solução:</strong><br>${escapeHtml(item.solution)}</div>` : ""}
      ${readyAnswer ? `<div class="answer-box"><strong>Orientação pronta:</strong><br>${escapeHtml(readyAnswer)}</div>` : ""}
      <div class="card-actions">
        ${readyAnswer ? `<button class="copy-button" data-copy="${escapeAttribute(readyAnswer)}">Copiar orientação</button>` : ""}
        <button class="card-action" data-go-section="${item.category}">Abrir seção</button>
        <button class="favorite-button ${favorites.includes(item.id) ? "active" : ""}" data-favorite="${item.id}">
          ${favorites.includes(item.id) ? "⭐ Favoritado" : "☆ Favoritar"}
        </button>
        ${renderAdminCardActions(item.id)}
      </div>
    </article>
  `;
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function escapeAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setupThemeToggle() {
  getById("themeToggle").addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
    updateThemeIcon();
  });
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = getById("themeIcon");
  if (!icon) return;
  icon.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
}

function setupNotes() {
  getById("saveNotes").addEventListener("click", saveNotesToDatabase);
  getById("clearNotes").addEventListener("click", clearNotesFromDatabase);
}

async function loadNotesFromDatabase() {
  if (!currentUser) return;

  const { data, error } = await supabaseClient
    .from("hub_notes")
    .select("note")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error) {
    showToast("Erro ao carregar anotações: " + error.message);
    return;
  }

  const textarea = getById("personalNotes");
  if (textarea) textarea.value = data?.note || "";
}

async function saveNotesToDatabase() {
  const textarea = getById("personalNotes");
  const status = getById("notesStatus");

  const { error } = await supabaseClient
    .from("hub_notes")
    .upsert({
      user_id: currentUser.id,
      note: textarea.value,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

  if (error) {
    status.textContent = "Erro ao salvar anotações.";
    showToast("Erro ao salvar anotações: " + error.message);
    return;
  }

  status.textContent = "Anotações salvas no seu usuário.";
  showToast("Anotações salvas.");
}

async function clearNotesFromDatabase() {
  const textarea = getById("personalNotes");
  const status = getById("notesStatus");

  if (!textarea.value.trim()) {
    status.textContent = "Não há anotações para limpar.";
    return;
  }

  const confirmClear = window.confirm("Deseja realmente limpar suas anotações?");
  if (!confirmClear) return;

  const { error } = await supabaseClient
    .from("hub_notes")
    .delete()
    .eq("user_id", currentUser.id);

  if (error) {
    showToast("Erro ao limpar anotações: " + error.message);
    return;
  }

  textarea.value = "";
  status.textContent = "Anotações removidas.";
  showToast("Anotações limpas.");
}

function setupBackToTop() {
  const button = getById("backToTop");

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 420);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupMobileMenu() {
  const sidebar = getById("sidebar");
  getById("menuToggle").addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", event => {
    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedMenuButton = getById("menuToggle").contains(event.target);

    if (!clickedInsideSidebar && !clickedMenuButton && sidebar.classList.contains("open")) {
      closeMobileSidebar();
    }
  });
}

function closeMobileSidebar() {
  getById("sidebar").classList.remove("open");
}

function setupQuickTags() {
  document.querySelectorAll("[data-keyword]").forEach(button => {
    button.addEventListener("click", () => {
      getById("globalSearch").value = button.dataset.keyword;
      getById("categoryFilter").value = "todos";
      performSearch();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function bindGlobalEvents() {
  getById("loginForm").addEventListener("submit", login);
  getById("logoutButton").addEventListener("click", logout);
  getById("adminContentForm").addEventListener("submit", saveAdminContent);
  getById("newContentButton").addEventListener("click", resetAdminForm);
  getById("refreshContentButton").addEventListener("click", async () => {
    await loadContentsFromDatabase();
    renderEverything();
    showToast("Conteúdos atualizados.");
  });

  document.addEventListener("click", async event => {
    const sectionButton = event.target.closest("[data-go-section]");
    if (sectionButton) {
      navigateTo(sectionButton.dataset.goSection);
      return;
    }

    const editButton = event.target.closest("[data-edit-content]");
    if (editButton) {
      editAdminContent(editButton.dataset.editContent);
      return;
    }

    const deleteButton = event.target.closest("[data-delete-content]");
    if (deleteButton) {
      await deleteAdminContent(deleteButton.dataset.deleteContent);
    }
  });

  getById("clearFavorites").addEventListener("click", async () => {
    if (!favorites.length) {
      showToast("Nenhum favorito para limpar.");
      return;
    }

    const confirmClear = window.confirm("Deseja limpar todos os favoritos?");
    if (!confirmClear) return;

    const { error } = await supabaseClient
      .from("hub_favorites")
      .delete()
      .eq("user_id", currentUser.id);

    if (error) {
      showToast("Erro ao limpar favoritos: " + error.message);
      return;
    }

    favorites = [];
    updateFavoriteButtons();
    renderFavorites();
    showToast("Favoritos limpos.");
  });
}

async function login(event) {
  event.preventDefault();

  if (!isSupabaseConfigured()) {
    showLoginMessage("Configure SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY no script.js.", true);
    return;
  }

  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  }

  const email = getById("loginEmail").value.trim();
  const password = getById("loginPassword").value;

  showLoginMessage("Entrando...", false);

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Erro no login:", error);
    showLoginMessage(error.message, true);
    return;
  }

  showLoginMessage("Login realizado.", false);
}

async function logout() {
  await supabaseClient.auth.signOut();
}

function getItemById(id) {
  return contentRows.find(item => item.id === id);
}

function editAdminContent(id) {
  if (!isAdmin()) return;

  const item = getItemById(id);
  if (!item) return;

  getById("adminFormTitle").textContent = "Editar conteúdo";
  getById("adminContentId").value = item.id;
  getById("adminTitle").value = item.title || "";
  getById("adminCategory").value = item.category || "primeiros-passos";
  getById("adminPublished").value = String(item.published !== false);
  getById("adminDescription").value = item.description || "";
  getById("adminTags").value = (item.tags || []).join(", ");
  getById("adminKeywords").value = (item.keywords || []).join(", ");
  getById("adminCauses").value = (item.causes || []).join("\n");
  getById("adminSteps").value = (item.steps || item.analysis || []).join("\n");
  getById("adminSolution").value = item.solution || item.answer || "";
  getById("adminReadyAnswer").value = item.ready_answer || "";

  showAdminMessage("Editando: " + item.title, false);
  navigateTo("admin");
}

async function deleteAdminContent(id) {
  if (!isAdmin()) return;

  const item = getItemById(id);
  if (!item) return;

  const confirmed = window.confirm(`Deseja excluir "${item.title}"?`);
  if (!confirmed) return;

  const { error } = await supabaseClient
    .from("hub_contents")
    .delete()
    .eq("id", id);

  if (error) {
    showToast("Erro ao excluir: " + error.message);
    return;
  }

  showToast("Conteúdo excluído.");
  await loadAllData();
  renderEverything();
}

async function saveAdminContent(event) {
  event.preventDefault();

  if (!isAdmin()) {
    showAdminMessage("Seu usuário não possui permissão para cadastrar.", true);
    return;
  }

  const id = getById("adminContentId").value;
  const category = getById("adminCategory").value;
  const type = category === "erros" ? "error" : category === "faq" ? "faq" : "card";
  const solution = getById("adminSolution").value.trim();

  const payload = {
    category,
    type,
    title: getById("adminTitle").value.trim(),
    description: getById("adminDescription").value.trim(),
    tags: parseCommaList(getById("adminTags").value),
    keywords: parseCommaList(getById("adminKeywords").value),
    causes: parseLineList(getById("adminCauses").value),
    steps: parseLineList(getById("adminSteps").value),
    analysis: parseLineList(getById("adminSteps").value),
    solution,
    answer: category === "faq" ? solution : "",
    ready_answer: getById("adminReadyAnswer").value.trim(),
    published: getById("adminPublished").value === "true",
    updated_by: currentUser.id
  };

  if (!payload.title || !payload.description) {
    showAdminMessage("Preencha título e descrição.", true);
    return;
  }

  let result;
  if (id) {
    result = await supabaseClient
      .from("hub_contents")
      .update(payload)
      .eq("id", id);
  } else {
    payload.created_by = currentUser.id;
    result = await supabaseClient
      .from("hub_contents")
      .insert(payload);
  }

  if (result.error) {
    showAdminMessage("Erro ao salvar: " + result.error.message, true);
    return;
  }

  showAdminMessage(id ? "Conteúdo atualizado com sucesso." : "Conteúdo cadastrado com sucesso.", false);
  resetAdminForm();
  await loadAllData();
  renderEverything();
}

function resetAdminForm() {
  getById("adminContentForm").reset();
  getById("adminContentId").value = "";
  getById("adminFormTitle").textContent = "Novo tópico";
  showAdminMessage("", false);
}

function renderAdminList() {
  const container = getById("adminContentList");
  if (!container || !isAdmin()) return;

  if (!contentRows.length) {
    container.innerHTML = createEmptyState("Nenhum conteúdo cadastrado.", "Use o formulário para criar o primeiro tópico.");
    return;
  }

  container.innerHTML = contentRows.map(item => `
    <article class="admin-list-item">
      <div class="card-meta">
        <span class="tag">${categoryNames[item.category] || item.category}</span>
        <span class="tag">${item.published ? "Publicado" : "Rascunho"}</span>
      </div>
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.description || "")}</p>
      <div class="admin-item-actions">
        <button class="card-action" data-edit-content="${item.id}">Editar</button>
        <button class="ghost-button danger" data-delete-content="${item.id}">Excluir</button>
      </div>
    </article>
  `).join("");
}

function parseCommaList(value) {
  return String(value || "")
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function parseLineList(value) {
  return String(value || "")
    .split("\n")
    .map(item => item.trim())
    .filter(Boolean);
}
