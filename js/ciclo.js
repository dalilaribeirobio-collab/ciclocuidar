// CicloCuidar — ciclo.js
const SINTOMAS = [
  "Cólica", "Dor de cabeça", "Seios sensíveis", "Inchaço",
  "Alterações de humor", "Cansaço", "Acne", "Sono alterado",
  "Dor nas costas", "Aumento do apetite"
];

function montarSintomas() {
  document.getElementById("lista-sintomas").innerHTML = SINTOMAS.map(
    (s) => '<label><input type="checkbox" value="' + s + '"> ' + s + "</label>"
  ).join("");
}

async function salvarSintomas() {
  const hoje = new Date().toISOString().slice(0, 10);
  const marcados = Array.from(
    document.querySelectorAll("#lista-sintomas input:checked")
  ).map((i) => i.value);

  const registros = await listar("sintomas");
  const deHoje = registros.find((r) => r.data === hoje);
  if (deHoje) {
    await atualizar("sintomas", deHoje.id, { data: hoje, sintomas: marcados });
  } else {
    await salvar("sintomas", { data: hoje, sintomas: marcados });
  }

  const feedback = document.createElement("p");
  feedback.textContent = "✔ Seu dia foi salvo. Cuide-se! 🌸";
  feedback.className = "fonte";
  document.getElementById("lista-sintomas").after(feedback);
  setTimeout(() => feedback.remove(), 2500);
}

async function registrarMenstruacao() {
  const data = document.getElementById("data-menstruacao").value;
  if (!data) { alert("Escolha a data do primeiro dia da menstruação."); return; }
  await salvar("ciclos", { data: data, registradoEm: new Date().toISOString() });
  document.getElementById("data-menstruacao").value = "";
  calcularPrevisao();
}

async function calcularPrevisao() {
  const box = document.getElementById("previsao");
  if (!box) return;
  const registros = await listar("ciclos");

  if (registros.length === 0) {
    box.innerHTML = "<p>Registre o primeiro dia da sua menstruação para começar a acompanhar seu ciclo. 🌱</p>";
    return;
  }

  const datas = registros.map((r) => r.data).sort();
  let duracao = 28;
  if (datas.length >= 2) {
    const intervalos = [];
    for (let i = 1; i < datas.length; i++) {
      const dias = Math.round((new Date(datas[i]) - new Date(datas[i - 1])) / 86400000);
      if (dias > 15 && dias < 60) intervalos.push(dias);
    }
    if (intervalos.length > 0) {
      duracao = Math.round(intervalos.reduce((a, b) => a + b, 0) / intervalos.length);
    }
  }

  const ultima = new Date(datas[datas.length - 1]);
  const proxima = new Date(ultima.getTime() + duracao * 86400000);
  const hoje = new Date(new Date().toISOString().slice(0, 10));
  const diasRestantes = Math.ceil((proxima - hoje) / 86400000);

  let mensagem;
  if (diasRestantes > 0) {
    mensagem = "Sua próxima menstruação está prevista para <strong>" +
      proxima.toLocaleDateString("pt-BR") + "</strong> (em cerca de " +
      diasRestantes + " dia" + (diasRestantes > 1 ? "s" : "") + ").";
  } else {
    mensagem = "Sua menstruação está prevista para <strong>hoje ou já começou</strong>. Que tal registrar?";
  }

  box.innerHTML =
    "<h3>Sua previsão</h3><p>" + mensagem + "</p>" +
    '<p class="fonte">Previsão baseada na sua média de ' + duracao +
    " dias. Ciclos variam naturalmente. <strong>Esta previsão NÃO é método contraceptivo.</strong></p>";
}
