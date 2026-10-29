// CicloCuidar — quiz.js
const QUIZZES = {
  ciclo: { titulo: "Conheça seu ciclo", perguntas: [
    { texto: "Qual variação é considerada normal para a duração do ciclo menstrual?",
      opcoes: ["Sempre exatamente 28 dias", "Entre 21 e 35 dias", "Entre 10 e 15 dias"],
      correta: 1, explicacao: "Ciclos entre 21 e 35 dias são normais. Conhecer o seu padrão é a base do autocuidado." },
    { texto: "Cólicas incapacitantes que impedem atividades normais devem ser:",
      opcoes: ["Aceitas como normal", "Investigadas por profissional de saúde", "Tratadas só com analgésico"],
      correta: 1, explicacao: "Dor incapacitante pode indicar endometriose — que leva em média 7 anos até o diagnóstico." },
    { texto: "A fase fértil é o período em que:",
      opcoes: ["Não é possível engravidar", "A gravidez é mais provável", "Ocorre o sangramento"],
      correta: 1, explicacao: "A fase fértil é próxima da ovulação. O CicloCuidar NÃO é contraceptivo." },
    { texto: "Sangramento fora do período esperado merece:",
      opcoes: ["Observação por 6 meses", "Avaliação profissional", "Nada, é sempre normal"],
      correta: 1, explicacao: "Sangramento entre menstruações deve ser avaliado por profissional de saúde." },
    { texto: "A menstruação é:",
      opcoes: ["Descamação do endométrio na ausência de gravidez", "Sangramento ruim a interromper", "Limpeza de impurezas do corpo"],
      correta: 0, explicacao: "É a descamação do endométrio — um processo natural e saudável." }
  ]},
  cancer: { titulo: "Prevenção de cânceres da mulher", perguntas: [
    { texto: "O principal fator de risco do câncer do colo do útero é:",
      opcoes: ["Infecção persistente pelo HPV", "Uso de absorvente interno", "Exercícios físicos"],
      correta: 0, explicacao: "HPV persistente é o principal fator. Vacinação e Papanicolau são as prevenções mais eficazes." },
    { texto: "A mamografia de rastreamento é indicada a partir dos:",
      opcoes: ["25 anos", "40 anos", "55 anos"],
      correta: 1, explicacao: "A partir dos 40 anos, complementada por consultas periódicas e autoexame." },
    { texto: "Sinais de alerta para câncer de mama incluem:",
      opcoes: ["Pele tipo casca de laranja e nódulo endurecido", "Dor de cabeça frequente", "Cansaço após exercícios"],
      correta: 0, explicacao: "Pele tipo casca de laranja, nódulo endurecido e retração do mamilo exigem avaliação." },
    { texto: "O Papanicolau detecta o câncer do colo do útero:",
      opcoes: ["Já em fase avançada", "Em fases pré-clínicas e curáveis", "Somente após sintomas"],
      correta: 1, explicacao: "Detecta fases pré-clínicas — um dos cânceres de maior potencial de prevenção." },
    { texto: "Sobre o autoexame das mamas:",
      opcoes: ["Substitui a mamografia", "É complementar: ajuda a notar alterações", "Só após os 60 anos"],
      correta: 1, explicacao: "Não substitui a mamografia, mas ajuda a perceber alterações precocemente." }
  ]},
  relacoes: { titulo: "Sinais de alerta nas relações", perguntas: [
    { texto: "Ciúme que leva a vigilância e controle é:",
      opcoes: ["Prova de amor", "Sinal de alerta", "Fase normal"],
      correta: 1, explicacao: "O ciúme romantizado mascara o controle e tem forte associação com violência doméstica." },
    { texto: "'Piadas ofensivas' e 'brincar de bater' são:",
      opcoes: ["Brincadeiras sem consequência", "Associados fortemente à violência doméstica", "Formas de afeto"],
      correta: 1, explicacao: "A pesquisa do Violentômetro (CSC, 2026) os classificou como variáveis de peso muito forte." },
    { texto: "A violência psicológica (ofensas, humilhações):",
      opcoes: ["Não é violência de verdade", "É o ponto inicial que deflagra as outras formas", "Excesso de sensibilidade"],
      correta: 1, explicacao: "A agressão verbal é o ponto inicial de todas as outras formas de violência." },
    { texto: "Se uma amiga relatar violência, o melhor primeiro passo é:",
      opcoes: ["Julgar as escolhas dela", "Ouvir sem julgar e informar a Central 180", "Dizer que ela provocou algo"],
      correta: 1, explicacao: "Acolher sem julgar e informar o 180 (gratuito, sigiloso, 24h) é o essencial." },
    { texto: "O ciclo da violência tende a:",
      opcoes: ["Resolver-se com o tempo", "Escalar se não interrompido", "Depender só do humor do parceiro"],
      correta: 1, explicacao: "Inicia sutil e escala — sem interrupção, pode culminar em feminicídio." }
  ]},
  bemestar: { titulo: "Corpo e bem-estar", perguntas: [
    { texto: "O tempo médio entre primeiros sintomas e diagnóstico da endometriose é de cerca de:",
      opcoes: ["7 anos", "2 meses", "20 anos"],
      correta: 0, explicacao: "Cerca de 7 anos — cólicas incapacitantes não devem ser normalizadas." },
    { texto: "A SOP (ovários policísticos):",
      opcoes: ["Só atinge mulheres 50+", "É distúrbio hormonal comum e tem tratamento", "Não tem tratamento"],
      correta: 1, explicacao: "Sintomas como irregularidade menstrual e acne têm manejo com acompanhamento." },
    { texto: "Sobre a menopausa:",
      opcoes: ["É doença a curar", "Processo natural com sintomas gerenciáveis", "Só ocorre antes dos 40"],
      correta: 1, explicacao: "Processo fisiológico (45–55 anos). Há tratamentos que aliviam os sintomas." },
    { texto: "Estratégias que melhoram a autoestima incluem:",
      opcoes: ["Suprimir emoções", "Diário de coisas positivas e pequenas metas", "Comparar-se com os outros"],
      correta: 1, explicacao: "A cartilha Fiocruz recomenda diário de coisas positivas e pequenas 'maestrias' diárias." },
    { texto: "Roncar durante o sono indica:",
      opcoes: ["Sono reparador", "Esforço respiratório que pode sobrecarregar o coração", "Nada importante"],
      correta: 1, explicacao: "Pode indicar apneia do sono, que tem tratamento." }
  ]}
};

