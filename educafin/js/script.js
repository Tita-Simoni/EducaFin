// Salvar receita ou despesa
function salvarTransacao(event) {
    event.preventDefault();
    console.log("Função salvarTransacao foi chamada!");
  
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value;
    const data = document.getElementById("data").value;
    const valor = parseFloat(document.getElementById("valor").value);
  
    const transacao = { 
      tipo, 
      categoria, 
      descricao, 
      data,
      valor,
      data: new Date().toISOString()
    };
  
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    transacoes.push(transacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  
    const msg = document.getElementById("mensagem");
    msg.textContent = "Transação salva com sucesso!";
    msg.style.display = "block";

    setTimeout(() => {
      msg.style.display = "none"; 
    }, 3000);

  }
  
  // Exibir total
  function exibirResumo() {
    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
  
    let totalReceitas = 0;
    let totalDespesas = 0;
  
    transacoes.forEach(t => {
      if (t.tipo === "receita") totalReceitas += t.valor;
      else totalDespesas += t.valor;
    });
  
    const saldo = totalReceitas - totalDespesas;
  
    document.getElementById("totalReceitas").textContent = totalReceitas.toFixed(2);
    document.getElementById("totalDespesas").textContent = totalDespesas.toFixed(2);
    document.getElementById("saldo").textContent = saldo.toFixed(2);
  }
  
  // Salvar meta
  function salvarMeta(event) {
    event.preventDefault();
  
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prazo = document.getElementById("prazo").value;
    const valor = parseFloat(document.getElementById("valorMeta").value);
    const data = document.getElementById("dataLimite").value;
  
    const meta = { 
      titulo, 
      descricao,
      prazo,
      valor, 
      data 
    };
  
    let metas = JSON.parse(localStorage.getItem("metas")) || [];
    metas.push(meta);
    localStorage.setItem("metas", JSON.stringify(metas));
  
    alert("Meta salva com sucesso!");
    carregarMetas();
    event.target.reset();
  }
  
  // Carregar metas
  function carregarMetas() {
    const tabela = document.querySelector("#tabelaMetas tbody");
    if (!tabela) return;

   const metas = JSON.parse(localStorage.getItem("metas")) || [];
    tabela.innerHTML = "";

    metas.forEach(meta => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${meta.titulo}</td>
        <td>${meta.descricao || "-"}</td>
        <td>${meta.prazo || "-"}</td>
        <td>R$ ${meta.valor.toFixed(2)}</td>
        <td>${meta.data}</td>
      `;
      tabela.appendChild(tr);
      });
}

  