// Salvar receita ou despesa
function salvarTransacao(event) {
    event.preventDefault();
  
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
  
    const transacao = { 
      tipo, 
      categoria, 
      descricao, 
      valor,
      data: new Date().toISOString()
    };
  
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    transacoes.push(transacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  
    alert("Transação salva com sucesso!");
    event.target.reset();
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
    const valor = parseFloat(document.getElementById("valorMeta").value);
    const data = document.getElementById("dataLimite").value;
  
    const meta = { titulo, valor, data };
  
    let metas = JSON.parse(localStorage.getItem("metas")) || [];
    metas.push(meta);
    localStorage.setItem("metas", JSON.stringify(metas));
  
    alert("Meta salva com sucesso!");
    carregarMetas();
    event.target.reset();
  }
  
  // Carregar metas
  function carregarMetas() {
    const lista = document.getElementById("listaMetas");
    if (!lista) return;
  
    const metas = JSON.parse(localStorage.getItem("metas")) || [];
    lista.innerHTML = "";
  
    metas.forEach(meta => {
      const li = document.createElement("li");
      li.textContent = `${meta.titulo} - R$ ${meta.valor.toFixed(2)} até ${meta.data}`;
      lista.appendChild(li);
    });
  }
  