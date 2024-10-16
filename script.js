document.getElementById('searchButton').addEventListener('click', function() {
  const ticker = document.getElementById('tickerInput').value;
  if (ticker) {
    buscarAcao(ticker);
  }
});

function buscarAcao(ticker) {
  fetch(`https://api.buscador-acoes.com/${ticker}`)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = ''; // Limpa resultados anteriores

      if (data.stocks && data.stocks.length > 0) {
        data.stocks.forEach(stock => {
          const stockInfo = document.createElement('div');
          stockInfo.classList.add('stock-info');
          stockInfo.innerHTML = `
            <h3>${stock.name} (${stock.stock})</h3>
            <p>Preço de Fechamento: R$ ${stock.close}</p>
            <p>Variação: ${stock.change} %</p>
            <p>Volume: ${stock.volume}</p>
            <p>Capitalização de Mercado: R$ ${stock.market_cap.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <img src="${stock.logo}" alt="${stock.name} Logo">
            <hr>
          `;
          resultDiv.appendChild(stockInfo);

          registrarLog('Sistema de Ações', 'Busca de Ação', `Ticker: ${ticker}`);
        });
      } else {
        resultDiv.innerHTML = `<p>Nenhum ativo encontrado para o ticker "${ticker}".</p>`;
      }
    })
    .catch(error => console.error('Erro na busca:', error));
}

function registrarLog(sistema, acao, descricao) {
  // Função para registrar log da busca realizada
  console.log(`[${sistema}] - Ação: ${acao} - Descrição: ${descricao}`);
}

function exibirLogs() {
  const logsModal = new bootstrap.Modal(document.getElementById('modalLogs'));
  logsModal.show();
}.then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Limpa resultados anteriores

            if (data.stocks && data.stocks.length > 0) {
                data.stocks.forEach(stock => {
                    const stockInfo = document.createElement('div');
                    stockInfo.classList.add('stock-info');
                    stockInfo.innerHTML = `
                        <h3>${stock.name} (${stock.stock})</h3>
                        <p>Preço de Fechamento: R$ ${stock.close}</p>
                        <p>Variação: ${stock.change} %</p>
                        <p>Volume: ${stock.volume}</p>
                        <p>Capitalização de Mercado: R$ ${stock.market_cap.toFixed(2)}</p>
                        <img src="${stock.logo}" alt="${stock.name} Logo">
                        <hr>
                    `;
                    resultDiv.appendChild(stockInfo);

                    registrarLog('Sistema de Ações', 'Busca de Ação', `Ticker: ${ticker}`);
                });
            } else {
                resultDiv.innerHTML = `<p>Nenhum ativo encontrado para o ticker "${ticker}".</p>`;
            }
        })
        .catch(error => {
            console.error('Houve um problema com a consulta à API:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>Erro ao buscar dados. Tente novamente mais tarde.</p>`;

            registrarLog('Sistema de Ações', 'Erro', 'Erro ao buscar dados da API');
        });
});