// ============================================
// CicloCuidar — quiz.js
// Quizzes educativos com feedback acolhedor
// Fontes: Cartilha Fiocruz e artigo Violentômetro (CSC, 2026)
// ============================================

const QUIZZES = {
  ciclo: {
    titulo: "Conheça seu ciclo",
    perguntas: [
      {
        texto: "Qual variação é considerada normal para a duração do ciclo menstrual?",
        opcoes: ["Sempre exatamente 28 dias", "Entre 21 e 35 dias", "Entre 10 e 15 dias"],
        correta: 1,
        explicacao: "Ciclos entre 21 e 35 dias são considerados normais. Cada corpo tem seu padrão — conhecer o seu é a base do autocuidado."
      },
      {
        texto: "O que é a menstruação?",
        opcoes: ["Um 'sangramento ruim' que deve ser interrompido", "A descamação do endométrio quando não há gravidez", "Uma limpeza de impurezas do corpo"],
        correta: 1,
        explicacao: "A menstruação é a descamação do endométrio (revestimento interno do útero) quando não ocorre gravidez. É um processo natural e saudável."
      },
      {
        texto: "Cólicas menstruais incapacitantes, que impedem atividades normais, devem ser:",
        opcoes: ["Aceitas como normal da mulher", "Investigadas por um profissional de saúde", "Tratadas apenas com analgésico"],
        correta: 1,
        explicacao: "Cólica leve é comum, mas dor incapacitável pode indicar condições como endometriose — que leva em média 7 anos para ser diagnosticada. Vale buscar avaliação."
      },
      {
        texto: "A fase fértil do ciclo é o período em que:",
        opcoes: ["Não é possível engravidar", "A gravidez é mais provável", "O sangramento ocorre"],
        correta: 1,
        explicacao: "A fase fértil ocorre por volta da ovulação. Mas atenção: o CicloCuidar NÃO é método contraceptivo — para planejamento reprodutivo, procure orientação profissional."
      },
      {
        texto: "Sangramento fora do período esperado merece:",
        opcoes: ["Apenas observação por 6 meses", "Avaliação profissional", "Nada, é sempre normal"],
        correta: 1,
        explicacao: "Sangramentos entre menstruações ou após relações devem ser avaliados por profissional de saúde. Conhecer o próprio padrão ajuda a identificar mudanças."
      }
    ]
  },
  cancer: {
    titulo: "Prevenção de cânceres da mulher",
    perguntas: [
      {
        texto: "O principal fator de risco para o câncer do colo do útero é:",
        opcoes: ["A infecção persistente pelo HPV", "Uso de absorvente interno", "Prática de exercícios"],
        correta: 0,
        explicacao: "A persistência do HPV em alta carga viral é o principal fator de risco. A vacinação contra HPV e o Papanicolau são as formas mais eficazes de prevenção."
      },
      {
        texto: "A mamografia de rastreamento é indicada a partir de:",
        opcoes: ["25 anos", "40 anos", "55 anos"],
        correta: 1,
        explicacao: "Segundo a cartilha do IFF/Fiocruz, a mamografia de rotina é indicada a partir dos 40 anos, complementada por consultas periódicas e autoexame."
      },
      {
        texto: "Sinais de alerta para o câncer de mama incluem:",
        opcoes: ["Pele com aspecto de casca de laranja, nódulo endurecido e retração do mamilo", "Dor de cabeça frequente", "Cansaço após exercícios"],
        correta: 0,
        explicacao: "Pele endurecida tipo casca de laranja, nódulo endurecido, inversão do mamilo e secreção mamilar são sinais de suspeição — procure avaliação médica."
      },
      {
        texto: "O Papanicolau é capaz de detectar o câncer do colo do útero:",
        opcoes: ["Já em fase avançada", "Em fases pré-clínicas, quando é curável", "Somamente após sintomas"],
        correta: 1,
        explicacao: "A evolução do câncer do colo do útero é lenta e passa por fases pré-clínicas detectáveis e curáveis — um dos cânceres de maior potencial de prevenção."
      },
      {
        texto: "Sobre o autoexame das mamas, é correto afirmar:",
        opcoes: ["Substitui a mamografia", "É complementar: ajuda a conhecer o corpo e notar alterações", "Só deve ser feito após os 60 anos"],
        correta: 1,
        explicacao: "O autoexame não substitui a mamografia, mas ajuda a mulher a conhecer seu corpo e perceber alterações precocemente."
      }
    ]
  },
  relacoes: {
    titulo: "Sinais de alerta nas relações",
    perguntas: [
      {
        texto: "Ciúme que leva a vigilância e controle é:",
        opcoes: ["Prova de amor", "Sinal de alerta", "Fase normal de todo relacionamento"],
        correta: 1,
        explicacao: "Ciúme é uma das variáveis com maior peso para a ocorrência de violência doméstica. O ciúme romantizado como 'prova de amor' mascara o controle."
      },
      {
        texto: "'Piadas ofensivas' e 'brincar de bater' são:",
        opcoes: ["Brincadeiras sem consequência", "Comportamentos que a pesquisa associou fortemente à violência doméstica", "Formas de afeto"],
        correta: 1,
        explicacao: "A pesquisa com 563 mulheres (Ciência & Saúde Coletiva, 2026) classificou piadas ofensivas e 'tapinhas' como variáveis de peso muito forte para identificar violência."
      },
      {
        texto: "O ciclo da violência doméstica tende a:",
        opcoes: ["Resolver-se sozinho com o tempo", "Escalar e se tornar mais grave se não for interrompido", "Depender apenas do humor do parceiro"],
        correta: 1,
        explicacao: "A violência inicia de forma sutil e escalda — se não interrompida, pode culminar no feminicídio. A Central 180 funciona 24h, de graça e sigilosa."
      },
      {
        texto: "A violência psicológica (ofensas, humilhações, ameaças):",
        opcoes: ["Não é violência de verdade", "É o ponto inicial que deflagra as outras formas de violência", "São as mulheres que são sensíveis demais"],
        correta: 1,
        explicacao: "A agressão verbal muitas vezes não é percebida como violência, mas ela é o ponto inicial que deflaga todas as outras formas."
      },
      {
        texto: "Se uma amiga relatar estar em situação de violência, o melhor primeiro passo é:",
        opcoes: ["Julgar as escolhas dela", "Ouvir sem julgar e informar sobre a Central 180", "Dizer que ela deve ter provocado algo"],
        correta: 1,
        explicacao: "Acolher sem julgar e informar os canais de ajuda (180) é o mais importante. Muitas mulheres evitam denunciar por temerem o processo — apoio e acolhimento são essenciais."
      }
    ]
  },
  bemestar: {
    titulo: "Corpo e bem-estar",
    perguntas: [
      {
        texto: "O tempo médio entre os primeiros sintomas e o diagnóstico da endometriose é de aproximadamente:",
        opcoes: ["7 anos", "2 meses", "20 anos"],
        correta: 0,
        explicacao: "Cerca de 7 anos — por isso cólicas incapacitáveis não devem ser normalizadas. Conhecer os sintomas acelera o diagnóstico."
      },
      {
        texto: "A síndrome dos ovários policísticos (SOP):",
        opcoes: ["Atinge apenas mulheres acima de 50 anos", "É um distúrbio hormonal comum, com sintomas que incluem irregularidade menstrual e acne", "Não tem tratamento"],
        correta: 1,
        explicacao: "A SOP acomete principalmente mulheres entre 30 e 40 anos e tem tratamento — o manejo depende dos sintomas que mais incomodam em cada fase da vida."
      },
      {
        texto: "Sobre a menopausa, é correto afirmar:",
        opcoes: ["É uma doença que precisa ser curada", "É o fim da fase reprodutiva, com sintomas gerenciáveis com acompanhamento", "Só ocorre antes dos 40 anos"],
        correta: 1,
        explicacao: "A menopausa é um processo fisiológico (entre 45-55 anos). Há tratamentos e hábitos que aliviam os sintomas — o apoio profissional e psicológico ajuda muito."
      },
      {
        texto: "Roncar durante o sono é sinal de:",
        opcoes: ["Sono profundo e reparador", "Esforço respiratório que pode sobrecarregar o coração", "Que a pessoa está feliz"],
        correta: 1,
        explicacao: "Quem ronca está sobrecarregando a musculatura respiratória e o coração — pode indicar apneia do sono, que tem tratamento."
      },
      {
        texto: "Estratégias que ajudam a melhorar a autoestima incluem:",
        opcoes: ["Suprimir as emoções desagradáveis", "Diário de coisas positivas e pequenas metas diárias", "Comparar-se com outras pessoas"],
        correta: 1,
        explicacao: "Segundo a cartilha Fiocruz, o diário de coisas positivas e a construção de pequenas 'maestrias' diárias ajudam a restabelecer o equilíbrio de crenças sobre si mesma."
      }
    ]
  }
};

