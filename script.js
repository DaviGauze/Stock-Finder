
var logs = [];

async function registrarLog(sistema, acao, detalhes) {
  const logEntry = {
    data: new Date().toLocaleString(),
    sistema: sistema,
    acao: acao,
    detalhes: detalhes
  };
  logs.push(logEntry);
  console.log(logs);

  if (logs.length > 0) {
    document.getElementById("logButton").style.display = "block";
  }
}

function exibirLogs() {
  var modalLogsContainer = document.getElementById("modalLogsContainer");
  modalLogsContainer.innerHTML = logs.map((log, index) => `
    <div class="log-item">
      <p><strong>Data:</strong> ${log.data} | <strong>Sistema:</strong> ${log.sistema} | <strong>Ação:</strong> ${log.acao} | <strong>Detalhes:</strong> ${log.detalhes}</p>
      <button class="btn btn-danger btn-sm" onclick="removerLog(${index})">Excluir</button>
    </div>
  `).join("");

  var modalLogs = new bootstrap.Modal(document.getElementById('modalLogs'));
  modalLogs.show();
}

function removerLog(index) {
  logs.splice(index, 1);

  var modalLogs = bootstrap.Modal.getInstance(document.getElementById('modalLogs'));
  modalLogs.hide();

  exibirLogs();

  if (logs.length === 0) {
    document.getElementById("logButton").style.display = "none";
  }
}

document.getElementById('searchButton').addEventListener('click', function() {
    const ticker = document.getElementById('tickerInput').value;
    const token = '2Ys8ZjG1gb37MeG4Yk9TFK'; 

    if (!ticker) {
        alert("Por favor, insira um ticker.");
        return;
    }

    fetch(`https://brapi.dev/api/quote/list?search=${ticker}&token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = '';
      
          if (data.stocks && data.stocks.length > 0) {
              data.stocks.forEach(stock => {
                  const stockInfo = document.createElement('div');
                  stockInfo.classList.add('stock-info');
                  stockInfo.innerHTML = `
                      <h3>${stock.name} (${stock.stock})</h3>
                      <p>Preço de Fechamento: R$ ${stock.close}</p>
                      <p>Variação: ${stock.change} %</p>
                      <p>Volume: ${stock.volume.toLocaleString('pt-BR')}</p>
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
      
        .catch(error => {
            console.error('Houve um problema com a consulta à API:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>Erro ao buscar dados. Tente novamente mais tarde.</p>`;

            registrarLog('Sistema de Ações', 'Erro', 'Erro ao buscar dados da API');
        });
});                <img src="${stock.logo}" alt="${stock.name} Logo">
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