// Importando dependências
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Criando app Express
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (página do formulário)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota POST para calcular a média
app.post('/calcular', (req, res) => {
  const nome = req.body.nome;
  const nota1 = parseFloat(req.body.nota1);
  const nota2 = parseFloat(req.body.nota2);

  // Calcula média
  const media = (nota1 + nota2) / 2;
  let situacao = '';

  if (media >= 6) {
    situacao = 'Aprovado';
  } else if (media >= 2) {
    situacao = 'Exame Final';
  } else {
    situacao = 'Reprovado';
  }

  // Retorna página de resultado
  res.send(`
    <html>
      <head>
        <title>Resultado</title>
        <style>
          body { font-family: Arial; background: #f3f3f3; text-align: center; margin-top: 50px; }
          .card { background: white; padding: 20px; margin: auto; width: 300px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
          h2 { color: #333; }
          .situacao { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Resultado do Aluno</h2>
          <p><b>Nome:</b> ${nome}</p>
          <p><b>Nota 1:</b> ${nota1}</p>
          <p><b>Nota 2:</b> ${nota2}</p>
          <p><b>Média:</b> ${media.toFixed(2)}</p>
          <p class="situacao"><b>Situação:</b> ${situacao}</p>
          <a href="/">Voltar</a>
        </div>
      </body>
    </html>
  `);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