// ---------- Estado do quiz em andamento ----------

let quizAtual = null;
let perguntaAtual = 0;
let acertos = 0;

function abrirQuiz(id) {
  quizAtual = QUIZZES[id];
  perguntaAtual = 0;
  acertos = 0;
  document.getElementById("quiz-lista").hidden = true;
  document.getElementById("quiz-jogo").hidden = false;
  document.getElementById("quiz-titulo").textContent = quizAtual.titulo;
  mostrarPergunta();
}

function voltarQuizzes() {
  document.getElementById("quiz-jogo").hidden = true;
  document.getElementById("quiz-resultado").hidden = true;
  document.getElementById("quiz-lista").hidden = false;
  atualizarProgressoQuiz();
}

function mostrarPergunta() {
  const p = quizAtual.perguntas[perguntaAtual];
  const box = document.getElementById("quiz-pergunta");
  box.innerHTML =
    "<h3>Pergunta " + (perguntaAtual + 1) + " de " + quizAtual.perguntas.length + "</h3>" +
    "<p><strong>" + p.texto + "</strong></p>" +
    p.opcoes.map((op, i) =>
      '<button class="aba" style="display:block; margin:8px 0; text-align:left" onclick="responder(' + i + ')">' + op + "</button>"
    ).join("");
}