let quizAtual = null;
let quizIdAtual = null;
let perguntaAtual = 0;
let acertos = 0;

function abrirQuiz(id) {
  quizAtual = QUIZZES[id];
  quizIdAtual = id;
  perguntaAtual = 0;
  acertos = 0;
  document.getElementById("quiz-lista").hidden = true;
  document.getElementById("quiz-resultado").hidden = true;
  document.getElementById("quiz-jogo").hidden = false;
  document.getElementById("quiz-titulo").textContent = quizAtual.titulo;
  mostrarPerguntaQuiz();
}

function voltarQuizzes() {
  document.getElementById("quiz-jogo").hidden = true;
  document.getElementById("quiz-resultado").hidden = true;
  document.getElementById("quiz-lista").hidden = false;
  atualizarProgressoQuiz();
}

function mostrarPerguntaQuiz() {
  const p = quizAtual.perguntas[perguntaAtual];
  document.getElementById("quiz-pergunta").innerHTML =
    "<p><strong>Pergunta " + (perguntaAtual + 1) + " de " + quizAtual.perguntas.length + "</strong></p>" +
    "<p>" + p.texto + "</p>" +
    p.opcoes.map((op, i) =>
      '<button class="aba" style="display:block; margin:8px 0; text-align:left" onclick="responderQuiz(' + i + ')">' + op + "</button>"
    ).join("");
}

async function responderQuiz(indice) {
  const p = quizAtual.perguntas[perguntaAtual];
  const correta = indice === p.correta;
  if (correta) acertos++;
  await salvar("quiz", {
    quizId: quizIdAtual, pergunta: perguntaAtual, resposta: indice,
    correta: correta, data: new Date().toISOString().slice(0, 10)
  });
  const feedback = correta
    ? '<p style="color:var(--acao)">✔ Isso mesmo! ' + p.explicacao + "</p>"
    : '<p class="aviso">Não foi dessa vez — e tudo bem. ' + p.explicacao + "</p>";
  document.getElementById("quiz-pergunta").innerHTML =
    feedback + '<button class="aba" style="margin-top:12px" onclick="proximaPerguntaQuiz()">Continuar</button>';
}

function proximaPerguntaQuiz() {
  perguntaAtual++;
  if (perguntaAtual < quizAtual.perguntas.length) { mostrarPerguntaQuiz(); return; }
  document.getElementById("quiz-jogo").hidden = true;
  const box = document.getElementById("quiz-resultado");
  box.innerHTML =
    "<h3>Trilha concluída! 🌸</h3>" +
    "<p>Você respondeu " + quizAtual.perguntas.length + " perguntas e acertou " + acertos +
    ". O mais importante é o que você levou daqui: conhecimento que protege a sua saúde.</p>" +
    '<button class="btn-link" onclick="voltarQuizzes()">← Voltar às trilhas</button>';
  box.hidden = false;
  atualizarProgressoQuiz();
}

function montarQuizzes() {
  const descricoes = {
    ciclo: "Ciclo menstrual e sinais de alerta",
    cancer: "Mama, colo do útero e prevenção",
    relacoes: "Reconhecer sinais de alerta nas relações",
    bemestar: "Endometriose, SOP, menopausa e autoestima"
  };
  document.getElementById("quiz-lista").innerHTML =
    Object.keys(QUIZZES).map((id) =>
      '<button class="aba" style="display:block; margin:8px 0; text-align:left" onclick="abrirQuiz(\'' + id + '\')">' +
      "<strong>" + QUIZZES[id].titulo + "</strong><br><small style='opacity:.75'>" + descricoes[id] + "</small></button>"
    ).join("") +
    '<p class="fonte">Conteúdo baseado na Cartilha IFF/Fiocruz e na pesquisa do Violentômetro (Ciência & Saúde Coletiva, 2026).</p>';
}

async function atualizarProgressoQuiz() {
  const respostas = await listar("quiz");
  const box = document.getElementById("quiz-progresso");
  if (!box) return;
  if (respostas.length === 0) {
    box.textContent = "Você ainda não começou nenhuma trilha. Que tal começar pela primeira? 💜";
  } else {
    const trilhas = new Set(respostas.map((r) => r.quizId)).size;
    const acertos = respostas.filter((r) => r.correta).length;
    box.textContent = "Você já respondeu " + respostas.length + " perguntas (" + acertos + " certas) em " + trilhas + " trilha(s). Tudo fica só no seu aparelho.";
  }
}