async function responder(indice) {
  const p = quizAtual.perguntas[perguntaAtual];
  const correta = indice === p.correta;
  if (correta) acertos++;

  // registra a resposta localmente
  await salvar("quiz", {
    quizId: Object.keys(QUIZZES).find((k) => QUIZZES[k] === quizAtual),
    pergunta: perguntaAtual,
    resposta: indice,
    correta: correta,
    data: new Date().toISOString().slice(0, 10)
  });

  const box = document.getElementById("quiz-pergunta");
  const feedback = correta
    ? '<p style="color:var(--acao)">✔ Isso! ' + p.explicacao + "</p>"
    : '<p class="aviso">Não foi dessa vez — e tudo bem. Aprender é o que importa: ' + p.explicacao + "</p>";
  box.innerHTML = feedback + '<button class="aba" style="margin-top:12px" onclick="proximaPergunta()">Continuar</button>';
}

function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < quizAtual.perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarQuiz();
  }
}

async function finalizarQuiz() {
  document.getElementById("quiz-jogo").hidden = true;
  const box = document.getElementById("quiz-resultado");
  box.innerHTML =
    "<h3>Trilha concluída! 🌸</h3>" +
    "<p>Você acertou " + acertos + " de " + quizAtual.perguntas.length + " — mas o mais importante é o que você levou daqui: " +
    "conhecimento que protege a sua saúde.</p>" +
    '<button class="btn-link" onclick="voltarQuizzes()">← Voltar às trilhas</button>';
  box.hidden = false;
}

function montarQuizzes() {
  const lista = document.getElementById("quiz-lista");
  const descricoes = {
    ciclo: "Ciclo menstrual, menstruação e sinais de alerta",
    cancer: "Mama, colo do útero e prevenção que salva vidas",
    relacoes: "Reconhecer sinais de alerta nas relações",
    bemestar: "Endometriose, SOP, menopausa e autoestima"
  };
  lista.innerHTML = Object.keys(QUIZZES).map(
    (id) =>
      '<button class="aba" style="display:block; margin:8px 0; text-align:left" onclick="abrirQuiz(\'' + id + '\')">' +
      "<strong>" + QUIZZES[id].titulo + "</strong><br><small style='opacity:.75'>" + descricoes[id] + "</small></button>"
  ).join("") +
  '<p class="fonte">Conteúdo baseado na Cartilha Cuidados em Saúde da Mulher (IFF/Fiocruz) e na pesquisa do Violentômetro (Ciência & Saúde Coletiva, 2026).</p>';
}

async function atualizarProgressoQuiz() {
  const box = document.getElementById("quiz-progresso");
  const respostas = await listar("quiz");
  if (respostas.length === 0) {
    box.textContent = "Você ainda não começou nenhuma trilha. Que tal começar pela primeira? 💜";
  } else {
    const quizzesFeitos = new Set(respostas.map((r) => r.quizId)).size;
    const acertos = respostas.filter((r) => r.correta).length;
    box.textContent = "Você já respondeu " + respostas.length + " perguntas (" + acertos + " certas) em " + quizzesFeitos + " trilha(s). Tudo fica só no seu aparelho.";
  }
}
